import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClientCard } from '@/components/ClientCard';
import { RatingDialog } from '@/components/RatingDialog';
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value.length > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <img 
          src="/lovable-uploads/0ce1c75d-20f4-4971-9813-501d311e4180.png" 
          alt="Logo"
          className="h-12 mx-auto mb-4"
        />
        <h1 className="text-xl font-medium mb-2">
          Scopri se un cliente risponde al tuo preventivo
        </h1>
        <p className="text-gray-600">e se paga davvero.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-2">
          <Input
            className="h-12"
            placeholder="Cerca nome azienda, progetto o cliente"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button className="h-12 px-8 bg-black hover:bg-white hover:text-black border-2 border-black transition-colors">
            Cerca
          </Button>
        </div>
      </div>

      <Separator className="my-12" />

      {!isSearching && (
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bad Clients */}
            <div>
              <h2 className="text-xl font-semibold mb-8 flex items-center justify-center gap-2">
                <span>Evitali</span>
                <span>🙅‍♂️</span>
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
      )}

      <RatingDialog 
        open={showRatingDialog} 
        onOpenChange={setShowRatingDialog}
        skipNameStep={true}
      />
    </div>
  );
};

export default Index;