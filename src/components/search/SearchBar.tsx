import React from 'react';
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddClient: (name: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery, onAddClient }: SearchBarProps) => {
  return (
    <div className="max-w-lg mx-auto mb-12 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        className="h-12 pl-10 pr-10"
        placeholder="Cerca nome azienda, progetto o cliente"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
          onClick={() => setSearchQuery('')}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};