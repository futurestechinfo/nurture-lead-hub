
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound, User } from "lucide-react";
import { authService } from "@/services/api";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authService.login(username, password);
      
      if (response.success) {
        // Store auth data in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }
        
        toast.success("Login successful", {
          description: "Welcome to the Lead Management System"
        });
        
        navigate("/");
      } else {
        toast.error("Login failed", {
          description: response.message || "Invalid username or password"
        });
      }
    } catch (error: any) {
      const errorMessage = 
        error.response?.status === 404 
          ? "Login API endpoint not found. Please check your server configuration."
          : error.response?.data?.message || "A server error occurred. Please try again.";
          
      toast.error("Login failed", {
        description: errorMessage
      });
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/20704a4f-2fa8-44ae-8e4f-c23a0d1d04df.png" 
              alt="Futures Tech Logo"
              className="h-16" 
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-[#002855]">Lead Management</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="pl-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#FF6B00] hover:bg-[#E45A00]" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
