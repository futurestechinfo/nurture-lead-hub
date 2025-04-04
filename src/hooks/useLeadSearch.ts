
import { useState, useEffect, useMemo } from 'react';

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

export function useLeadSearch(leads: Lead[], searchQuery: string = "") {
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) {
      return leads;
    }
    
    const lowercaseQuery = searchQuery.toLowerCase();
    return leads.filter((lead) => {
      return (
        lead.name?.toLowerCase().includes(lowercaseQuery) ||
        lead.email?.toLowerCase().includes(lowercaseQuery) ||
        lead.mobile?.toLowerCase().includes(lowercaseQuery) ||
        lead.status?.toLowerCase().includes(lowercaseQuery) ||
        lead.owner?.toLowerCase().includes(lowercaseQuery)
      );
    });
  }, [leads, searchQuery]);

  return { filteredLeads };
}
