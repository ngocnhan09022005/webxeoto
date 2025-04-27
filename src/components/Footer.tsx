import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-car-side text-accent text-3xl mr-2"></i>
              <span className="font-heading font-bold text-2xl">AutoMart</span>
            </div>
            <p className="text-gray-400 mb-4">Your trusted source for quality vehicles at competitive prices.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/cars" className="text-gray-400 hover:text-white transition-colors">Browse Cars</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sell Your Car</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Financing</a></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Payment Options</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
                <span className="text-gray-400">123 Auto Avenue, Car City, CC 12345</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-gray-400"></i>
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-gray-400"></i>
                <span className="text-gray-400">info@automart.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 text-gray-400"></i>
                <span className="text-gray-400">Mon-Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} AutoMart. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
