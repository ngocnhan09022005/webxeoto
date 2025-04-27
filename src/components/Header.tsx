import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/App";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const { toast } = useToast();
  const [location] = useLocation();
  
  // Get current user
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/auth/me'],
    onError: () => {},
    staleTime: Infinity
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      setIsLoginDialogOpen(false);
      setUsername("");
      setPassword("");
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.username}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    }
  });
  
  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/register', credentials);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      setIsRegisterDialogOpen(false);
      setUsername("");
      setPassword("");
      toast({
        title: "Registration Successful",
        description: `Welcome, ${data.username}!`,
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    }
  });
  
  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/auth/logout', {});
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      toast({
        title: "Logout Successful",
        description: "You have been logged out",
      });
    }
  });
  
  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    loginMutation.mutate({ username, password });
  };
  
  // Handle register form submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    registerMutation.mutate({ username, password });
  };
  
  // Handle logout
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <i className="fas fa-car-side text-primary text-3xl mr-2"></i>
              <span className="font-heading font-bold text-2xl text-primary">AutoMart</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium ${location === '/' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>
              Home
            </Link>
            <Link href="/cars" className={`font-medium ${location === '/cars' || location.startsWith('/cars/') ? 'text-primary' : 'hover:text-primary'} transition-colors`}>
              Cars
            </Link>
            <Link href="/about" className={`font-medium ${location === '/about' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>
              About
            </Link>
            <Link href="/contact" className={`font-medium ${location === '/contact' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>
              Contact
            </Link>
            {user?.isAdmin && (
              <Link href="/admin" className={`font-medium ${location === '/admin' ? 'text-primary' : 'hover:text-primary'} transition-colors`}>
                Admin
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="relative" 
              onClick={() => setIsCartOpen(true)} 
              aria-label="Open shopping cart"
            >
              <i className="fas fa-shopping-cart text-gray-700 text-xl hover:text-primary transition-colors"></i>
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>
            
            {!isLoading && user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-700">Hello, {user.username}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors hidden md:block">
                    <i className="fas fa-user mr-2"></i>Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                    <DialogDescription>
                      Enter your credentials below to access your account
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                      />
                    </div>
                    <DialogFooter className="flex justify-between items-center">
                      <div className="text-sm">
                        <span>Don't have an account? </span>
                        <Button 
                          type="button" 
                          variant="link" 
                          className="p-0"
                          onClick={() => {
                            setIsLoginDialogOpen(false);
                            setIsRegisterDialogOpen(true);
                          }}
                        >
                          Register
                        </Button>
                      </div>
                      <Button type="submit" disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
            
            <button 
              className="md:hidden text-gray-700" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 space-y-3">
            <Link href="/" className="block py-2 px-4 font-medium hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link href="/cars" className="block py-2 px-4 font-medium hover:bg-gray-100 rounded">
              Cars
            </Link>
            <Link href="/about" className="block py-2 px-4 font-medium hover:bg-gray-100 rounded">
              About
            </Link>
            <Link href="/contact" className="block py-2 px-4 font-medium hover:bg-gray-100 rounded">
              Contact
            </Link>
            {user?.isAdmin && (
              <Link href="/admin" className="block py-2 px-4 font-medium hover:bg-gray-100 rounded">
                Admin
              </Link>
            )}
            {user ? (
              <>
                <div className="py-2 px-4 font-medium text-gray-700">
                  Hello, {user.username}
                </div>
                <button 
                  className="block py-2 px-4 font-medium text-primary"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                className="block py-2 px-4 font-medium text-primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginDialogOpen(true);
                }}
              >
                <i className="fas fa-user mr-2"></i>Login
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Register Dialog */}
      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription>
              Register to access exclusive features and track your orders
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="register-username">Username</Label>
              <Input 
                id="register-username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Choose a username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input 
                id="register-password" 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Choose a password"
              />
            </div>
            <DialogFooter className="flex justify-between items-center">
              <div className="text-sm">
                <span>Already have an account? </span>
                <Button 
                  type="button" 
                  variant="link" 
                  className="p-0"
                  onClick={() => {
                    setIsRegisterDialogOpen(false);
                    setIsLoginDialogOpen(true);
                  }}
                >
                  Login
                </Button>
              </div>
              <Button type="submit" disabled={registerMutation.isPending}>
                {registerMutation.isPending ? "Registering..." : "Register"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
