import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { ClientCard } from '@/components/ClientCard';
import { RatingDialog } from '@/components/RatingDialog';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(value.length > 0);
    // Simulate search - in real app this would query the database
    setNoResults(value.length > 0);
  };

  return (
    <div className={cn(
      "min-h-screen bg-gray-50 px-4 py-8",
      showRatingDialog && "blur-sm"
    )}>
      {/* Logo */}
      <div className="text-center mb-8">
        <img 
          src="/lovable-uploads/0ce1c75d-20f4-4971-9813-501d311e4180.png" 
          alt="Logo"
          className="h-12 mx-auto mb-4"
        />
        <h1 className="text-[1.17rem] font-medium mb-2">
          Scopri se un cliente risponde al tuo preventivo
        </h1>
        <p className="text-gray-600">e se paga davvero.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <Input
          className="h-12"
          placeholder="Cerca nome azienda, progetto o cliente"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Separator className="my-16" />

      {!isSearching ? (
        <div className="max-w-[560px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bad Clients */}
            <div>
              <h2 className="text-xl font-semibold mb-8 flex items-center justify-center gap-2">
                <span>🚨</span>
                <span>Evitali</span>
                <span>🚨</span>
              </h2>
              <div className="space-y-8">
                <ClientCard
                  name="Cliente Cattivo"
                  ratings={2}
                  responseRate={0}
                  paymentRate={0}
                  onRate={() => setShowRatingDialog(true)}
                />
              </div>
            </div>

            {/* Good Clients */}
            <div>
              <h2 className="text-xl font-semibold mb-8 flex items-center justify-center gap-2">
                <span>✨</span>
                <span>Migliori clienti</span>
                <span>✨</span>
              </h2>
              <div className="space-y-8">
                <ClientCard
                  name="Cliente Buono"
                  ratings={2}
                  responseRate={80}
                  paymentRate={90}
                  onRate={() => setShowRatingDialog(true)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          {noResults && (
            <div className="space-y-4">
              <p>Nessun cliente trovato con questo nome.</p>
              <Button
                onClick={() => setShowRatingDialog(true)}
                className="rounded-full px-6 bg-black hover:bg-white hover:text-black border-2 border-black transition-colors"
              >
                Aggiungi nuovo cliente
              </Button>
            </div>
          )}
        </div>
      )}

      <RatingDialog 
        open={showRatingDialog} 
        onOpenChange={setShowRatingDialog}
        skipNameStep={!noResults}
      />
    </div>
  );
};

export default Index;