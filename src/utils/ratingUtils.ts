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
  if (!responded || !paid) {
    throw new Error('Missing required rating data');
  }

  // First, get or create the client
  let clientId: string;
  
  const { data: existingClient } = await supabase
    .from('clients')
    .select('id')
    .ilike('name', name.trim())
    .maybeSingle();

  if (existingClient) {
    clientId = existingClient.id;
  } else {
    const { data: newClient, error: insertError } = await supabase
      .from('clients')
      .insert([{ name: name.trim() }])
      .select()
      .single();

    if (insertError) throw insertError;
    clientId = newClient.id;
  }

  // Check rate limits and get user identifiers
  const { ip, fingerprint } = await checkRateLimit(clientId);

  // Add the rating
  const { error: ratingError } = await supabase
    .from('ratings')
    .insert([{
      client_id: clientId,
      responded,
      paid
    }]);

  if (ratingError) throw ratingError;

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