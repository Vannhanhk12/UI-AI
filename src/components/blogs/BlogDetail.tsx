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
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogDetailProps {
  blog: any;
  onLike: (blogId: string) => void;
  onAddComment: (blogId: string, comment: string) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({
  blog,
  onLike,
  onAddComment,
}) => {
  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {
    if (comment.trim()) {
      onAddComment(blog.id, comment);
      setComment("");
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
            {blog.categories.map((category: string) => (
              <Badge key={category} className="bg-blue-100 text-blue-800">
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{blog.author.name}</p>
                <p className="text-sm text-gray-500">{blog.author.role}</p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="mr-3">{blog.readTime}</span>
              <span>
                {formatDistanceToNow(new Date(blog.publishedAt), {
                  addSuffix: true,
                })}
              </span>
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
                <Heart className="h-5 w-5 text-red-500" />
                <span>{blog.likes} likes</span>
              </Button>

              <Button variant="ghost" className="flex items-center space-x-1">
                <MessageCircle className="h-5 w-5" />
                <span>{blog.comments.length} comments</span>
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
              Comments ({blog.comments.length})
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
                disabled={!comment.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Post Comment
              </Button>
            </div>

            <div className="space-y-4">
              {blog.comments.map((comment: any) => (
                <div key={comment.id} className="border-b pb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.author.avatar}
                        alt={comment.author.name}
                      />
                      <AvatarFallback>
                        {comment.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium">{comment.author.name}</p>
                        <span className="mx-2 text-gray-400">•</span>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(comment.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      <p className="mt-1">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetail;
