import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  X,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link,
} from "lucide-react";

interface BlogEditorProps {
  onSave: (blog: any) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((c) => c !== categoryToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!content.trim()) {
      alert("Please enter content");
      return;
    }

    onSave({
      title,
      content,
      categories: categories.length > 0 ? categories : ["General"],
      coverImage:
        coverImage ||
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    });
  };

  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleImageUpload = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      document.execCommand("insertImage", false, url);
    }
  };

  const handleLinkInsert = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="mb-6">
            <Label htmlFor="cover-image" className="block mb-2">
              Cover Image URL
            </Label>
            <Input
              id="cover-image"
              placeholder="https://example.com/image.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="mb-2"
            />
            {coverImage && (
              <div className="mt-2 relative h-48 overflow-hidden rounded-md">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="mb-6">
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

          <div className="mb-6">
            <Label htmlFor="categories" className="block mb-2">
              Categories
            </Label>
            <div className="flex items-center">
              <Input
                id="categories"
                placeholder="Add a category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onKeyDown={handleKeyDown}
                className="mr-2"
              />
              <Button
                onClick={handleAddCategory}
                type="button"
                variant="outline"
              >
                Add
              </Button>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {cat}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleRemoveCategory(cat)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="content" className="block mb-2">
              Content
            </Label>
            <div className="border rounded-md overflow-hidden">
              <div className="bg-gray-50 p-2 border-b flex items-center space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("bold")}
                  className="h-8 w-8 p-0"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("italic")}
                  className="h-8 w-8 p-0"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-300 mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("justifyLeft")}
                  className="h-8 w-8 p-0"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("justifyCenter")}
                  className="h-8 w-8 p-0"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("justifyRight")}
                  className="h-8 w-8 p-0"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-300 mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("insertUnorderedList")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => formatText("insertOrderedList")}
                  className="h-8 w-8 p-0"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-gray-300 mx-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleImageUpload}
                  className="h-8 w-8 p-0"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleLinkInsert}
                  className="h-8 w-8 p-0"
                >
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              <div
                ref={editorRef}
                className="min-h-[300px] p-4 focus:outline-none"
                contentEditable
                dangerouslySetInnerHTML={{ __html: content }}
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onSave(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Publish Blog
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditor;
