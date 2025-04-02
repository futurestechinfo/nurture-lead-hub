
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu, 
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Leads", path: "/leads", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white shadow-lg transition-all duration-300 border-r",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {expanded ? (
          <h1 className="text-xl font-bold text-primary">LeadHub</h1>
        ) : (
          <h1 className="text-xl font-bold text-primary">LH</h1>
        )}
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
          {expanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <item.icon className="text-primary" size={20} />
                {expanded && <span className="ml-3">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
