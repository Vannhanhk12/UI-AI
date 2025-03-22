import { useState, useRef, useEffect } from "react";
import { Send, Bot, Sparkles, RotateCcw, Save, Clock, PlusCircle, Users, LogOut } from "lucide-react";
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
import { useTranslation } from "react-i18next";
import io, { Socket } from 'socket.io-client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Điều chỉnh các interface để phù hợp với cấu trúc backend mới
interface User {
  id: string;
  username: string;
}

interface Message {
  id: string;
  content: string;
  userId: string;
  roomId: string;
  user?: User;
  createdAt: Date;
}

interface Room {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  totalUsers?: number;
}

// Tạo instance socket với namespace /chat và xác thực
const createSocket = (token: string): Socket => {
  return io(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/chat`, {
    auth: { token },
    extraHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
};

const AIChatPage = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  
  // Phần UI cho tạo phòng chat mới
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomDescription, setNewRoomDescription] = useState("");

  // Khởi tạo socket khi component được mount
  useEffect(() => {
    // Lấy token từ localStorage hoặc state management của bạn
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    
    // Tạo socket connection với token
    const socketInstance = createSocket(token);
    setSocket(socketInstance);
    
    // Theo dõi kết nối socket
    const onConnect = () => {
      console.log('Socket connected');
      setSocketConnected(true);
      
      // Yêu cầu danh sách phòng chat khi kết nối thành công
      socketInstance.emit('getRooms');
    };

    const onDisconnect = () => {
      console.log('Socket disconnected');
      setSocketConnected(false);
    };

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);
    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });
    
    // Nhận danh sách phòng chat
    socketInstance.on('roomList', (response) => {
      console.log('Received rooms:', response.data);
      setRooms(response.data);
    });
    
    // Xử lý khi tham gia phòng chat thành công
    socketInstance.on('roomJoined', (response) => {
      console.log('Joined room:', response.data);
      setMessages(response.data.messages || []);
      setIsLoading(false);
    });
    
    // Xử lý khi có tin nhắn mới
    socketInstance.on('newMessage', (message) => {
      console.log('Received new message:', message);
      setMessages((prev) => [...prev, message]);
      setIsLoading(false);
    });
    
    // Xử lý khi tạo phòng thành công
    socketInstance.on('roomCreated', (response) => {
      console.log('Room created:', response.data);
      setRooms((prev) => [...prev, response.data]);
      // Tự động join phòng mới tạo
      socketInstance.emit('joinRoom', { roomId: response.data.id });
      setCurrentRoomId(response.data.id);
      setIsCreateRoomOpen(false);
      setNewRoomName("");
      setNewRoomDescription("");
    });
    
    // Xử lý thông báo khi có người dùng mới tham gia
    socketInstance.on('userJoined', (data) => {
      console.log('User joined room:', data);
      // Có thể hiển thị thông báo hoặc cập nhật danh sách user trong phòng
    });
    
    // Xử lý thông báo khi có người dùng rời đi
    socketInstance.on('userLeft', (data) => {
      console.log('User left room:', data);
      // Có thể hiển thị thông báo hoặc cập nhật danh sách user trong phòng
    });

    // Cleanup function khi component unmount
    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.off('connect_error');
      socketInstance.off('roomList');
      socketInstance.off('roomJoined');
      socketInstance.off('newMessage');
      socketInstance.off('roomCreated');
      socketInstance.off('userJoined');
      socketInstance.off('userLeft');
      socketInstance.disconnect();
    };
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || !currentRoomId || !socket) return;

    // Gửi tin nhắn đến server
    socket.emit('sendMessage', { 
      content: input,
      roomId: currentRoomId 
    });
    
    // Xóa nội dung input và bật trạng thái loading
    setInput("");
    setIsLoading(true);
  };

  const createNewRoom = () => {
    if (!newRoomName.trim() || !socket) return;
    
    socket.emit('createRoom', {
      name: newRoomName,
      description: newRoomDescription,
    });
    
    setIsLoading(true);
  };

  const joinRoom = (roomId: string) => {
    if (!socket || currentRoomId === roomId) return;
    
    // Rời phòng hiện tại nếu đang ở trong phòng khác
    if (currentRoomId) {
      socket.emit('leaveRoom', { roomId: currentRoomId });
    }
    
    // Tham gia phòng mới
    setCurrentRoomId(roomId);
    setMessages([]);
    setIsLoading(true);
    socket.emit('joinRoom', { roomId });
  };

  const leaveCurrentRoom = () => {
    if (!socket || !currentRoomId) return;
    
    socket.emit('leaveRoom', { roomId: currentRoomId });
    setCurrentRoomId(null);
    setMessages([]);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date instanceof Date ? date : new Date(date));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 flex flex-col h-full">
        <div className="flex flex-col space-y-4 h-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("aiAssistant")}
              {!socketConnected && (
                <span className="ml-2 text-sm text-red-500 animate-pulse">
                  (Đang kết nối...)
                </span>
              )}
            </h1>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">{t("chat")}</TabsTrigger>
                <TabsTrigger value="rooms">{t("rooms")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden">
            <Card className="md:col-span-1 p-4 flex flex-col overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold dark:text-white">{t("chatRooms")}</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCreateRoomOpen(true)}
                        className="dark:text-gray-300 dark:hover:text-white"
                        disabled={!socketConnected}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("createNewRoom")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {rooms.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      {socketConnected ? 
                        "Không có phòng chat nào. Hãy tạo phòng chat mới!" :
                        "Đang kết nối..."
                      }
                    </div>
                  ) : (
                    rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          currentRoomId === room.id 
                            ? "bg-blue-100 dark:bg-blue-900/50" 
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => joinRoom(room.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate dark:text-white">{room.name}</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(room.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {room.description || "Không có mô tả"}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Users className="h-3 w-3 mr-1" />
                            {room.totalUsers || 0}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
  
            <Tabs value={activeTab} className="md:col-span-3">
              <TabsContent
                value="chat"
                className="flex flex-col space-y-4 mt-0 h-full"
              >
                <Card className="flex-1 p-4 flex flex-col overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
                  {currentRoomId && (
                    <div className="flex items-center justify-between mb-4 pb-2 border-b dark:border-gray-700">
                      <div>
                        <h3 className="font-medium dark:text-white">
                          {rooms.find(r => r.id === currentRoomId)?.name || "Phòng chat"}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {rooms.find(r => r.id === currentRoomId)?.description || "Không có mô tả"}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={leaveCurrentRoom}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        {t("leaveRoom")}
                      </Button>
                    </div>
                  )}
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {!currentRoomId ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-4"
                          >
                            <Users size={48} className="text-blue-500 dark:text-blue-400" />
                          </motion.div>
                          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                            {t("joinChatRoom")}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                            {t("selectRoomDescription")}
                          </p>
                          <Button
                            onClick={() => setIsCreateRoomOpen(true)}
                            className="mt-4"
                            disabled={!socketConnected}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {t("createNewRoom")}
                          </Button>
                        </div>
                      ) : messages.length === 0 && isLoading ? (
                        <div className="flex justify-center items-center h-64">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <RotateCcw className="w-8 h-8 text-blue-500" />
                          </motion.div>
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                          <p className="text-gray-500 dark:text-gray-400">
                            {t("noMessagesYet")}
                          </p>
                        </div>
                      ) : (
                        messages.map((message, index) => {
                          // Lấy thông tin người gửi từ local storage hoặc state management
                          const currentUserId = localStorage.getItem('userId');
                          const isCurrentUser = message.userId === currentUserId;
                          
                          return (
                            <motion.div
                              key={message.id || index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-4 ${
                                  isCurrentUser
                                    ? "bg-blue-500 text-white" 
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                }`}
                              >
                                <div className="flex items-center space-x-2 mb-2">
                                  {!isCurrentUser && (
                                    <Avatar className="h-6 w-6 bg-blue-700">
                                      <span className="text-xs text-white">
                                        {message.user?.username?.charAt(0) || "U"}
                                      </span>
                                    </Avatar>
                                  )}
                                  <span className="text-xs font-medium">
                                    {isCurrentUser ? "Bạn" : message.user?.username || "Người dùng"}
                                  </span>
                                  <span className="text-xs opacity-70">
                                    {message.createdAt ? formatDate(message.createdAt) : ""}
                                  </span>
                                </div>
                                <p>{message.content}</p>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                      {isLoading && currentRoomId && messages.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-[80%]">
                            <div className="flex space-x-1">
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  delay: 0,
                                }}
                                className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  delay: 0.2,
                                }}
                                className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
                              />
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1,
                                  delay: 0.4,
                                }}
                                className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <div className="mt-4 flex items-end space-x-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={currentRoomId ? t("typeMessage") : t("selectRoomFirst")}
                      className="min-h-[60px] dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                      disabled={!currentRoomId || !socketConnected}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="flex-shrink-0"
                      onClick={handleSendMessage} 
                      disabled={!input.trim() || !currentRoomId || isLoading || !socketConnected}
                    >
                      {isLoading ? (
                        <span className="animate-spin mr-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                        </span>
                      ) : (
                        <Send className="h-4 w-4 mr-1" />
                      )}
                      {t("send")}
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="rooms" className="mt-0 h-full">
                <Card className="p-6 h-full overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold dark:text-white">{t("availableChatRooms")}</h2>
                    <Button onClick={() => setIsCreateRoomOpen(true)} disabled={!socketConnected}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      {t("createNewRoom")}
                    </Button>
                  </div>
                  
                  {rooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        {socketConnected ? 
                          "Không có phòng chat nào. Hãy tạo phòng chat mới!" :
                          "Đang kết nối..."
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rooms.map((room) => (
                        <Card 
                          key={room.id} 
                          className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                            currentRoomId === room.id 
                              ? "border-blue-500 dark:border-blue-600" 
                              : ""
                          }`}
                          onClick={() => {
                            joinRoom(room.id);
                            setActiveTab("chat");
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium dark:text-white">
                              {room.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(room.createdAt)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {room.description || "Không có mô tả"}
                          </p>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {room.totalUsers || 0} người tham gia
                            </span>
                            {currentRoomId === room.id && (
                              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">
                                Đang tham gia
                              </span>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Dialog tạo phòng chat mới */}
      <Dialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("createNewChatRoom")}</DialogTitle>
            <DialogDescription>
              {t("createRoomDescription")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">{t("roomName")}</Label>
              <Input
                id="roomName"
                placeholder={t("enterRoomName")}
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomDescription">{t("roomDescription")}</Label>
              <Textarea
                id="roomDescription"
                placeholder={t("enterRoomDescription")}
                value={newRoomDescription}
                onChange={(e) => setNewRoomDescription(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateRoomOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={createNewRoom} disabled={!newRoomName.trim() || isLoading}>
              {isLoading ? (
                <span className="animate-spin mr-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </span>
              ) : null}
              {t("createRoom")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIChatPage;
