
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardStats from "@/components/DashboardStats";
import LeadTable from "@/components/LeadTable";
import AddLeadForm from "@/components/AddLeadForm";

const Index = () => {
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onSearch={handleSearch} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button onClick={() => setAddLeadOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add Lead
            </Button>
          </div>
          
          <DashboardStats />
          
          <div className="mt-6">
            <LeadTable searchQuery={searchQuery} />
          </div>
        </main>
      </div>
      
      <AddLeadForm 
        open={addLeadOpen} 
        onClose={() => setAddLeadOpen(false)} 
      />
    </div>
  );
};

export default Index;
