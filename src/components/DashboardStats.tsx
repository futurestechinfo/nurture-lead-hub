
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  UserCheck, 
  AlertCircle, 
  Calendar 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leadService } from "@/services/api";

const DashboardStats = () => {
  // Fetch leads data
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: leadService.getLeads,
  });
  
  // Calculate stats from leads data
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(lead => lead.status === 'Converted').length;
  const pendingLeads = leads.filter(lead => 
    lead.status !== 'Converted' && lead.status !== 'Closed'
  ).length;
  const followupLeads = leads.filter(lead => 
    lead.followup_status === 'Scheduled'
  ).length;

  const stats = [
    {
      title: "Total Leads",
      value: isLoading ? "..." : totalLeads.toString(),
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Converted",
      value: isLoading ? "..." : convertedLeads.toString(),
      icon: UserCheck,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending",
      value: isLoading ? "..." : pendingLeads.toString(),
      icon: AlertCircle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      title: "Follow-ups",
      value: isLoading ? "..." : followupLeads.toString(),
      icon: Calendar,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`${stat.bgColor} p-2 rounded-full`}>
                <stat.icon className={`${stat.iconColor}`} size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
