import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/HeroSection";
import CarCard from "@/components/CarCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import RegisterForm from "@/components/RegisterForm";
import { Car } from "@shared/schema";

export default function Home() {
  const {
    data: featuredCars,
    isLoading,
    error,
  } = useQuery<Car[]>({
    queryKey: ["/api/cars/featured"],
  });

  // Set title
  useEffect(() => {
    document.title = "AutoMart - Premium Car Marketplace";
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Featured Vehicles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our hand-picked selection of premium cars that offer the
              best value for your money
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md h-96 animate-pulse"
                >
                  <div className="w-full h-56 bg-gray-300 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-4 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">
                Failed to load featured cars. Please try again later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars?.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="/cars"
              className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Vehicles
            </a>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />

      {/* Registration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create an account to save your favorite cars, track your
              inquiries, and get exclusive offers
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
