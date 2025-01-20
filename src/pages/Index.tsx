import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { RatingDialog } from '@/components/RatingDialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from '@/components/search/SearchBar';
import { NoResults } from '@/components/search/NoResults';
import { ClientList } from '@/components/client-list/ClientList';
import { ClientCard } from '@/components/ClientCard';

const Index = () => {
  const navigate = useNavigate();
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
          rating_attempts(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      return clients.map(client => ({
        ...client,
        ratings: client.rating_attempts?.length || 0,
        responseRate: client.responded ? 100 : 0,
        paymentRate: client.paid === 'yes' ? 100 : client.paid === 'late' ? 50 : 0,
        averageRating: calculateAverageRating(client.rating_attempts || [])
      }));
    }
  });

  const calculateAverageRating = (attempts: any[]) => {
    if (attempts.length === 0) return 3;
    const total = attempts.reduce((sum, attempt) => {
      if (attempt.paid === 'yes') return sum + 6;
      if (attempt.paid === 'late') return sum + 3;
      return sum;
    }, 0);
    return Math.round(total / attempts.length);
  };

  const filteredClients = clientsData.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRatingSuccess = async () => {
    await refetch();
    setShowRatingDialog(false);
  };

  const handleRate = (clientName: string = '') => {
    setSelectedClientName(clientName);
    setShowRatingDialog(true);
  };

  const renderSearchResults = () => {
    if (searchQuery === '') return null;

    if (filteredClients.length === 0) {
      return <NoResults searchQuery={searchQuery} onAddClient={handleRate} />;
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
            averageRating={client.averageRating}
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
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/0ce1c75d-20f4-4971-9813-501d311e4180.png" 
            alt="Logo"
            className="h-12 mx-auto mb-4 cursor-pointer"
            onClick={() => navigate('/')}
          />
          <h1 className="text-3xl font-medium mb-2">
            Scopri se un cliente risponde al tuo preventivo
          </h1>
          <p className="text-xl text-gray-600">e se paga davvero.</p>
        </div>

        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClient={handleRate}
        />

        <Separator className="my-16" />

        {searchQuery ? (
          renderSearchResults()
        ) : (
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <ClientList
                title="Evitali"
                emoji="🚨"
                clients={clientsData.filter(client => !client.responded || client.paid === 'no')}
                onRate={handleRate}
              />
              <ClientList
                title="Migliori clienti"
                emoji="✨"
                clients={clientsData.filter(client => client.responded && client.paid === 'yes')}
                onRate={handleRate}
              />
            </div>
          </div>
        )}
      </div>

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
        skipNameStep={false}
        onSuccess={handleRatingSuccess}
        initialClientName={selectedClientName}
      />
    </div>
  );
};

export default Index;