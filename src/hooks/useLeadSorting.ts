
import { useState, useMemo } from "react";

interface Lead {
  [key: string]: any;
}

export const useLeadSorting = <T extends Lead>(leads: T[]) => {
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

  // Sort leads 
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1) 
        : (bValue > aValue ? 1 : -1);
    });
  }, [leads, sortField, sortDirection]);

  return {
    sortField,
    sortDirection,
    handleSort,
    sortedLeads
  };
};
