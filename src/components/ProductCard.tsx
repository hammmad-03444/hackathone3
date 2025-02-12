import React from 'react';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  discountPercent: number;
  rating?: number; // Assuming products have a rating value
  review?: number; // Optional number of reviews
}


// Modified ProductCard component
const ProductCard = ({ image, name, price, discountPercent, rating = 5, review = 5 }: ProductCardProps) => {
  const discountedPrice = ((price * (100 - discountPercent)) / 100).toFixed(2);

  const renderStars = (rate: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar 
            key={index} 
            className={`w-3 h-3 ${index < rate ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="w-[180px] sm:w-[180px] md:w-[280px] bg-[#F0EEED] rounded-xl hover:shadow-lg transition-shadow">
      <CardContent className="p-0 border-none">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image 
            src={image}
            fill
            className="object-cover"
            alt={name}
            sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 200px"
          />
        </div>
        <div className="mt-2 space-y-1 p-2">
          <h3 className="font-semibold text-sm line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="ml-2 text-sm font-normal">{rating}/ <span className="text-sm text-muted-foreground">({review})</span></span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-bold">${discountedPrice}</span>
            {discountPercent > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>
                <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-md">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;