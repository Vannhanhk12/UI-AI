import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { PlusCircle, Search, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Pagination } from "../ui/pagination";
import BlogList from "./BlogList";
import BlogEditor from "./BlogEditor";
import BlogDetail from "./BlogDetail";
import { fetchBlogs, likeBlog, addComment } from "../../services/api";
import { Blog, BlogsResponse } from "../../types/blog";

const BlogsPage = () => {
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadBlogs();
  }, [pagination.page]);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      const response: BlogsResponse = await fetchBlogs(
        pagination.page,
        pagination.limit,
      );
      setBlogs(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBlog = (newBlog: any) => {
    loadBlogs(); // Reload blogs to include the new one
    setView("list");
  };

  const handleLike = async (blogId: string) => {
    try {
      await likeBlog(blogId);
      // Update the blog in the list
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogId ? { ...blog, upvotes: blog.upvotes + 1 } : blog,
        ),
      );

      // Also update the selected blog if it's the one being liked
      if (selectedBlog && selectedBlog.id === blogId) {
        setSelectedBlog({
          ...selectedBlog,
          upvotes: selectedBlog.upvotes + 1,
        });
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleAddComment = async (blogId: string, comment: string) => {
    try {
      const response = await addComment(blogId, comment);

      // Update the selected blog with the new comment
      if (selectedBlog && selectedBlog.id === blogId) {
        setSelectedBlog({
          ...selectedBlog,
          comments: [response, ...selectedBlog.comments],
          commentCount: selectedBlog.commentCount + 1,
        });
      }

      // Update the blog in the list
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                commentCount: blog.commentCount + 1,
              }
            : blog,
        ),
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.content &&
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setView("detail");
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
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
            </TabsList>

            <TabsContent value="all">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <>
                  <BlogList blogs={filteredBlogs} onViewBlog={handleViewBlog} />
                  {pagination.totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="popular">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <>
                  <BlogList
                    blogs={[...filteredBlogs].sort(
                      (a, b) => b.upvotes - a.upvotes,
                    )}
                    onViewBlog={handleViewBlog}
                  />
                  {pagination.totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="recent">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <>
                  <BlogList
                    blogs={[...filteredBlogs].sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )}
                    onViewBlog={handleViewBlog}
                  />
                  {pagination.totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}

      {view === "create" && (
        <BlogEditor
          onSave={handleCreateBlog}
          onCancel={() => setView("list")}
        />
      )}

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
