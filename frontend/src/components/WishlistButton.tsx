'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { addToFavorites, removeFromFavorites, getFavorites } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface WishlistButtonProps {
  propertyId: string;
  className?: string;
}

export default function WishlistButton({ propertyId, className }: WishlistButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) return;
      try {
        const favorites = await getFavorites();
        const found = favorites.some((f: any) => f.propertyId === propertyId);
        setIsFavorited(found);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [propertyId, user]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to save properties');
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorited) {
        await removeFromFavorites(propertyId);
        setIsFavorited(false);
        toast.success('Removed from wishlist');
      } else {
        await addToFavorites(propertyId);
        setIsFavorited(true);
        toast.success('Saved to wishlist');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all shadow-sm flex-shrink-0 group ${
        isFavorited 
          ? 'bg-red-50 border-red-100 text-red-500' 
          : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-300'
      } ${className}`}
    >
      <svg 
        className={`w-5 h-5 transition-all group-active:scale-90 ${isFavorited ? 'fill-current' : 'fill-none'}`} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    </button>
  );
}
