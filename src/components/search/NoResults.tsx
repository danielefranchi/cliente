import React from 'react';
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  searchQuery: string;
  onAddClient: (name: string) => void;
}

export const NoResults = ({ searchQuery, onAddClient }: NoResultsProps) => {
  return (
    <div className="text-center">
      <div className="space-y-1.5">
        <p className="text-lg">
          <strong>{searchQuery} non è valutato.</strong>
        </p>
        <p>Bisogna aggiungerlo!</p>
        <p className="text-gray-600 mt-12">Non dovrai iscriverti o inserire i tuoi dati.</p>
        <Button
          onClick={() => onAddClient(searchQuery)}
          className="rounded-full px-6 mt-10 bg-black hover:bg-white hover:text-black border-2 border-black transition-colors"
        >
          Aggiungi {searchQuery.length > 20 ? `${searchQuery.slice(0, 10)}...` : searchQuery}
        </Button>
      </div>
    </div>
  );
};