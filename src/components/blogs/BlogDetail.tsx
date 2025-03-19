import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus,
  Clock,
  Calendar,
  ThumbsUp,
  Send,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Blog, Comment } from "../../types/blog";
import { motion, AnimatePresence } from "framer-motion";

interface BlogDetailProps {
  blog: Blog;
  onLike: (blogId: string) => void;
  onAddComment: (blogId: string, comment: string) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({
  blog,
  onLike,
  onAddComment,
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async () => {
    if (comment.trim()) {
      setIsSubmitting(true);
      try {
        await onAddComment(blog.id, comment);
        setComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white overflow-hidden">
        {blog.coverImage && (
          <div className="h-64 md:h-96 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <CardContent className="pt-8 pb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.categories && blog.categories.length > 0 ? (
              blog.categories.map((category: string, idx: number) => (
                <Badge key={idx} className="bg-blue-100 text-blue-800">
                  {category}
                </Badge>
              ))
            ) : (
              <Badge className="bg-gray-100 text-gray-800">Uncategorized</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src={
                    blog.author.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author.username}`
                  }
                  alt={blog.author.username}
                />
                <AvatarFallback>
                  {blog.author.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author.username}</p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              {blog.readTime ? (
                <>
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="mr-3">{blog.readTime}</span>
                </>
              ) : null}
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="flex items-center justify-between border-t border-b py-4 my-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="flex items-center space-x-1"
                onClick={() => onLike(blog.id)}
              >
                <ThumbsUp className="h-5 w-5 text-blue-500" />
                <span>{blog.upvotes} likes</span>
              </Button>

              <Button variant="ghost" className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
                <span>{blog.commentCount} comments</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-5 w-5 mr-1" />
                Share
              </Button>

              <Button variant="ghost" size="sm">
                <BookmarkPlus className="h-5 w-5 mr-1" />
                Save
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">
              Comments ({blog.commentCount})
            </h3>

            <div className="mb-6">
              <Textarea
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-2"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!comment.trim() || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <motion.div
                    className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Post Comment
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {blog.comments &&
                  blog.comments.map((comment: Comment, index: number) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b pb-4"
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              comment.author.avatar ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author.username}`
                            }
                            alt={comment.author.username}
                          />
                          <AvatarFallback>
                            {comment.author.username.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">
                              {comment.author.username}
                            </p>
                            <span className="mx-2 text-gray-400">•</span>
                            <p className="text-sm text-gray-500">
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                {
                                  addSuffix: true,
                                },
                              )}
                            </p>
                          </div>
                          <p className="mt-1">{comment.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetail;
