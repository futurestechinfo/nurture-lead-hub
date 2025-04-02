
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockLeads } from "@/data/mockData";

const LeadTable = () => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Leads</CardTitle>
        <Button variant="outline" size="sm">
          <Filter size={16} className="mr-2" />
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
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
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.id}</TableCell>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <Eye size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LeadTable;
