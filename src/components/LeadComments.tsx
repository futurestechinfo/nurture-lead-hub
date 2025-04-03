
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import api from "@/services/api";

// Get API URL from the central service
import { leadService } from "@/services/api";

// Create a comments service using the same API instance
const commentsService = {
  getComments: async (leadId: string) => {
    try {
      const response = await api.get(`/leads/${leadId}/comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  
  addComment: async (leadId: string, content: string) => {
    try {
      const response = await api.post(
        `/leads/${leadId}/comments`, 
        { content }
      );
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
};

const LeadComments = () => {
  const { id } = useParams<{ id: string }>();
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get username from localStorage
  const username = localStorage.getItem('username') || 'User';
  
  // Fetch comments for this lead
  const { data: comments = [], isLoading, isError, error } = useQuery({
    queryKey: ['leadComments', id],
    queryFn: () => id ? commentsService.getComments(id) : Promise.resolve([]),
    enabled: !!id
  });
  
  // Use mutation for adding comments
  const mutation = useMutation({
    mutationFn: (content: string) => {
      if (!id) throw new Error("Lead ID is required");
      return commentsService.addComment(id, content);
    },
    onSuccess: () => {
      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ['leadComments', id] });
      
      // Clear the form
      setNewComment("");
      
      toast({
        title: "Comment added",
        description: "Your comment was added successfully.",
      });
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
      
      toast({
        title: "Error adding comment",
        description: "There was a problem adding your comment. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleAddComment = () => {
    if (!newComment.trim() || !id) return;
    mutation.mutate(newComment);
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
          <p className="text-center text-red-500 py-4">
            Error loading comments. Please try again later.
          </p>
          <p className="text-center text-gray-500 text-sm">
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="px-6 pb-2">
        <CardTitle className="text-xl">Comments & Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 mt-1 bg-gray-200">
            <AvatarFallback>{getInitials(username)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment or note..."
              className="resize-none mb-2 border-gray-300 focus:border-blue-400"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={mutation.isPending}
            />
            <Button 
              onClick={handleAddComment} 
              disabled={!newComment.trim() || mutation.isPending}
              className="rounded-full bg-blue-500 hover:bg-blue-600"
            >
              {mutation.isPending ? (
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
            <p className="text-center text-gray-500 py-8">No comments yet</p>
          ) : (
            comments.map((comment: any) => (
              <div key={comment.id} className="flex space-x-4 pb-4 border-b">
                <Avatar className="h-10 w-10 mt-1">
                  <AvatarFallback>{getInitials(comment.user_name || "User")}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{comment.user_name || "User"}</p>
                    <p className="text-xs text-gray-500">
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
