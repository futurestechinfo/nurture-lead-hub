
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";

// Create a comments service
const API_URL = 'http://localhost:8000/api';

const commentsService = {
  getComments: async (leadId: string) => {
    const response = await axios.get(`${API_URL}/leads/${leadId}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    return response.data;
  },
  
  addComment: async (leadId: string, content: string) => {
    const response = await axios.post(
      `${API_URL}/leads/${leadId}/comments`, 
      { content },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      }
    );
    return response.data;
  }
};

const LeadComments = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get username from localStorage
  const username = localStorage.getItem('username') || 'User';
  
  // Fetch comments for this lead
  const { data: comments = [], isLoading, isError } = useQuery({
    queryKey: ['leadComments', id],
    queryFn: () => id ? commentsService.getComments(id) : Promise.resolve([]),
    enabled: !!id
  });
  
  const handleAddComment = async () => {
    if (!newComment.trim() || !id) return;
    
    setIsSubmitting(true);
    
    try {
      await commentsService.addComment(id, newComment);
      
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['leadComments', id] });
      
      // Clear the form
      setNewComment("");
      
      toast({
        title: "Comment added",
        description: "Your comment was added successfully.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      
      toast({
        title: "Error adding comment",
        description: "There was a problem adding your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Loading comments...</span>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-red-500">
            Error loading comments. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments & Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment or note..."
              className="resize-none mb-2"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
            <Button 
              onClick={handleAddComment} 
              disabled={!newComment.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Comment"
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No comments yet</p>
          ) : (
            comments.map((comment: any) => (
              <div key={comment.id} className="flex space-x-4 pb-4 border-b">
                <Avatar>
                  <AvatarFallback>{getInitials(comment.user_name || "User")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{comment.user_name || "User"}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="mt-1">{comment.comment}</p>
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
