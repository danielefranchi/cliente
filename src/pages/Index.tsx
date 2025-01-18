import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ClientCard } from '@/components/ClientCard';
import { RatingDialog } from '@/components/RatingDialog';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');

  const { data: clientsData = [], refetch } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data: clients, error } = await supabase
        .from('clients')
        .select(`
          *,
          rating_attempts:rating_attempts(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      return clients.map(client => ({
        ...client,
        ratings: client.rating_attempts?.length || 0,
        responseRate: client.responded ? 100 : 0,
        paymentRate: client.paid === 'yes' ? 100 : client.paid === 'late' ? 50 : 0
      }));
    }
  });

  const filteredClients = clientsData.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRatingSuccess = async () => {
    await refetch();
    setShowRatingDialog(false);
  };

  const handleRate = (clientName: string = '') => {
    setSelectedClientName(clientName);
    setShowRatingDialog(true);
  };

  const goodClients = filteredClients
    .filter(client => client.responded && client.paid === 'yes')
    .slice(0, 20);

  const badClients = filteredClients
    .filter(client => !client.responded || client.paid === 'no')
    .slice(0, 20);

  const renderSearchResults = () => {
    if (searchQuery === '') return null;

    if (filteredClients.length === 0) {
      return (
        <div className="text-center">
          <div className="space-y-4">
            <p className="text-lg">{searchQuery} non è valutato.</p>
            <p>Bisogna aggiungerlo!</p>
            <p className="text-gray-600">Non dovrai iscriverti o inserire i tuoi dati.</p>
            <Button
              onClick={() => handleRate(searchQuery)}
              className="rounded-full px-6 bg-black hover:bg-white hover:text-black border-2 border-black transition-colors"
            >
              Aggiungi {searchQuery}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-24">
        {filteredClients.map(client => (
          <ClientCard
            key={client.id}
            name={client.name}
            ratings={client.ratings}
            responseRate={client.responseRate}
            paymentRate={client.paymentRate}
            onRate={() => handleRate(client.name)}
            showPayment={client.responded}
            imageUrl={client.image_url}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8">
        {/* Logo section */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0ce1c75d-20f4-4971-9813-501d311e4180.png" 
            alt="Logo"
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-3xl font-medium mb-2">
            Scopri se un cliente risponde al tuo preventivo
          </h1>
          <p className="text-xl text-gray-600">e se paga davvero.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            className="h-12 pl-10"
            placeholder="Cerca nome azienda, progetto o cliente"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <Separator className="my-16" />

        {searchQuery ? (
          renderSearchResults()
        ) : (
          // ... keep existing code (grid layout for good/bad clients)
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Bad Clients */}
              <div>
                <h2 className="text-xl font-semibold mb-16 flex items-center justify-center gap-2">
                  <span>🚨</span>
                  <span>Evitali</span>
                  <span>🚨</span>
                </h2>
                <div className="space-y-24">
                  {badClients.map(client => (
                    <ClientCard
                      key={client.id}
                      name={client.name}
                      ratings={client.ratings}
                      responseRate={client.responseRate}
                      paymentRate={client.paymentRate}
                      onRate={() => handleRate(client.name)}
                      showPayment={client.responded}
                      imageUrl={client.image_url}
                    />
                  ))}
                </div>
              </div>

              {/* Good Clients */}
              <div>
                <h2 className="text-xl font-semibold mb-16 flex items-center justify-center gap-2">
                  <span>✨</span>
                  <span>Migliori clienti</span>
                  <span>✨</span>
                </h2>
                <div className="space-y-24">
                  {goodClients.map(client => (
                    <ClientCard
                      key={client.id}
                      name={client.name}
                      ratings={client.ratings}
                      responseRate={100}
                      paymentRate={100}
                      onRate={() => handleRate(client.name)}
                      showPayment={true}
                      imageUrl={client.image_url}
                    />
                  ))}
                </div>
              </div>
            </div>

            {(goodClients.length >= 20 || badClients.length >= 20) && (
              <div className="mt-16">
                <div className="max-w-2xl mx-auto">
                  <Input
                    className="h-12"
                    placeholder="Cerca nome azienda, progetto o cliente"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-sm text-gray-300">
          <div className="space-y-4">
            <p className="leading-relaxed">
              Disclaimer: Le opinioni e le recensioni pubblicate su questo sito riflettono esclusivamente l'esperienza e il punto di vista degli utenti. Il sito non garantisce l'accuratezza, la completezza o la veridicità delle recensioni e declina ogni responsabilità per eventuali danni o controversie derivanti dall'uso delle informazioni pubblicate. Ogni contenuto inappropriato, diffamatorio o non conforme alle normative vigenti potrà essere segnalato e rimosso. Invitiamo gli utenti a utilizzare la piattaforma in modo responsabile e a fornire recensioni veritiere basate su esperienze personali.
            </p>
            <div className="text-center">
              <Link to="/terms" className="text-white hover:underline underline">
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <RatingDialog 
        open={showRatingDialog} 
        onOpenChange={setShowRatingDialog}
        skipNameStep={selectedClientName !== ''}
        onSuccess={handleRatingSuccess}
        initialClientName={selectedClientName}
      />
    </div>
  );
};

export default Index;
