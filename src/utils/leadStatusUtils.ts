
/**
 * Get the Tailwind CSS class for a lead status badge
 */
export const getStatusBadgeColor = (status: string): string => {
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

/**
 * Get the Tailwind CSS class for a follow-up status badge
 */
export const getFollowupBadgeColor = (followup: string): string => {
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

// Static data
export const statusOptions = ["New", "Contacted", "Qualified", "Converted", "Closed"];
export const followupOptions = ["None", "Scheduled", "Completed"];
