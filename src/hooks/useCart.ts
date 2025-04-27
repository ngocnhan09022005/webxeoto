import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { CartItemWithDetails } from "@/App";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Fetch cart items
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/cart'],
    staleTime: 1000 * 60,
  });
  
  // Add to cart mutation
  const addMutation = useMutation({
    mutationFn: async (carId: number) => {
      const response = await apiRequest('POST', '/api/cart', { carId, quantity: 1 });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Added to cart",
        description: "The item has been added to your cart",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding to cart",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  });
  
  // Update quantity mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number, quantity: number }) => {
      const response = await apiRequest('PUT', `/api/cart/${id}`, { quantity });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: (error) => {
      toast({
        title: "Error updating cart",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  });
  
  // Remove from cart mutation
  const removeMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/cart/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      toast({
        title: "Removed from cart",
        description: "The item has been removed from your cart",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error removing from cart",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  });
  
  useEffect(() => {
    if (data) {
      setCartItems(data);
      
      // Calculate totals
      const sub = data.reduce((sum: number, item: CartItemWithDetails) => 
        sum + (item.car.price * item.quantity), 0);
      const taxAmount = sub * 0.06; // 6% tax
      
      setSubtotal(sub);
      setTax(taxAmount);
      setTotal(sub + taxAmount);
    }
  }, [data]);
  
  // Cart operations
  const addToCart = (carId: number) => {
    addMutation.mutate(carId);
  };
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateMutation.mutate({ id, quantity });
    } else {
      removeFromCart(id);
    }
  };
  
  const removeFromCart = (id: number) => {
    removeMutation.mutate(id);
  };
  
  const clearCart = () => {
    cartItems.forEach(item => removeFromCart(item.id));
  };
  
  return {
    cartItems,
    isLoading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    total
  };
}
