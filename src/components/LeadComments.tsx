
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { mockComments } from "@/data/mockData";

const LeadComments = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState("");
  
  // Get comments for this lead
  const leadComments = mockComments.filter(c => c.leadId.toString() === id);
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    console.log("Adding comment:", newComment);
    // In a real app, we would send this to an API
    
    // For now just reset the form
    setNewComment("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments & Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment or note..."
              className="resize-none mb-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment} disabled={!newComment.trim()}>
              Add Comment
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          {leadComments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No comments yet</p>
          ) : (
            leadComments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 pb-4 border-b">
                <Avatar>
                  <AvatarFallback>{getInitials(comment.author)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="mt-1">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadComments;
