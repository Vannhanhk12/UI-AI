import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  selectedCategories: string[];
  onCategoriesChange: (categoryIds: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategoriesChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`,
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback to some default categories
        setCategories([
          { id: "1", name: "Technology" },
          { id: "2", name: "Health" },
          { id: "3", name: "Travel" },
          { id: "4", name: "Food" },
          { id: "5", name: "Lifestyle" },
          { id: "6", name: "Business" },
          { id: "7", name: "Science" },
          { id: "8", name: "Education" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleToggleCategory = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    onCategoriesChange(updatedCategories);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-pulse flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-2">
          <AnimatePresence>
            {filteredCategories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer flex items-center gap-1 px-3 py-1 ${isSelected ? "bg-blue-600" : "hover:bg-blue-50"}`}
                    onClick={() => handleToggleCategory(category.id)}
                  >
                    {isSelected ? (
                      <X className="h-3 w-3" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                    {category.name}
                  </Badge>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {selectedCategories.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Selected Categories:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return (
                <Badge
                  key={categoryId}
                  className="bg-blue-100 text-blue-800 flex items-center gap-1"
                >
                  {category?.name || "Unknown"}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleToggleCategory(categoryId)}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
