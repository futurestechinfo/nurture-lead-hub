
import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit2, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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

interface LeadTableRowProps {
  lead: Lead;
  isSelected: boolean;
  onSelectLead: (id: number) => void;
  editingLeadId: number | null;
  editFormData: {
    name: string;
    mobile: string;
    email: string;
    status: string;
    followup_status: string;
  };
  statusOptions: string[];
  followupOptions: string[];
  handleEditClick: (lead: Lead) => void;
  handleEditFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (value: string, field: string) => void;
  handleEditSubmit: () => void;
  setEditingLeadId: (id: number | null) => void;
  handleDeleteLead: (id: number) => void;
  getStatusBadgeColor: (status: string) => string;
  getFollowupBadgeColor: (followup: string) => string;
}

const LeadTableRow = ({
  lead,
  isSelected,
  onSelectLead,
  editingLeadId,
  editFormData,
  statusOptions,
  followupOptions,
  handleEditClick,
  handleEditFormChange,
  handleStatusChange,
  handleEditSubmit,
  setEditingLeadId,
  handleDeleteLead,
  getStatusBadgeColor,
  getFollowupBadgeColor
}: LeadTableRowProps) => {
  const navigate = useNavigate();
  
  return (
    <TableRow key={lead.id}>
      <TableCell>
        <Checkbox 
          checked={isSelected} 
          onCheckedChange={() => onSelectLead(lead.id)}
        />
      </TableCell>
      <TableCell className="font-medium">{lead.id}</TableCell>
      
      {editingLeadId === lead.id ? (
        <>
          <TableCell>
            <Input 
              type="text" 
              name="name" 
              value={editFormData.name}
              onChange={handleEditFormChange}
              className="h-8"
            />
          </TableCell>
          <TableCell>
            <Input 
              type="text" 
              name="mobile" 
              value={editFormData.mobile}
              onChange={handleEditFormChange}
              className="h-8"
            />
          </TableCell>
          <TableCell>
            <Input 
              type="text" 
              name="email" 
              value={editFormData.email}
              onChange={handleEditFormChange}
              className="h-8"
            />
          </TableCell>
          <TableCell>
            <Select 
              value={editFormData.status}
              onValueChange={(value) => handleStatusChange(value, "status")}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>
            <Select 
              value={editFormData.followup_status}
              onValueChange={(value) => handleStatusChange(value, "followup_status")}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select followup" />
              </SelectTrigger>
              <SelectContent>
                {followupOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell>{lead.owner}</TableCell>
          <TableCell>{lead.modified_date}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditSubmit()}
              >
                <Check size={16} className="text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingLeadId(null)}
              >
                <X size={16} className="text-red-600" />
              </Button>
            </div>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell>{lead.name}</TableCell>
          <TableCell>{lead.mobile}</TableCell>
          <TableCell className="max-w-[180px] truncate">{lead.email}</TableCell>
          <TableCell>
            <Badge className={getStatusBadgeColor(lead.status)}>
              {lead.status}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge className={getFollowupBadgeColor(lead.followup_status)}>
              {lead.followup_status}
            </Badge>
          </TableCell>
          <TableCell>{lead.owner}</TableCell>
          <TableCell className="text-muted-foreground">{lead.modified_date}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/leads/${lead.id}`)}
                title="View Lead"
              >
                <Eye size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditClick(lead)}
                title="Edit Lead"
              >
                <Edit2 size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteLead(lead.id)}
                title="Delete Lead"
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </div>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default LeadTableRow;
