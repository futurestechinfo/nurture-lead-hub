
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { KeyRound, User } from "lucide-react";

// This would be replaced with a real API call to your MySQL database backend
const authenticateUser = async (username: string, password: string) => {
  // Simulate API call
  console.log(`Authenticating user: ${username} with MySQL database`);
  
  // TODO: Replace with actual API call to your MySQL backend
  return new Promise<{ success: boolean, message: string }>((resolve) => {
    setTimeout(() => {
      // Mock authentication logic - in a real app, this would call your backend
      if (username === "admin" && password === "password123") {
        resolve({ success: true, message: "Login successful" });
      } else {
        resolve({ success: false, message: "Invalid username or password" });
      }
    }, 1000);
  });
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authenticateUser(username, password);
      
      if (result.success) {
        // Store authentication state in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        
        toast.success("Login successful", {
          description: "Welcome to the Lead Management System"
        });
        
        navigate("/");
      } else {
        toast.error("Login failed", {
          description: result.message
        });
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "A server error occurred. Please try again."
      });
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Lead Management</CardTitle>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
