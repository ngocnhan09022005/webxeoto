import { useEffect } from "react";

export default function About() {
  // Set title
  useEffect(() => {
    document.title = "About Us - AutoMart";
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading font-bold text-4xl mb-6">About AutoMart</h1>
        
        {/* Company Introduction */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-4">Our Story</h2>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <p className="text-gray-700 mb-4">
              AutoMart was founded in 2020 with a simple mission: to make car buying and selling easier, more transparent, and more enjoyable for everyone. What began as a small startup has quickly grown into one of the most trusted online car marketplaces.
            </p>
            <p className="text-gray-700 mb-4">
              We've revolutionized the traditional car buying process by bringing it online, giving customers access to thousands of quality vehicles from the comfort of their homes. Our comprehensive listings, detailed vehicle information, and transparent pricing have set new standards in the industry.
            </p>
            <p className="text-gray-700">
              Today, AutoMart serves customers nationwide, connecting buyers with their perfect vehicles and helping sellers find the right buyers. We continue to innovate and improve our platform, always keeping our customers' needs at the heart of everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80" 
                alt="AutoMart headquarters" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2">Our Headquarters</h3>
                <p className="text-gray-700">
                  Located in the heart of Car City, our state-of-the-art headquarters houses our team of automotive experts, customer service representatives, and technology innovators.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80" 
                alt="AutoMart team" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-2">Our Team</h3>
                <p className="text-gray-700">
                  Our diverse team combines automotive industry veterans, technology experts, and customer service professionals, all united by a passion for reimagining the car buying experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission and Values */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-4">Our Mission & Values</h2>
          <div className="bg-primary text-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="font-heading font-bold text-xl mb-3">Our Mission</h3>
            <p className="text-white/90 text-lg italic">
              "To transform the automotive marketplace by providing a transparent, convenient, and enjoyable car buying and selling experience for everyone."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-check-circle text-primary text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Integrity</h3>
              <p className="text-gray-700">
                We believe in complete transparency with our customers. No hidden fees, no misleading information — just honest dealings and fair pricing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-star text-primary text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Excellence</h3>
              <p className="text-gray-700">
                We strive for excellence in everything we do, from the quality of vehicles we offer to the customer service we provide and the technology we develop.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-users text-primary text-2xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Customer Focus</h3>
              <p className="text-gray-700">
                Our customers are at the heart of every decision we make. We continuously evolve our platform based on customer feedback and needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-4">How AutoMart Works</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 mb-4 md:mb-0 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Browse Our Inventory</h3>
                <p className="text-gray-700">
                  Explore thousands of certified pre-owned and new vehicles from trusted dealers and private sellers. Use our advanced search filters to find exactly what you're looking for.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 mb-4 md:mb-0 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Get Vehicle Details</h3>
                <p className="text-gray-700">
                  View comprehensive vehicle information, including high-quality photos, detailed specifications, vehicle history reports, and honest condition assessments.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row mb-6 pb-6 border-b">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 mb-4 md:mb-0 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Secure Financing</h3>
                <p className="text-gray-700">
                  Apply for financing through our platform and get competitive rates from our network of trusted lenders. Check your estimated monthly payments with our payment calculator.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mr-6 mb-4 md:mb-0 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl mb-2">Complete Your Purchase</h3>
                <p className="text-gray-700">
                  Finalize your purchase online or at one of our partner dealerships. We'll help arrange delivery or pickup of your new vehicle, and provide support every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Achievements */}
        <section>
          <h2 className="font-heading font-bold text-2xl mb-4">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-primary text-5xl font-bold mb-2">120K+</div>
              <p className="text-gray-700 font-medium">Happy Customers</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-primary text-5xl font-bold mb-2">15K+</div>
              <p className="text-gray-700 font-medium">Cars Sold</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-primary text-5xl font-bold mb-2">98%</div>
              <p className="text-gray-700 font-medium">Customer Satisfaction</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-primary text-5xl font-bold mb-2">24/7</div>
              <p className="text-gray-700 font-medium">Customer Support</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}