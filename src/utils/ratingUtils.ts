import { supabase } from "@/integrations/supabase/client";
import { generateFingerprint } from '@/utils/fingerprint';

export const checkRateLimit = async (clientId: string) => {
  const ip = await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip);
  const fingerprint = generateFingerprint();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: attempts } = await supabase
    .from('rating_attempts')
    .select('*')
    .eq('ip_address', ip)
    .eq('browser_fingerprint', fingerprint)
    .gte('created_at', today.toISOString());

  if (attempts && attempts.length >= 4) {
    throw new Error('Hai raggiunto il limite di 4 valutazioni per oggi');
  }

  return { ip, fingerprint };
};

export const saveRating = async (
  name: string, 
  responded: boolean | null, 
  paid: 'yes' | 'no' | 'late' | null
) => {
  // Check if client already exists
  const { data: existingClients } = await supabase
    .from('clients')
    .select('id, responded, paid')
    .ilike('name', name.trim())
    .maybeSingle();

  let clientId;
  
  if (existingClients) {
    // Update existing client
    const { error: updateError } = await supabase
      .from('clients')
      .update({
        responded: responded || existingClients.responded,
        paid: paid || existingClients.paid
      })
      .eq('id', existingClients.id);

    if (updateError) throw updateError;
    clientId = existingClients.id;
  } else {
    // Insert new client
    const { data: newClient, error: insertError } = await supabase
      .from('clients')
      .insert([{
        name: name.trim(),
        responded: responded || false,
        paid: paid || 'no'
      }])
      .select()
      .single();

    if (insertError) throw insertError;
    clientId = newClient.id;
  }

  // Check rate limits and get user identifiers
  const { ip, fingerprint } = await checkRateLimit(clientId);

  // Record the rating attempt
  const { error: attemptError } = await supabase
    .from('rating_attempts')
    .insert([{
      client_id: clientId,
      ip_address: ip,
      browser_fingerprint: fingerprint
    }]);

  if (attemptError) throw attemptError;

  return clientId;
};