"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
const conversations = [
  { id: 1, title: "General Chat" },
  { id: 2, title: "Tech Talk" },
  { id: 3, title: "Random" },
];

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const messagesByConversation: { [key: number]: Message[] } = {
  1: [
    { id: 1, text: "Welcome to the General Chat!", sender: "bot" },
    { id: 2, text: "Feel free to ask anything.", sender: "bot" },
    { id: 3, text: "This is a general chat message.", sender: "user" },
    { id: 4, text: "This is another general chat message.", sender: "bot" },
    { id: 5, text: "This is a general chat message.", sender: "user" },
    { id: 6, text: "This is another general chat message.", sender: "bot" },
    { id: 7, text: "This is a general chat message.", sender: "user" },
    { id: 8, text: "This is another general chat message.", sender: "bot" },
    { id: 9, text: "This is a general chat message.", sender: "user" },
    { id: 10, text: "This is another general chat message.", sender: "bot" },
    { id: 11, text: "This is a general chat message.", sender: "user" },
  ],
  2: [
    { id: 1, text: "Welcome to Tech Talk!", sender: "bot" },
    { id: 2, text: "Discuss all things tech here.", sender: "bot" },
    { id: 3, text: "This is a tech talk message.", sender: "user" },
  ],
  3: [
    { id: 1, text: "Welcome to Random Chat!", sender: "bot" },
    { id: 2, text: "Feel free to talk about anything.", sender: "bot" },
    { id: 3, text: "This is a random chat message.", sender: "user" },
  ],
};

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messages, setMessages] = useState(
    messagesByConversation[selectedChat.id]
  );
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    messagesByConversation[selectedChat.id] = updatedMessages;
    setInput("");
  };

  const handleChatChange = (chat: { id: number; title: string }) => {
    setSelectedChat(chat);
    setMessages(messagesByConversation[chat.id]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-clip">
      {/* Sidebar */}
      <div className="w-1/5 border-r border-gray-700 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Menu size={20} className="cursor-pointer" />
        </div>
        <div className="space-y-2">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 cursor-pointer rounded-lg ${
                selectedChat.id === chat.id
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => handleChatChange(chat)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col p-6 justify-between h-screen bg-gray-700">
        <div>
          <h2 className="text-lg font-semibold mb-4">{selectedChat.title}</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="flex justify-center">
              <div className="flex-1 space-y-8 max-w-3xl">
                {messages.map((msg) => (
                  <Card
                    key={msg.id}
                    className={
                      msg.sender === "user"
                        ? "ml-auto w-1/2 bg-inherit bg-slate-600 text-inherit border rounded-lg"
                        : "w-full bg-inherit text-inherit border-none shadow-none "
                    }
                  >
                    <CardContent className="p-3 shadow-none">
                      {msg.text}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
        {/* Input Field */}
        <div className="flex mt-4 items-center justify-center sticky bottom-0 bg-gray-700 p-4 bg-transparent">
          <div className="relative flex-1 max-w-3xl">
            <Textarea
              className="w-full bg-gray-600 border-none text-white focus:ring-0 px-2 py-4 pr-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600"
              onClick={sendMessage}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
