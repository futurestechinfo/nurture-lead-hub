
import React from "react";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface LeadTableHeaderProps {
  onSelectAll: () => void;
  allSelected: boolean;
  handleSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
  hasItems: boolean;
}

const LeadTableHeader = ({
  onSelectAll,
  allSelected,
  handleSort,
  sortField,
  sortDirection,
  hasItems
}: LeadTableHeaderProps) => {
  
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronsUpDown size={16} />;
    return sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox 
            checked={allSelected && hasItems} 
            onCheckedChange={onSelectAll}
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
  );
};

export default LeadTableHeader;
