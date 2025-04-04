
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { leadService } from "@/services/api";

interface Lead {
  id: number;
  [key: string]: any;
}

export const useLeadBulkActions = (leads: Lead[]) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  
  // Reset selected leads when leads change
  useEffect(() => {
    setSelectedLeads([]);
  }, [leads]);

  const handleSelectLead = (id: number) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleSelectAllLeads = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const handleBulkUpdate = async (field: string, value: string) => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select leads to update.",
        variant: "destructive"
      });
      return;
    }

    try {
      await leadService.bulkUpdateLeads(selectedLeads, field, value);
      
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      
      toast({
        title: "Bulk update complete",
        description: `Updated ${selectedLeads.length} leads.`,
      });
      
      setSelectedLeads([]);
    } catch (error) {
      console.error("Error bulk updating leads:", error);
      toast({
        title: "Error updating leads",
        description: "There was a problem updating the selected leads.",
        variant: "destructive"
      });
    }
  };

  return {
    selectedLeads,
    handleSelectLead,
    handleSelectAllLeads,
    handleBulkUpdate
  };
};
