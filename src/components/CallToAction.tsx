import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Ready to Find Your Dream Car?</h2>
          <p className="text-white/90 text-lg mb-8">
            Browse our extensive inventory today and drive away with confidence in your purchase.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/cars">
              <Button className="bg-white text-primary font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full sm:w-auto">
                Browse Inventory
              </Button>
            </Link>
            <Button className="bg-secondary text-white font-bold px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors w-full sm:w-auto">
              Sell Your Car
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
