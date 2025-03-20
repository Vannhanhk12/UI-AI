import React, { useRef, useEffect } from "react";
import { 
  Bold, Italic, Underline, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, 
  Heading1, Heading2, Heading3,
  Link as LinkIcon, Image as ImageIcon, Code, Quote,
  Undo, Redo
} from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
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
  placeholder = "Write your content here...",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply placeholder styling if needed
    if (editorRef.current) {
      const editor = editorRef.current;
      
      if (!value) {
        editor.classList.add('empty');
      } else {
        editor.classList.remove('empty');
      }
    }
  }, [value]);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    
    if (editorRef.current) {
      // Focus back on the editor
      editorRef.current.focus();
      
      // Get updated content
      const updatedContent = editorRef.current.innerHTML;
      onChange(updatedContent);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    onChange(content);
    
    // Toggle empty class for placeholder
    if (content === '') {
      e.currentTarget.classList.add('empty');
    } else {
      e.currentTarget.classList.remove('empty');
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    // Prevent default to avoid pasting formatted content
    e.preventDefault();
    
    // Get plain text from clipboard
    const text = e.clipboardData.getData('text/plain');
    
    // Insert at cursor position
    document.execCommand('insertText', false, text);
    
    // Update the content
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Insert link
  const insertLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      formatText('createLink', url);
    }
  };

  // Insert image
  const insertImage = () => {
    const url = prompt('Enter the image URL');
    if (url) {
      formatText('insertImage', url);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-gray-50 p-2 border-b flex flex-wrap items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8">
              Heading
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => formatText('formatBlock', 'h1')}>
              <Heading1 className="h-4 w-4 mr-2" />
              <span>Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatText('formatBlock', 'h2')}>
              <Heading2 className="h-4 w-4 mr-2" />
              <span>Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatText('formatBlock', 'h3')}>
              <Heading3 className="h-4 w-4 mr-2" />
              <span>Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => formatText('formatBlock', 'p')}>
              <span>Normal</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('bold')}
          className="h-8 w-8 p-0"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('italic')}
          className="h-8 w-8 p-0"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('underline')}
          className="h-8 w-8 p-0"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('insertUnorderedList')}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('insertOrderedList')}
          className="h-8 w-8 p-0"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('justifyLeft')}
          className="h-8 w-8 p-0"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('justifyCenter')}
          className="h-8 w-8 p-0"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('justifyRight')}
          className="h-8 w-8 p-0"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertLink}
          className="h-8 w-8 p-0"
          title="Insert Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertImage}
          className="h-8 w-8 p-0"
          title="Insert Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('formatBlock', '<pre>')}
          className="h-8 w-8 p-0"
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText('formatBlock', '<blockquote>')}
          className="h-8 w-8 p-0"
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText("undo")}
          className="h-8 w-8 p-0"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => formatText("redo")}
          className="h-8 w-8 p-0"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div 
        ref={editorRef}
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none"
        contentEditable={true}
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value }}
        dir="ltr"
        style={{ 
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'bidi-override'
        }}
      />
    </div>
  );
};

export default RichTextEditor;
