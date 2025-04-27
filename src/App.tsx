import { Switch, Route } from "wouter";
import { Suspense, lazy, useState, useEffect, createContext } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShoppingCart from "@/components/ShoppingCart";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@shared/schema";

// Lazy load pages
const Home = lazy(() => import("@/pages/Home"));
const CarList = lazy(() => import("@/pages/CarList"));
const CarDetail = lazy(() => import("@/pages/CarDetail"));
const Admin = lazy(() => import("@/pages/Admin"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Define CartItemWithDetails type
export type CartItemWithDetails = CartItem & {
  car: {
    id: number;
    name: string;
    year: number;
    price: number;
    mileage: number;
    transmission: string;
    imageUrl: string;
  }
};

// Create cart context with correct types
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: (open: boolean) => {},
  cartItems: [] as CartItemWithDetails[],
  addToCart: (carId: number) => {},
  removeFromCart: (id: number) => {},
  updateQuantity: (id: number, quantity: number) => {},
  clearCart: () => {},
  subtotal: 0,
  tax: 0,
  total: 0,
});

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, tax, total } = useCart();

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      tax,
      total
    }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <ShoppingCart />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/cars" component={CarList} />
              <Route path="/cars/:id" component={CarDetail} />
              <Route path="/admin" component={Admin} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}

export default App;
