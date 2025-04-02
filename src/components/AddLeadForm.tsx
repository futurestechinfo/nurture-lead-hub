
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AddLeadFormProps {
  open: boolean;
  onClose: () => void;
}

const AddLeadForm = ({ open, onClose }: AddLeadFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    status: "new",
    owner: "admin"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this data to an API
    console.log("Submitting lead:", formData);
    
    toast({
      title: "Lead created successfully",
      description: `${formData.name} has been added to the system.`,
    });
    
    onClose();
    // In real app we might navigate to the new lead
    // navigate(`/leads/${newLeadId}`);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md space-y-6">
        <SheetHeader>
          <SheetTitle>Add New Lead</SheetTitle>
          <SheetDescription>
            Create a new lead in the system. Fill out all required fields.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Enter mobile number"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <Label htmlFor="status">Lead Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="owner">Lead Owner</Label>
              <Select
                value={formData.owner}
                onValueChange={(value) => handleSelectChange("owner", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="sarah">Sarah Smith</SelectItem>
                  <SelectItem value="alex">Alex Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit">
              Save Lead
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddLeadForm;
