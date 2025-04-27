import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import CarCard from "@/components/CarCard";
import { Car, CarSearch } from "@shared/schema";
import SearchForm from "@/components/SearchForm";

export default function CarList() {
  const [location, setLocation] = useLocation();
  const [searchParams, setSearchParams] = useState<CarSearch>({
    brand: undefined,
    model: undefined,
    priceRange: undefined,
    bodyType: undefined
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  // Get URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get("brand") || undefined;
    const model = params.get("model") || undefined;
    const priceRange = params.get("priceRange") || undefined;
    const bodyType = params.get("bodyType") || undefined;
    
    setSearchParams({
      brand,
      model,
      priceRange,
      bodyType
    });
  }, [location]);

  // Set title
  useEffect(() => {
    document.title = "Browse Cars - AutoMart";
  }, []);

  // Get cars based on search parameters
  const { data: cars, isLoading, error } = useQuery<Car[]>({
    queryKey: ['/api/cars/search', searchParams],
    keepPreviousData: true,
  });

  // Get all cars if no search parameters
  const { data: allCars } = useQuery<Car[]>({
    queryKey: ['/api/cars'],
    enabled: !searchParams.brand && !searchParams.model && !searchParams.priceRange && !searchParams.bodyType,
  });

  const displayCars = cars || allCars || [];

  // Handle search form submission
  const handleSearchSubmit = (search: CarSearch) => {
    const params = new URLSearchParams();
    
    if (search.brand) params.append("brand", search.brand);
    if (search.model) params.append("model", search.model);
    if (search.priceRange) params.append("priceRange", search.priceRange);
    if (search.bodyType) params.append("bodyType", search.bodyType);
    
    setLocation(`/cars?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-heading font-bold mb-6">Filters</h2>
          
          <SearchForm onSubmit={handleSearchSubmit} initialValues={searchParams} />
          
          {/* Clear filters button */}
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => setLocation("/cars")}
          >
            Clear All Filters
          </Button>
        </div>
        
        {/* Car listing */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-heading font-bold">Available Cars</h1>
            <p className="text-gray-600">{displayCars.length} cars found</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md h-96 animate-pulse">
                  <div className="w-full h-56 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-4 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg text-red-500">
              <p>Error loading cars. Please try again later.</p>
            </div>
          ) : displayCars.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-heading font-semibold mb-2">No cars found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more results.</p>
              <Button onClick={() => setLocation("/cars")}>View All Cars</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
