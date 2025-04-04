
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { leadService } from "@/services/api";

interface Lead {
  id: number;
  name: string;
  email: string;
  mobile: string;
  status: string;
  followup_status: string;
  owner: string;
  created_date: string;
  modified_date: string;
}

interface LeadFormData {
  name: string;
  mobile: string;
  email: string;
  status: string;
  followup_status: string;
}

export const useLeadEditor = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<LeadFormData>({
    name: "",
    mobile: "",
    email: "",
    status: "",
    followup_status: ""
  });

  const handleEditClick = (lead: Lead) => {
    setEditingLeadId(lead.id);
    setEditFormData({
      name: lead.name,
      mobile: lead.mobile,
      email: lead.email,
      status: lead.status,
      followup_status: lead.followup_status
    });
  };

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleStatusChange = (value: string, field: string) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  const handleEditSubmit = async () => {
    try {
      await leadService.updateLead(editingLeadId!, {
        ...editFormData
      });
      
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      setEditingLeadId(null);
      
      toast({
        title: "Lead updated",
        description: "Lead information has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        title: "Error updating lead",
        description: "There was a problem updating the lead.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteLead = async (id: number) => {
    try {
      await leadService.deleteLead(id);
      
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      
      toast({
        title: "Lead deleted",
        description: "Lead has been removed successfully.",
      });
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        title: "Error deleting lead",
        description: "There was a problem deleting the lead.",
        variant: "destructive"
      });
    }
  };

  return {
    editingLeadId,
    editFormData,
    setEditingLeadId,
    handleEditClick,
    handleEditFormChange,
    handleStatusChange,
    handleEditSubmit,
    handleDeleteLead
  };
};
