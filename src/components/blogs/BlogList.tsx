import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, MessageCircle, Clock, Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Blog } from "../../types/blog";
import { motion } from "framer-motion";

interface BlogListProps {
  blogs: Blog[];
  onViewBlog: (blog: Blog) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onViewBlog }) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          No blogs found. Create your first blog!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white h-full flex flex-col"
            onClick={() => onViewBlog(blog)}
          >
            {blog.coverImage && (
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            <CardContent className="pt-6 flex-grow">
              <div className="flex items-center space-x-2 mb-3">
                {blog.categories && blog.categories.length > 0 ? (
                  blog.categories.map((category: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      {category}
                    </Badge>
                  ))
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    Uncategorized
                  </Badge>
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 line-clamp-2">
                {blog.title}
              </h3>

              <div
                className="text-gray-600 mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html:
                    blog.excerpt || blog.content.substring(0, 150) + "...",
                }}
              />

              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="h-8 w-8">
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
                  <p className="text-sm font-medium">{blog.author.username}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(blog.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4 flex justify-between text-gray-500 text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  <span>{blog.upvotes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span>{blog.commentCount}</span>
                </div>
              </div>

              <div className="flex items-center">
                {blog.readTime ? (
                  <>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{blog.readTime}</span>
                  </>
                ) : (
                  <>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogList;
