
import { Bell, LogOut, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // Get the logged-in username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="w-full h-16 bg-white border-b px-4 flex items-center justify-between">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="text" 
            placeholder="Search leads..." 
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <User size={20} />
          </Button>
          {username && (
            <span className="text-sm font-medium hidden md:inline-block">
              {username}
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
