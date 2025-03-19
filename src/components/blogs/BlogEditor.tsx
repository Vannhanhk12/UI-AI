import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Eye, Save, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import FileUpload from "./FileUpload";
import RichTextEditor from "./RichTextEditor";
import CategorySelector from "./CategorySelector";
import { CreateBlogDto } from "../../types/blog";
import { createBlog } from "../../services/api";

interface BlogEditorProps {
  onSave: (blog: any) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  const handleCoverImageUpload = (url: string) => {
    setCoverImage(url);
  };

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const textLength = text.split(" ").length;
    if (textLength > 0) {
      const value = Math.ceil(textLength / wordsPerMinute);
      setReadTime(`${value} min read`);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    calculateReadTime(newContent.replace(/<[^>]*>/g, " "));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter content");
      return;
    }

    setIsSubmitting(true);

    try {
      const blogData: CreateBlogDto = {
        title,
        content,
        excerpt:
          excerpt || content.replace(/<[^>]*>/g, " ").substring(0, 150) + "...",
        coverImage,
        readTime,
        categoryIds: categoryIds.length > 0 ? categoryIds : undefined,
        isHidden,
      };

      const response = await createBlog(blogData);
      toast.success("Blog published successfully!");
      onSave(response);
    } catch (error) {
      console.error("Error creating blog:", error);
      // Error is already handled in the API service
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsHidden(!isHidden)}
            className="gap-1"
          >
            <Eye className="h-4 w-4" />
            {isHidden ? "Private" : "Public"}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 gap-1"
          >
            {isSubmitting ? (
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Publish
          </Button>
        </div>
      </div>

      <Card className="bg-white">
        <CardContent className="pt-6">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="edit" className="mt-0 space-y-6">
              <div>
                <Label htmlFor="cover-image" className="block mb-2">
                  Cover Image
                </Label>
                <FileUpload
                  onFileUpload={handleCoverImageUpload}
                  currentImage={coverImage}
                />
              </div>

              <div>
                <Label htmlFor="title" className="block mb-2">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter your blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-bold"
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="block mb-2">
                  Excerpt (optional)
                </Label>
                <Input
                  id="excerpt"
                  placeholder="Brief summary of your blog"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  If left empty, an excerpt will be generated from your content
                </p>
              </div>

              <div>
                <Label htmlFor="categories" className="block mb-2">
                  Categories
                </Label>
                <CategorySelector
                  selectedCategories={categoryIds}
                  onCategoriesChange={setCategoryIds}
                />
              </div>

              <div>
                <Label htmlFor="content" className="block mb-2">
                  Content
                </Label>
                <RichTextEditor
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Write your blog content here..."
                />
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-0">
              <div className="prose prose-lg max-w-none">
                {coverImage && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}
                <h1 className="text-3xl font-bold mb-4">
                  {title || "Untitled Blog"}
                </h1>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>{readTime}</span>
                </div>
                {content ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  <p className="text-gray-400 italic">No content yet...</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditor;
