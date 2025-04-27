import { useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatMileage, generateStarRating } from "@/lib/utils";
import { CartContext } from "@/App";
import { Car, Review } from "@shared/schema";

export default function CarDetail() {
  const [match, params] = useRoute<{ id: string }>("/cars/:id");
  const { addToCart } = useContext(CartContext);
  
  // Fetch car details
  const { data: car, isLoading: isLoadingCar, error: carError } = useQuery<Car>({
    queryKey: [`/api/cars/${params?.id}`],
    enabled: !!params?.id,
  });
  
  // Fetch car reviews
  const { data: reviews, isLoading: isLoadingReviews } = useQuery<Review[]>({
    queryKey: [`/api/cars/${params?.id}/reviews`],
    enabled: !!params?.id,
  });
  
  // Set document title
  useEffect(() => {
    if (car) {
      document.title = `${car.name} - AutoMart`;
    } else {
      document.title = "Car Details - AutoMart";
    }
  }, [car]);
  
  // Calculate average rating
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;
  
  const { fullStars, hasHalfStar, emptyStars } = generateStarRating(averageRating);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (car) {
      addToCart(car.id);
    }
  };
  
  if (isLoadingCar) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-2/3 bg-gray-300 h-96 rounded-lg"></div>
          <div className="w-full md:w-1/3">
            <div className="bg-gray-300 h-8 w-3/4 rounded mb-4"></div>
            <div className="bg-gray-300 h-6 w-1/2 rounded mb-4"></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-6 rounded"></div>
              ))}
            </div>
            <div className="bg-gray-300 h-12 rounded mb-4"></div>
            <div className="bg-gray-300 h-12 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (carError || !car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-heading font-bold text-red-600 mb-2">Car Not Found</h2>
          <p className="text-gray-700 mb-4">We couldn't find the car you're looking for.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Car Details Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Car Image */}
        <div className="w-full md:w-2/3">
          <img 
            src={car.imageUrl} 
            alt={car.name}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        
        {/* Car Info */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {car.isFeatured && (
              <Badge className="bg-accent text-black mb-2">Featured</Badge>
            )}
            <h1 className="font-heading font-bold text-3xl mb-2">{car.name}</h1>
            <div className="flex items-center mb-4">
              <div className="text-yellow-400 flex">
                {[...Array(fullStars)].map((_, i) => (
                  <i key={`full-${i}`} className="fas fa-star"></i>
                ))}
                {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                  <i key={`empty-${i}`} className="far fa-star"></i>
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-2">
                ({reviews?.length || 0} reviews)
              </span>
            </div>
            
            <div className="text-2xl font-heading font-bold text-primary mb-6">
              {formatCurrency(car.price)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
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
              <div className="flex items-center text-gray-700">
                <i className="fas fa-car mr-2 text-gray-400"></i>
                <span>{car.bodyType}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <i className="fas fa-tag mr-2 text-gray-400"></i>
                <span>{car.brand}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-white mb-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              Back to Listings
            </Button>
          </div>
        </div>
      </div>
      
      {/* Description Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-heading font-bold text-2xl mb-4">Description</h2>
        <p className="text-gray-700">{car.description}</p>
      </div>
      
      {/* Features Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-heading font-bold text-2xl mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {car.features.split(',').map((feature, index) => (
            <div key={index} className="flex items-center">
              <i className="fas fa-check-circle text-primary mr-2"></i>
              <span className="text-gray-700">{feature.trim()}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="font-heading font-bold text-2xl mb-4">Customer Reviews</h2>
        
        {isLoadingReviews ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-300 w-24 mb-2 rounded"></div>
                    <div className="h-3 bg-gray-300 w-32 rounded"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
              </div>
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map(review => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold">{review.userName}</h4>
                    <div className="text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={i < review.rating ? "fas fa-star" : "far fa-star"}></i>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet for this vehicle.</p>
        )}
      </div>
    </div>
  );
}
