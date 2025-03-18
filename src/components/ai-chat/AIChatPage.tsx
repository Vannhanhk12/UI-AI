import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, RotateCcw, Save, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

// Mock data for chat histories
const initialChatHistories: ChatHistory[] = [
  {
    id: "1",
    title: "Productivity Analysis",
    messages: [
      {
        id: "1-1",
        content: "How can I improve my task completion rate?",
        role: "user",
        timestamp: new Date("2023-06-15T10:30:00"),
      },
      {
        id: "1-2",
        content:
          "Based on your task history, I notice you complete more tasks in the morning. Consider scheduling your most important tasks before noon to leverage your peak productivity hours.",
        role: "assistant",
        timestamp: new Date("2023-06-15T10:31:00"),
      },
    ],
    createdAt: new Date("2023-06-15T10:30:00"),
  },
  {
    id: "2",
    title: "Goal Setting Strategy",
    messages: [
      {
        id: "2-1",
        content: "I need help setting realistic goals for this month",
        role: "user",
        timestamp: new Date("2023-06-20T14:15:00"),
      },
      {
        id: "2-2",
        content:
          "Looking at your past achievements, I recommend setting 3-5 specific goals with clear metrics. Your completion rate is highest with well-defined objectives that have a 2-3 week timeframe.",
        role: "assistant",
        timestamp: new Date("2023-06-20T14:16:00"),
      },
    ],
    createdAt: new Date("2023-06-20T14:15:00"),
  },
];

const AIChatPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistories, setChatHistories] =
    useState<ChatHistory[]>(initialChatHistories);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load selected chat history
  useEffect(() => {
    if (currentChatId) {
      const selectedChat = chatHistories.find(
        (chat) => chat.id === currentChatId,
      );
      if (selectedChat) {
        setMessages(selectedChat.messages);
      }
    }
  }, [currentChatId, chatHistories]);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Create new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    // Update messages with user message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API call to OpenAI
    setTimeout(() => {
      // Create assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input),
        role: "assistant",
        timestamp: new Date(),
      };

      // Update messages with assistant response
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);

      // Update or create chat history
      if (currentChatId) {
        // Update existing chat
        setChatHistories((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, userMessage, assistantMessage],
                }
              : chat,
          ),
        );
      } else {
        // Create new chat
        const newChatId = Date.now().toString();
        const newChat: ChatHistory = {
          id: newChatId,
          title: input.slice(0, 30) + (input.length > 30 ? "..." : ""),
          messages: [userMessage, assistantMessage],
          createdAt: new Date(),
        };
        setChatHistories((prev) => [...prev, newChat]);
        setCurrentChatId(newChatId);
      }
    }, 1500);
  };

  // Simple mock response generator
  const generateResponse = (query: string): string => {
    const responses = [
      `Based on your task history, I recommend focusing on ${query.includes("productivity") ? "time-blocking techniques" : "setting smaller, achievable milestones"}. This approach has shown a 27% improvement in your completion rate.`,
      `Analyzing your past ${query.includes("goal") ? "goals" : "tasks"}, I notice you're most effective when working in 45-minute focused sessions followed by short breaks. Try implementing this pattern for your upcoming work.`,
      `Your data shows that you excel at ${query.includes("project") ? "project planning" : "execution"} but may need more structure in ${query.includes("project") ? "follow-through" : "initial planning"}. I suggest creating a template that emphasizes your weaker area.`,
      `Looking at your completed tasks, you've made significant progress in ${query.toLowerCase().includes("improve") ? "consistency" : "quality"}. To further improve, consider implementing a daily review ritual to identify patterns.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const selectChatHistory = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50">
      <div className="container mx-auto p-4 flex flex-col h-full">
        <div className="flex flex-col space-y-4 h-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden">
            <Card className="md:col-span-1 p-4 flex flex-col overflow-hidden bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Conversations</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={startNewChat}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New Chat</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {chatHistories.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${currentChatId === chat.id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                      onClick={() => selectChatHistory(chat.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{chat.title}</h3>
                        <span className="text-xs text-gray-500">
                          {formatDate(chat.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {chat.messages[
                          chat.messages.length - 1
                        ]?.content.substring(0, 40)}
                        ...
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            <Tabs value={activeTab} className="md:col-span-3">
              <TabsContent
                value="chat"
                className="flex flex-col space-y-4 mt-0 h-full"
              >
                <Card className="flex-1 p-4 flex flex-col overflow-hidden bg-white">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                          >
                            <Bot size={48} className="text-blue-500" />
                          </motion.div>
                          <h3 className="text-xl font-medium text-gray-700">
                            How can I help you today?
                          </h3>
                          <p className="text-gray-500 mt-2 max-w-md">
                            I can analyze your tasks, suggest productivity
                            improvements, and help you develop effective
                            strategies.
                          </p>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-4 ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                            >
                              <div className="flex items-center space-x-2 mb-2">
                                {message.role === "assistant" && (
                                  <Avatar className="h-6 w-6 bg-blue-700">
                                    <Bot size={14} className="text-white" />
                                  </Avatar>
                                )}
                                <span className="text-xs opacity-70">
                                  {formatDate(message.timestamp)}
                                </span>
                              </div>
                              <p>{message.content}</p>
                            </div>
                          </motion.div>
                        ))
                      )}
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6 bg-blue-700">
                                <Bot size={14} className="text-white" />
                              </Avatar>
                              <div className="flex space-x-1">
                                <motion.div
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: 0,
                                  }}
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                />
                                <motion.div
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: 0.2,
                                  }}
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                />
                                <motion.div
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: 0.4,
                                  }}
                                  className="w-2 h-2 bg-blue-500 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="mt-4 flex items-end space-x-2">
                    <Textarea
                      placeholder="Ask about your productivity, task patterns, or strategies..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1 min-h-[80px] resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      className="h-10 w-10"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="md:col-span-3 mt-0">
                <Card className="p-6 bg-white">
                  <h2 className="text-xl font-semibold mb-4">Chat Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-700">
                        Total Conversations
                      </h3>
                      <p className="text-2xl font-bold">
                        {chatHistories.length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-green-700">
                        Most Active Day
                      </h3>
                      <p className="text-2xl font-bold">Tuesday</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-purple-700">
                        Common Topics
                      </h3>
                      <p className="text-lg font-medium">Productivity, Goals</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3">
                    Recent Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Task Completion Pattern</h4>
                        <span className="text-xs text-gray-500">
                          Generated yesterday
                        </span>
                      </div>
                      <p className="text-gray-700">
                        You complete 37% more tasks when you start before 10 AM.
                        Consider scheduling important work earlier in the day.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Focus Time Analysis</h4>
                        <span className="text-xs text-gray-500">
                          Generated 3 days ago
                        </span>
                      </div>
                      <p className="text-gray-700">
                        Your average focus session lasts 32 minutes. Research
                        suggests 52-minute work periods followed by 17-minute
                        breaks for optimal productivity.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;
