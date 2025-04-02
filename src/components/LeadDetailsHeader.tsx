
import { useState } from "react";
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

const LeadDetailsHeader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the lead from our mock data
  const lead = mockLeads.find(l => l.id.toString() === id);
  
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
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/leads")}
              className="mr-2"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Lead Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Calendar size={16} className="mr-2" />
              Schedule Follow-up
            </Button>
            <Button>
              <Edit2 size={16} className="mr-2" />
              Edit Lead
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                {getInitials(lead.name)}
              </AvatarFallback>
            </Avatar>
            <Badge className={`${getStatusColor(lead.status)} mt-2`}>
              {lead.status}
            </Badge>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-bold">{lead.name}</h2>
              <p className="text-muted-foreground">Lead #{lead.id}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Phone size={18} className="text-muted-foreground mr-2" />
                <p>{lead.mobile}</p>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-muted-foreground mr-2" />
                <p>{lead.email}</p>
              </div>
              <div className="flex items-center">
                <User size={18} className="text-muted-foreground mr-2" />
                <p>Owner: {lead.owner}</p>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="text-muted-foreground mr-2" />
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
