
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

interface LeadTableActionsProps {
  selectedLeads: number[];
  statusOptions: string[];
  followupOptions: string[];
  handleBulkUpdate: (field: string, value: string) => void;
}

const LeadTableActions = ({ 
  selectedLeads, 
  statusOptions, 
  followupOptions, 
  handleBulkUpdate 
}: LeadTableActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {selectedLeads.length > 0 && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Bulk Update Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {statusOptions.map(status => (
                <DropdownMenuItem 
                  key={status}
                  onClick={() => handleBulkUpdate("status", status)}
                >
                  Set to {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Bulk Update Follow-up
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {followupOptions.map(option => (
                <DropdownMenuItem 
                  key={option}
                  onClick={() => handleBulkUpdate("followup_status", option)}
                >
                  Set to {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      
      <Button variant="outline" size="sm">
        <Filter size={16} className="mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default LeadTableActions;
