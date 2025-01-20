import React from 'react';

interface ProfileImageProps {
  imageUrl?: string;
  name: string;
}

export const ProfileImage = ({ imageUrl, name }: ProfileImageProps) => {
  return (
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
      <div className="w-16 h-16 bg-[#F0F0F0] rounded-full flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl">🏢</span>
        )}
      </div>
    </div>
  );
};