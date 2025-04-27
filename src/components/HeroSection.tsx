import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carSearchSchema, type CarSearch } from "@shared/schema";
import SearchForm from "@/components/SearchForm";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const handleSearchSubmit = (data: CarSearch) => {
    const params = new URLSearchParams();
    
    if (data.brand && data.brand !== "All Brands") params.append("brand", data.brand);
    if (data.model && data.model !== "All Models") params.append("model", data.model);
    if (data.priceRange && data.priceRange !== "Any Price") params.append("priceRange", data.priceRange);
    if (data.bodyType && data.bodyType !== "All Types") params.append("bodyType", data.bodyType);
    
    setLocation(`/cars?${params.toString()}`);
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-4">Find Your Perfect Car</h1>
            <p className="text-xl text-gray-200 mb-8">Explore thousands of premium cars at the best prices</p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchForm onSubmit={handleSearchSubmit} />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-10">
            <img 
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80" 
              alt="Luxury car" 
              className="rounded-lg shadow-2xl object-cover" 
              width="600" 
              height="400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
