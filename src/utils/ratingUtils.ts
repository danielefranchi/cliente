
import { supabase } from "@/integrations/supabase/client";
import { generateFingerprint } from '@/utils/fingerprint';

export const checkRateLimit = async (clientId: string) => {
  console.log('Checking rate limit for client:', clientId);
  const ip = await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip);
  const fingerprint = generateFingerprint();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: attempts, error: rateError } = await supabase
    .from('rating_attempts')
    .select('*')
    .eq('ip_address', ip)
    .eq('browser_fingerprint', fingerprint)
    .gte('created_at', today.toISOString());

  if (rateError) {
    console.error('Rate limit check error:', rateError);
    throw new Error('Error checking rate limit');
  }

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
  console.log('Saving rating for:', { name, responded, paid });
  
  if (responded === null) {
    throw new Error('Missing required rating data');
  }

  // If responded is false, we don't need to validate paid
  if (responded === true && paid === null) {
    throw new Error('Missing required rating data');
  }

  try {
    // First, get or create the client
    console.log('Looking for existing client with name:', name);
    const { data: existingClient, error: searchError } = await supabase
      .from('clients')
      .select('id')
      .ilike('name', name.trim())
      .maybeSingle();

    if (searchError) {
      console.error('Error searching for client:', searchError);
      throw searchError;
    }

    let clientId: string;
    
    if (existingClient) {
      console.log('Found existing client:', existingClient);
      clientId = existingClient.id;
    } else {
      console.log('Creating new client with name:', name);
      const { data: newClient, error: insertError } = await supabase
        .from('clients')
        .insert([{ name: name.trim() }])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating client:', insertError);
        throw insertError;
      }
      
      if (!newClient) {
        throw new Error('Failed to create client');
      }
      
      console.log('Created new client:', newClient);
      clientId = newClient.id;
    }

    // Check rate limits and get user identifiers
    console.log('Checking rate limits for client:', clientId);
    const { ip, fingerprint } = await checkRateLimit(clientId);

    // Add the rating
    console.log('Adding rating for client:', { clientId, responded, paid });
    const { error: ratingError } = await supabase
      .from('ratings')
      .insert([{
        client_id: clientId,
        responded,
        paid: responded ? paid : null
      }]);

    if (ratingError) {
      console.error('Error adding rating:', ratingError);
      throw ratingError;
    }

    // Record the rating attempt
    console.log('Recording rating attempt');
    const { error: attemptError } = await supabase
      .from('rating_attempts')
      .insert([{
        client_id: clientId,
        ip_address: ip,
        browser_fingerprint: fingerprint
      }]);

    if (attemptError) {
      console.error('Error recording attempt:', attemptError);
      throw attemptError;
    }

    console.log('Rating saved successfully');
    return clientId;
  } catch (error) {
    console.error('Error in saveRating:', error);
    throw error;
  }
};
