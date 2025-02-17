"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Menu, PanelLeftClose, PanelRightClose } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
    {
      id: 3,
      text: "Welcome to the General Chat! This is a place where you can discuss anything and everything. Feel free to share your thoughts, ask questions, and engage with other members of the community. We encourage open and respectful conversations. Whether you want to talk about the latest news, share a personal story, or just say hello, this is the place to do it. We hope you enjoy your time here and make some new friends along the way. Remember to be kind and considerate to others. Happy chatting!",
      sender: "bot",
    },
    {
      id: 2,
      text: "Feel free to ask anything. Our community is here to help you with any questions you might have. Whether it's about technology, hobbies, or life in general, there's always someone who can provide an answer or point you in the right direction. Don't be shy, we're all here to learn and grow together. If you have any suggestions or feedback, please let us know. We're always looking to improve and make this space better for everyone. Thank you for being a part of our community!",
      sender: "bot",
    },
    {
      id: 1,
      text: "This is a general chat message.By the User This is a general chat message.By the User",
      sender: "user",
    },
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
    {
      id: 1,
      text: "Welcome to Tech Talk! This is the place to discuss all things technology. Whether you're a seasoned professional or just starting out, you'll find a wealth of knowledge and resources here. Share your insights, ask questions, and engage in meaningful discussions about the latest trends, tools, and technologies. From programming languages and frameworks to hardware and software, there's something for everyone. We encourage you to share your projects, seek feedback, and collaborate with others. Let's learn and grow together in this ever-evolving field. Happy tech talking!",
      sender: "bot",
    },
    {
      id: 2,
      text: "Discuss all things tech here. Our community is passionate about technology and always eager to help. Whether you're looking for advice on a specific problem, want to share your latest project, or just want to chat about the latest tech news, this is the place to be. We value respectful and constructive discussions, so please be considerate of others. If you have any questions or need assistance, don't hesitate to ask. We're all here to support each other and make the most of our tech journeys. Enjoy your time here!",
      sender: "bot",
    },
    { id: 3, text: "This is a tech talk message.", sender: "user" },
  ],
  3: [
    {
      id: 1,
      text: "Welcome to Random Chat! This is a space for all the off-topic conversations that don't fit into the other categories. Feel free to talk about anything and everything here. Whether you want to share a funny story, discuss your favorite hobbies, or just have a casual chat, this is the place to do it. We encourage you to be yourself and have fun. Remember to be respectful and considerate of others. Let's keep this space positive and enjoyable for everyone. Happy chatting!",
      sender: "bot",
    },
    {
      id: 2,
      text: "Feel free to talk about anything. Our community is diverse and full of interesting people with unique perspectives. Whether you're looking to make new friends, share your thoughts, or just pass the time, you'll find plenty of engaging conversations here. We value open and respectful dialogue, so please be kind and considerate to others. If you have any suggestions or feedback, we'd love to hear from you. Thank you for being a part of our community and making it a great place to be!",
      sender: "bot",
    },
    { id: 3, text: "This is a random chat message.", sender: "user" },
  ],
};

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messages, setMessages] = useState(
    messagesByConversation[selectedChat.id]
  );
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("isSidebarOpen");
      if (savedState === null) {
        localStorage.setItem("isSidebarOpen", "false");
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(savedState === "true");
      }
    }
  }, []);

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
    // setIsSidebarOpen(false); // Close sidebar on mobile when a chat is selected
  };

  return (
    <div className="flex h-screen bg-background justify-start text-foreground font-sans overflow-clip p-0">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 bg-sidebar border-r border-sidebar-border p-4 flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          {
            "translate-x-0": isSidebarOpen,
            "-translate-x-full": !isSidebarOpen,
          },
          {
            "md:w-1/6 md:z-0 z-20 w-1/2 md:min-w-64": isSidebarOpen,
            hidden: !isSidebarOpen,
          }
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chats</h2>
          <PanelLeftClose
            className={cn("cursor-pointer w-6 h-6", {
              hidden: !isSidebarOpen,
            })}
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <div className="space-y-2">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={cn("p-3 cursor-pointer rounded-lg", {
                "bg-secondary": selectedChat.id === chat.id,
                "hover:bg-muted": selectedChat.id !== chat.id,
              })}
              onClick={() => handleChatChange(chat)}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col justify-between h-screen bg-card md:p-6 py-2 px-1">
        <div className="flex flex-col space-y-4">
          <div className="flex  items-center align-middle gap-2">
            <PanelRightClose
              className={cn("cursor-pointer w-6 h-6", {
                hidden: isSidebarOpen,
              })}
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="flex justify-center">
              <div className="flex-1 space-y-8 max-w-3xl">
                {messages
                  .sort((a, b) => a.id - b.id)
                  .map((msg) => (
                    <Card
                      key={msg.id}
                      className={cn("shadow-none", {
                        "ml-auto max-w-[50%] w-fit bg-secondary text-inherit border rounded-lg":
                          msg.sender === "user",
                        "w-full bg-inherit text-inherit border-none shadow-none":
                          msg.sender !== "user",
                      })}
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
        <div className="flex mt-4 items-center justify-center sticky bottom-0 p-4 bg-card">
          <div className="relative flex-1 flex justify-center max-w-3xl">
            <Textarea
              className="w-full bg-muted border-none text-foreground focus:ring-0 px-4 py-4 pr-10 rounded-xl"
              value={input}
              rows={4}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button
              className="absolute right-2 bottom-2 bg-primary text-primary-foreground hover:bg-primary/60"
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
