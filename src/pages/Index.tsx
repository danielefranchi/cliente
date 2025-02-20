
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { RatingDialog } from '@/components/RatingDialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from '@/components/search/SearchBar';
import { NoResults } from '@/components/search/NoResults';
import { ClientList } from '@/components/client-list/ClientList';

const Index = () => {
  const navigate = useNavigate();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientName, setSelectedClientName] = useState('');

  const { data: clientsData = [], refetch, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      // First query the clients table
      const { data: clients, error } = await supabase
        .from('clients')
        .select(`
          id,
          name,
          image_url,
          created_at,
          ratings (
            responded,
            paid
          )
        `);
      
      if (error) {
        console.error('Error fetching clients:', error);
        throw error;
      }

      // Transform the data to match the expected format
      return clients.map(client => {
        const totalRatings = client.ratings?.length || 0;
        const responseRate = client.ratings?.filter(r => r.responded).length / totalRatings * 100 || 0;
        const paidRatings = client.ratings?.filter(r => r.responded && r.paid === 'yes').length || 0;
        const paymentRate = totalRatings > 0 ? (paidRatings / totalRatings * 100) : 0;

        return {
          id: client.id,
          name: client.name,
          image_url: client.image_url,
          created_at: client.created_at,
          ratings: totalRatings,
          response_rate: responseRate,
          payment_rate: paymentRate,
          responded: responseRate > 0
        };
      });
    }
  });

  const handleRatingSuccess = async () => {
    await refetch();
    setShowRatingDialog(false);
  };

  const handleRate = (clientName: string = '') => {
    setSelectedClientName(clientName);
    setShowRatingDialog(true);
  };

  const filteredClients = clientsData.filter(client => 
    client.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortByRatings = (clients: any[]) => {
    return [...clients].sort((a, b) => (b.ratings || 0) - (a.ratings || 0));
  };

  const badClients = sortByRatings(
    clientsData.filter(client => 
      client.response_rate < 50 || client.payment_rate < 50
    )
  ).sort((a, b) => {
    // Prioritize clients with both bad results
    const aBothBad = (a.response_rate < 50 && a.payment_rate < 50) ? 1 : 0;
    const bBothBad = (b.response_rate < 50 && b.payment_rate < 50) ? 1 : 0;
    return bBothBad - aBothBad;
  });

  const goodClients = sortByRatings(
    clientsData.filter(client => 
      client.response_rate >= 50 && client.payment_rate >= 50
    )
  );

  if (isError) {
    console.error('Error loading clients data');
  }

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
          filteredClients.length === 0 ? (
            <NoResults searchQuery={searchQuery} onAddClient={handleRate} />
          ) : (
            <div className="space-y-24">
              {filteredClients.map(client => (
                <ClientList
                  key={client.id}
                  title=""
                  emoji=""
                  clients={[client]}
                  onRate={handleRate}
                />
              ))}
            </div>
          )
        ) : (
          <div className="max-w-[1200px] mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <ClientList
                title="Evitali"
                emoji="🚨"
                clients={badClients}
                onRate={handleRate}
              />
              <ClientList
                title="Migliori clienti"
                emoji="✨"
                clients={goodClients}
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
              Avvertenza: Le opinioni e le recensioni pubblicate su questo sito riflettono esclusivamente l'esperienza e il punto di vista degli utenti. Il sito non garantisce l'accuratezza, la completezza o la veridicità delle recensioni e declina ogni responsabilità per eventuali danni o controversie derivanti dall'uso delle informazioni pubblicate. Ogni contenuto inappropriato, diffamatorio o non conforme alle normative vigenti potrà essere segnalato e rimosso. Invitiamo gli utenti a utilizzare la piattaforma in modo responsabile e a fornire recensioni veritiere basate su esperienze personali.
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
