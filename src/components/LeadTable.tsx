
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import { leadService } from "@/services/api";
import { useLeadSearch } from "@/hooks/useLeadSearch";
import { useLeadEditor } from "@/hooks/useLeadEditor";
import { useLeadBulkActions } from "@/hooks/useLeadBulkActions";
import { useLeadSorting } from "@/hooks/useLeadSorting";
import { statusOptions, followupOptions, getStatusBadgeColor, getFollowupBadgeColor } from "@/utils/leadStatusUtils";

import LeadTableHeader from "@/components/leads/LeadTableHeader";
import LeadTableRow from "@/components/leads/LeadTableRow";
import LeadTableActions from "@/components/leads/LeadTableActions";

interface LeadTableProps {
  searchQuery?: string;
}

const LeadTable = ({ searchQuery = "" }: LeadTableProps) => {
  // Fetch leads from API
  const { data: leads = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['leads'],
    queryFn: leadService.getLeads,
  });
  
  // Use custom hook for searching leads
  const { filteredLeads } = useLeadSearch(leads, searchQuery);

  // Use custom hooks for lead management
  const { 
    editingLeadId,
    editFormData,
    setEditingLeadId,
    handleEditClick,
    handleEditFormChange,
    handleStatusChange,
    handleEditSubmit,
    handleDeleteLead
  } = useLeadEditor();

  const {
    selectedLeads,
    handleSelectLead,
    handleSelectAllLeads,
    handleBulkUpdate
  } = useLeadBulkActions(filteredLeads);

  const {
    sortField,
    sortDirection,
    handleSort,
    sortedLeads
  } = useLeadSorting(filteredLeads);

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading leads</p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Recent Leads</CardTitle>
        <LeadTableActions
          selectedLeads={selectedLeads}
          statusOptions={statusOptions}
          followupOptions={followupOptions}
          handleBulkUpdate={handleBulkUpdate}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading leads...</span>
          </div>
        ) : (
          <Table>
            <LeadTableHeader
              onSelectAll={handleSelectAllLeads}
              allSelected={selectedLeads.length === filteredLeads.length}
              handleSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
              hasItems={filteredLeads.length > 0}
            />
            <TableBody>
              {sortedLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    No leads found. Add your first lead to get started.
                  </TableCell>
                </TableRow>
              ) : (
                sortedLeads.map((lead) => (
                  <LeadTableRow
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLeads.includes(lead.id)}
                    onSelectLead={handleSelectLead}
                    editingLeadId={editingLeadId}
                    editFormData={editFormData}
                    statusOptions={statusOptions}
                    followupOptions={followupOptions}
                    handleEditClick={handleEditClick}
                    handleEditFormChange={handleEditFormChange}
                    handleStatusChange={handleStatusChange}
                    handleEditSubmit={handleEditSubmit}
                    setEditingLeadId={setEditingLeadId}
                    handleDeleteLead={handleDeleteLead}
                    getStatusBadgeColor={getStatusBadgeColor}
                    getFollowupBadgeColor={getFollowupBadgeColor}
                  />
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default LeadTable;
