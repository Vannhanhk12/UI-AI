import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  CheckSquare,
  Type,
  Palette,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [selection, setSelection] = useState<Range | null>(null);
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("transparent");

  // Initialize editor with value
  useEffect(() => {
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  // Save selection when user selects text
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSelection(sel.getRangeAt(0).cloneRange());
    }
  };

  // Restore selection before applying formatting
  const restoreSelection = () => {
    if (selection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(selection);
      }
    }
  };

  const formatText = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    updateContent();
    editorRef.current?.focus();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    updateContent();
  };

  const handleSelectionChange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && sel.toString().length > 0) {
      saveSelection();
      setShowToolbar(true);
    } else if (sel?.toString().length === 0) {
      setShowToolbar(false);
    }
  };

  const handleMouseUp = () => {
    handleSelectionChange();
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    // Don't hide toolbar on arrow keys, shift, ctrl, etc.
    if (
      ![
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Shift",
        "Control",
        "Alt",
        "Meta",
      ].includes(e.key)
    ) {
      handleSelectionChange();
    }
  };

  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      formatText("createLink", url);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter the image URL:");
    if (url) {
      formatText("insertImage", url);
    }
  };

  const insertCheckbox = () => {
    formatText(
      "insertHTML",
      '<div class="checkbox-item"><input type="checkbox" /><span contenteditable="true"> New item</span></div>',
    );
  };

  const applyTextColor = (color: string) => {
    setTextColor(color);
    formatText("foreColor", color);
  };

  const applyBackgroundColor = (color: string) => {
    setBackgroundColor(color);
    formatText("hiliteColor", color);
  };

  const colors = [
    "#000000", // Black
    "#E03131", // Red
    "#2F9E44", // Green
    "#1971C2", // Blue
    "#F08C00", // Orange
    "#6741D9", // Purple
    "#F783AC", // Pink
    "#868E96", // Gray
  ];

  const backgroundColors = [
    "transparent", // None
    "#FFF3BF", // Yellow
    "#D3F9D8", // Green
    "#D0EBFF", // Blue
    "#FFE3E3", // Red
    "#EBD6FF", // Purple
    "#FFF0F6", // Pink
    "#F1F3F5", // Gray
  ];

  return (
    <div className="relative border rounded-lg overflow-hidden bg-white">
      {/* Floating toolbar that appears on text selection */}
      {showToolbar && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 top-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex items-center space-x-1"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("bold")}
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("italic")}
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("underline")}
                >
                  <Underline className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Palette className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Text Color</TooltipContent>
              </Tooltip>
              <DropdownMenuContent className="p-2">
                <div className="grid grid-cols-4 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: color }}
                      onClick={() => applyTextColor(color)}
                    />
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="flex items-center justify-center w-4 h-4 border border-gray-400 bg-yellow-100"></span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Highlight</TooltipContent>
              </Tooltip>
              <DropdownMenuContent className="p-2">
                <div className="grid grid-cols-4 gap-1">
                  {backgroundColors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${color === "transparent" ? "border border-gray-300 bg-white" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => applyBackgroundColor(color)}
                    />
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipProvider>
        </motion.div>
      )}

      {/* Main toolbar */}
      <div className="flex items-center p-2 border-b bg-gray-50 flex-wrap gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-sm font-medium"
            >
              <Type className="h-4 w-4 mr-1" /> Normal
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => formatText("formatBlock", "<h1>")}>
              <Heading1 className="h-4 w-4 mr-2" />
              <span className="text-xl font-bold">Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatText("formatBlock", "<h2>")}>
              <Heading2 className="h-4 w-4 mr-2" />
              <span className="text-lg font-bold">Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatText("formatBlock", "<p>")}>
              <Type className="h-4 w-4 mr-2" />
              <span>Normal</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("insertUnorderedList")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("insertOrderedList")}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Numbered List</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={insertCheckbox}
                >
                  <CheckSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Checkbox</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("justifyLeft")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("justifyCenter")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("justifyRight")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={insertLink}
                >
                  <Link className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Link</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={insertImage}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Image</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("formatBlock", "<blockquote>")}
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Quote</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => formatText("formatBlock", "<pre>")}
                >
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code Block</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <style jsx global>{`
        .apple-notes-editor {
          min-height: 300px;
          padding: 16px;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .apple-notes-editor:empty:before {
          content: attr(data-placeholder);
          color: #aaa;
          pointer-events: none;
        }
        .apple-notes-editor h1 {
          font-size: 1.8em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        .apple-notes-editor h2 {
          font-size: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        .apple-notes-editor p {
          margin-bottom: 1em;
        }
        .apple-notes-editor blockquote {
          border-left: 3px solid #ddd;
          padding-left: 1em;
          margin-left: 0;
          color: #666;
          font-style: italic;
        }
        .apple-notes-editor pre {
          background-color: #f5f5f5;
          padding: 0.5em;
          border-radius: 4px;
          font-family: monospace;
          overflow-x: auto;
        }
        .apple-notes-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }
        .apple-notes-editor a {
          color: #0070f3;
          text-decoration: none;
        }
        .apple-notes-editor a:hover {
          text-decoration: underline;
        }
        .apple-notes-editor ul,
        .apple-notes-editor ol {
          padding-left: 2em;
          margin-bottom: 1em;
        }
        .apple-notes-editor .checkbox-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.5em;
        }
        .apple-notes-editor .checkbox-item input[type="checkbox"] {
          margin-right: 0.5em;
          margin-top: 0.3em;
        }
      `}</style>

      <div
        ref={editorRef}
        className="apple-notes-editor"
        contentEditable
        onInput={handleInput}
        onMouseUp={handleMouseUp}
        onKeyUp={handleKeyUp}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default RichTextEditor;
