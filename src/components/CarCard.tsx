import { useContext } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatMileage } from "@/lib/utils";
import { CartContext } from "@/App";
import { Car } from "@shared/schema";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(car.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={car.imageUrl} 
          alt={car.name} 
          className="w-full h-56 object-cover"
        />
        {car.isFeatured && (
          <span className="absolute top-4 right-4 bg-accent text-gray-800 font-bold px-3 py-1 rounded-full text-sm">
            Featured
          </span>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-xl">{car.name}</h3>
          <p className="font-heading font-bold text-lg text-primary">{formatCurrency(car.price)}</p>
        </div>
        <div className="flex items-center mb-4">
          <div className="text-yellow-400 flex">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
          <span className="text-gray-500 text-sm ml-2">(27 reviews)</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-gray-700">
            <i className="fas fa-calendar-alt mr-2 text-gray-400"></i>
            <span>{car.year}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <i className="fas fa-road mr-2 text-gray-400"></i>
            <span>{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <i className={`fas ${car.fuelType === 'Electric' ? 'fa-battery-full' : 'fa-gas-pump'} mr-2 text-gray-400`}></i>
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <i className="fas fa-cog mr-2 text-gray-400"></i>
            <span>{car.transmission}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <Link 
            href={`/cars/${car.id}`} 
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View Details
          </Link>
          <Button
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
