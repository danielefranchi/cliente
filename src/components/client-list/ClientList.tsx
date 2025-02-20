
import React from 'react';
import { ClientCard } from '@/components/ClientCard';

interface Client {
  id: string;
  name: string;
  ratings: number;
  response_rate: number;
  payment_rate: number;
  averageRating?: number;
  responded: boolean;
  image_url?: string;
}

interface ClientListProps {
  title: string;
  emoji: string;
  clients: Client[];
  onRate: (name: string) => void;
}

export const ClientList = ({ title, emoji, clients, onRate }: ClientListProps) => {
  return (
    <div>
      {title && (
        <h2 className="text-xl font-semibold mb-16 flex items-center justify-center gap-2">
          <span>{emoji}</span>
          <span>{title}</span>
          <span>{emoji}</span>
        </h2>
      )}
      <div className="space-y-24">
        {clients.slice(0, 20).map(client => (
          <ClientCard
            key={client.id}
            name={client.name}
            ratings={client.ratings}
            responseRate={client.response_rate}
            paymentRate={client.payment_rate}
            averageRating={client.averageRating}
            onRate={() => onRate(client.name)}
            showPayment={client.responded}
            imageUrl={client.image_url}
          />
        ))}
      </div>
    </div>
  );
};
