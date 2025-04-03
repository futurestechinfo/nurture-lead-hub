
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import LeadDetailsHeader from "@/components/LeadDetailsHeader";
import LeadComments from "@/components/LeadComments";

const LeadDetails = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="max-w-4xl mx-auto w-full">
            <LeadDetailsHeader />
            <LeadComments />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeadDetails;
