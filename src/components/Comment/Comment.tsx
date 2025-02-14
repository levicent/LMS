import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import { useGetUserId } from '@/hooks/useGetUserId';
import { useFetchComments, useAddComment, useDeleteComment } from '@/hooks/useComment';
import { Trash2, Send } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CommentProps {
  courseId: string;
  sectionId: string;
  videoId: string;
}

const Comment: React.FC<CommentProps> = ({ courseId, sectionId, videoId }) => {
  const { data: comments, isLoading, error } = useFetchComments(courseId, sectionId, videoId);
  const { userId } = useGetUserId();
  const [newComment, setNewComment] = useState('');
  const addCommentMutation = useAddComment(courseId, sectionId, videoId);
  const deleteCommentMutation = useDeleteComment(courseId, sectionId, videoId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      addCommentMutation.mutate(newComment);
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId);
  };

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">{error as string}</div>;
  if (!Array.isArray(comments)) {
    return <div className="text-yellow-500 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">Invalid comments data</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h3>
      </div>

      <ScrollArea className="flex-1 h-[400px] mt-4">
        <div className="pr-4 space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet. Be the first to comment!
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {comments.map((comment: any) => (
                <li
                  key={comment._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {(comment.user?.firstName || 'U')?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {comment.user?.firstName || 'Unknown User'}
                        </span>
                      </div>
                      {comment.user?._id === userId && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                          disabled={deleteCommentMutation.isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ScrollArea>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="min-h-[100px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
        <div className="mt-2 flex justify-end">
          <Button
            onClick={handleAddComment}
            disabled={addCommentMutation.isLoading || !newComment.trim()}
            className="flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>{addCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;