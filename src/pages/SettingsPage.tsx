
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account and application preferences</p>
          </div>
          
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="team">Team Members</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure general settings for your admin panel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>General settings content will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage team members and their permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Team management content will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Notification settings content will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
