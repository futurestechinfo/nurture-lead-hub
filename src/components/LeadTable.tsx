
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  Filter,
  Trash2,
  Edit2,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockLeads } from "@/data/mockData";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const LeadTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [leads, setLeads] = useState(mockLeads);
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "",
    followup_status: ""
  });
  
  const statusOptions = ["New", "Contacted", "Qualified", "Converted", "Closed"];
  const followupOptions = ["None", "Scheduled", "Completed"];
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronsUpDown size={16} />;
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  const getStatusBadgeColor = (status: string) => {
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

  const getFollowupBadgeColor = (followup: string) => {
    switch (followup.toLowerCase()) {
      case "scheduled":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "none":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const handleEditClick = (lead: any) => {
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

  const handleEditSubmit = () => {
    const updatedLeads = leads.map(lead => {
      if (lead.id === editingLeadId) {
        return {
          ...lead,
          ...editFormData
        };
      }
      return lead;
    });
    
    setLeads(updatedLeads);
    setEditingLeadId(null);
    
    toast({
      title: "Lead updated",
      description: "Lead information has been updated successfully.",
    });
  };

  const handleDeleteLead = (id: number) => {
    setLeads(leads.filter(lead => lead.id !== id));
    
    toast({
      title: "Lead deleted",
      description: "Lead has been removed successfully.",
      variant: "destructive"
    });
  };

  const handleBulkUpdate = (field: string, value: string) => {
    if (selectedLeads.length === 0) {
      toast({
        title: "No leads selected",
        description: "Please select leads to update.",
        variant: "destructive"
      });
      return;
    }

    const updatedLeads = leads.map(lead => {
      if (selectedLeads.includes(lead.id)) {
        return {
          ...lead,
          [field]: value
        };
      }
      return lead;
    });
    
    setLeads(updatedLeads);
    
    toast({
      title: "Bulk update complete",
      description: `Updated ${selectedLeads.length} leads.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Leads</CardTitle>
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
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedLeads.length === leads.length && leads.length > 0} 
                  onCheckedChange={handleSelectAllLeads}
                />
              </TableHead>
              <TableHead className="w-[80px] cursor-pointer" onClick={() => handleSort("id")}>
                <div className="flex items-center">
                  ID {getSortIcon("id")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">
                  Name {getSortIcon("name")}
                </div>
              </TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Follow-up</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Modified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedLeads.includes(lead.id)} 
                    onCheckedChange={() => handleSelectLead(lead.id)}
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeadTable;
