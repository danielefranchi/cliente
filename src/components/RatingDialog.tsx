import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { generateFingerprint } from '@/utils/fingerprint';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skipNameStep?: boolean;
  onSuccess?: () => void;
  initialClientName?: string;
}

export const RatingDialog = ({ 
  open, 
  onOpenChange, 
  skipNameStep = false, 
  onSuccess,
  initialClientName = ''
}: RatingDialogProps) => {
  const [step, setStep] = useState(skipNameStep ? 1 : 0);
  const [name, setName] = useState(initialClientName);
  const [responded, setResponded] = useState<boolean | null>(null);
  const [paid, setPaid] = useState<'yes' | 'no' | 'late' | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setStep(skipNameStep ? 1 : 0);
      setName(initialClientName);
      setResponded(null);
      setPaid(null);
      setConfirmed(false);
    }
  }, [open, skipNameStep, initialClientName]);

  const steps = [
    "Nome cliente",
    "Risposta",
    "Pagamento",
    "Conferma"
  ];

  const checkRateLimit = async (clientId: string) => {
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

    // Check daily limit
    if (attempts && attempts.length >= 4) {
      throw new Error('Hai raggiunto il limite di 4 valutazioni per oggi');
    }

    return { ip, fingerprint };
  };

  const handleSubmit = async () => {
    try {
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

      toast({
        title: "Valutazione salvata con successo!",
        description: "La tua valutazione è stata registrata.",
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error saving client:', error);
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore durante il salvataggio.",
        variant: "destructive"
      });
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold">Aggiungi cliente</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome azienda o progetto"
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case 1:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold">Ha risposto al tuo preventivo?</h2>
            <p className="text-sm text-gray-500">(entro 7 giorni)</p>
            <div className="flex justify-center gap-8">
              <Button
                onClick={() => {
                  setResponded(false);
                  setStep(3); // Skip to confirmation if no response
                }}
                className={cn(
                  "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                  responded === false ? "bg-red-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-red-50"
                )}
              >
                <span className="text-2xl mb-2">👻</span>
                <span>No</span>
              </Button>
              <Button
                onClick={() => setResponded(true)}
                className={cn(
                  "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                  responded === true ? "bg-green-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-green-50"
                )}
              >
                <span className="text-2xl mb-2">🥳</span>
                <span>Si</span>
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold">Sei stato pagato?</h2>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setPaid('no')}
                className={cn(
                  "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                  paid === 'no' ? "bg-red-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-red-50"
                )}
              >
                <span className="text-2xl mb-2">😈</span>
                <span>No</span>
              </Button>
              <Button
                onClick={() => setPaid('late')}
                className={cn(
                  "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                  paid === 'late' ? "bg-yellow-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-yellow-50"
                )}
              >
                <span className="text-2xl mb-2">🐌</span>
                <span>Oltre 30 giorni</span>
              </Button>
              <Button
                onClick={() => setPaid('yes')}
                className={cn(
                  "flex-col h-auto py-4 px-8 border border-gray-200 text-black transition-colors",
                  paid === 'yes' ? "bg-green-100 hover:bg-gray-100 hover:text-black" : "bg-white hover:bg-green-50"
                )}
              >
                <span className="text-2xl mb-2">🤑</span>
                <span>Si</span>
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold">Tutto vero?</h2>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-left"
              >
                Dichiaro che la mia recensione si basa su un'esperienza reale e che le informazioni fornite sono veritiere.
              </label>
            </div>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return name.length > 0;
      case 1:
        return responded !== null;
      case 2:
        return paid !== null;
      case 3:
        return confirmed;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 max-w-md mx-auto">
        <DialogTitle className="sr-only">Valuta Cliente</DialogTitle>
        {/* Stepper */}
        <div className="flex justify-center mb-8">
          {steps.map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="w-4" />}
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  step === index ? "bg-black" : "bg-gray-300"
                )}
              />
            </React.Fragment>
          ))}
        </div>

        {/* Content */}
        {renderStepContent()}

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          {step === 3 ? (
            <Button
              disabled={!canProceed()}
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
            >
              Pubblica
            </Button>
          ) : (
            <Button
              disabled={!canProceed()}
              onClick={() => setStep(step + 1)}
              className="bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-colors"
            >
              Prosegui
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
