import React from 'react';

interface NameStepProps {
  name: string;
  setName: (name: string) => void;
}

export const NameStep = ({ name, setName }: NameStepProps) => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-xl font-semibold">Aggiungi cliente</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          if (e.target.value.length <= 32) {
            setName(e.target.value);
          }
        }}
        placeholder="Nome azienda o progetto"
        className="w-full p-2 border rounded"
        maxLength={32}
      />
      {name.length > 14 && (
        <p className="text-sm text-gray-500">
          {32 - name.length} caratteri rimanenti
        </p>
      )}
    </div>
  );
};