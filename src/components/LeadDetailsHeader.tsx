
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Edit2, 
  Calendar, 
  Mail, 
  Phone, 
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockLeads } from "@/data/mockData";
import { useQuery } from "@tanstack/react-query";
import { leadService } from "@/services/api";
import { Loader2 } from "lucide-react";

const LeadDetailsHeader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch lead data from API if available, otherwise use mock data
  const { data: apiLead, isLoading } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => id ? leadService.getLeadById(Number(id)) : Promise.resolve(null),
    enabled: !!id,
    // Use this to prevent error toast on missing data (we'll fall back to mock data)
    retry: false
  });
  
  // Find the lead from our mock data if API data is not available
  const mockLead = mockLeads.find(l => l.id.toString() === id);
  
  // Use API data if available, otherwise fall back to mock data
  const lead = apiLead || mockLead;
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading lead details...</span>
        </CardContent>
      </Card>
    );
  }
  
  if (!lead) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Lead not found</h2>
        <Button 
          onClick={() => navigate("/leads")} 
          className="mt-4"
          variant="outline"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Leads
        </Button>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "qualified":
        return "bg-amber-100 text-amber-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-6 shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/leads")}
              className="mr-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-bold">Lead Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="rounded-full">
              <Calendar size={16} className="mr-2" />
              Schedule Follow-up
            </Button>
            <Button className="rounded-full bg-blue-500 hover:bg-blue-600">
              <Edit2 size={16} className="mr-2" />
              Edit Lead
            </Button>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-6">
            <Avatar className="h-24 w-24 bg-blue-500 text-white">
              <AvatarFallback className="text-2xl">
                {getInitials(lead.name)}
              </AvatarFallback>
            </Avatar>
            <Badge className={`${getStatusColor(lead.status)} mt-3 mx-auto`}>
              {lead.status}
            </Badge>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{lead.name}</h2>
            <p className="text-gray-500 mb-4">Lead #{lead.id}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <div className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-3" />
                <p>{lead.mobile}</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-3" />
                <p>{lead.email}</p>
              </div>
              <div className="flex items-center">
                <User size={18} className="text-gray-400 mr-3" />
                <p>Owner: {lead.owner}</p>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="text-gray-400 mr-3" />
                <p>Modified: {lead.modified_date}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadDetailsHeader;
