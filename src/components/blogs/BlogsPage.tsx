import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import BlogList from "./BlogList";
import { mockBlogs } from "./mockData";
import BlogEditor from "./BlogEditor";
import BlogDetail from "./BlogDetail";

const BlogsPage = () => {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [blogs, setBlogs] = useState(mockBlogs);

  const handleCreateBlog = (newBlog: any) => {
    const updatedBlogs = [
      {
        id: Date.now().toString(),
        ...newBlog,
        author: {
          name: "Current User",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser",
          role: "Member",
        },
        publishedAt: new Date().toISOString(),
        likes: 0,
        comments: [],
        readTime: "5 min read",
      },
      ...blogs,
    ];

    setBlogs(updatedBlogs);
    setView("list");
  };

  const handleLike = (blogId: string) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog,
      ),
    );
  };

  const handleAddComment = (blogId: string, comment: string) => {
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogId
          ? {
              ...blog,
              comments: [
                ...blog.comments,
                {
                  id: Date.now().toString(),
                  author: {
                    name: "Current User",
                    avatar:
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser",
                  },
                  content: comment,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : blog,
      ),
    );
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleViewBlog = (blog: any) => {
    setSelectedBlog(blog);
    setView("detail");
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
        {view === "list" && (
          <Button
            onClick={() => setView("create")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Blog
          </Button>
        )}
        {view !== "list" && (
          <Button onClick={() => setView("list")} variant="outline">
            Back to Blogs
          </Button>
        )}
      </div>

      {view === "list" && (
        <>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search blogs..."
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Blogs</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <BlogList blogs={filteredBlogs} onViewBlog={handleViewBlog} />
            </TabsContent>

            <TabsContent value="popular">
              <BlogList
                blogs={filteredBlogs.sort((a, b) => b.likes - a.likes)}
                onViewBlog={handleViewBlog}
              />
            </TabsContent>

            <TabsContent value="recent">
              <BlogList
                blogs={filteredBlogs.sort(
                  (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime(),
                )}
                onViewBlog={handleViewBlog}
              />
            </TabsContent>

            <TabsContent value="following">
              <BlogList
                blogs={filteredBlogs.filter((blog) =>
                  ["Alex Johnson", "Maria Garcia"].includes(blog.author.name),
                )}
                onViewBlog={handleViewBlog}
              />
            </TabsContent>
          </Tabs>
        </>
      )}

      {view === "create" && <BlogEditor onSave={handleCreateBlog} />}

      {view === "detail" && selectedBlog && (
        <BlogDetail
          blog={selectedBlog}
          onLike={handleLike}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

export default BlogsPage;
