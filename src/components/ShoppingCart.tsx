import { useContext, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CartContext } from "@/App";

export default function ShoppingCart() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    subtotal,
    tax,
    total
  } = useContext(CartContext);

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close cart when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    // Add event listener when cart is open
    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleClose = () => {
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div 
        ref={cartRef}
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0 cart-slide-in' : 'translate-x-full cart-slide-out'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-heading font-bold text-xl">
              Your Cart ({cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0})
            </h3>
            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-5xl mb-4">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h4 className="font-heading font-bold text-lg mb-1">Your cart is empty</h4>
                <p className="text-gray-500 mb-4">Looks like you haven't added any cars to your cart yet.</p>
                <Button 
                  variant="outline" 
                  onClick={handleClose}
                >
                  Start Shopping
                </Button>
              </div>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex border-b pb-4 mb-4">
                    <img 
                      src={item.car.imageUrl} 
                      alt={item.car.name} 
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-heading font-medium">{item.car.name}</h4>
                        <span className="font-heading font-bold text-primary">
                          {formatCurrency(item.car.price)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-2">
                        {item.car.year} • {formatCurrency(item.car.mileage)} • {item.car.transmission}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button 
                            className="w-6 h-6 border rounded-l flex items-center justify-center hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="fas fa-minus text-xs"></i>
                          </button>
                          <span className="w-8 text-center border-t border-b">{item.quantity}</span>
                          <button 
                            className="w-6 h-6 border rounded-r flex items-center justify-center hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus text-xs"></i>
                          </button>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (6%):</span>
                  <span className="font-bold">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-heading font-bold">Total:</span>
                  <span className="font-heading font-bold text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded transition-colors mb-2">
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full border border-gray-300 bg-white text-gray-700 font-medium py-3 rounded hover:bg-gray-50 transition-colors"
                onClick={handleClose}
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
