import { useAuthStore } from "@/store/authStore";
import {
  ChatMessage,
  useGetOrderMessagesQuery,
} from "@/store/redux/api/chatApi";
import { ms } from "better-auth/plugins";
import { XCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getRoleDisplayName } from "../utils/getRoleDisplayName";

interface OrderChatModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

const OrderChatModal = ({ orderId, isOpen, onClose }: OrderChatModalProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  const { data: messages = [] } = useGetOrderMessagesQuery(orderId, {
    skip: !isOpen || !orderId,
    pollingInterval: isOpen ? 3000 : 0,
  });

  const getMessageRole = (msg: ChatMessage) => {
    return msg.userRole || "courier";
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;

    setIsSending(true);

    try {
      const response = await fetch("/api/admin/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          message: message.trim(),
          userName: user?.name,
          userRole: user?.role,
        }),
      });
      if(!response.ok){
        throw new Error(`Failed to send message ${response.status}`)
      };
      setMessage("");
    } catch (error) {
        console.error("Failed to send message", error);
    }finally{
      setIsSending(false);
    }
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-50/50 min-h-screen text-main-text py-10 px-3 ">
        <div className="max-w-150 w-full relative bg-white rounded shadow-auth-form max-h-[calc(100vh-80px)] flex flex-col px-25 pb-15 border border-gray-200">
            <button
          onClick={onClose}
          className=" rounded w-10 h-10 mb-8 absolute top-1 right-1 flex justify-center items-center duration-300 cursor-pointer hover:text-primary"
        >
          <XCircle className="w-6 h-6 " />

        </button>
        <h3 className="text-center text-2xl font-bold px-4 mt-18 mb-8">
          Comments
        </h3>
        <div className="flex-1 overflow-y-auto space-y-8 w-full mx-auto">
            {messages.map((msg)=>{
                const role = getMessageRole(msg);
                const roleDisplayName = getRoleDisplayName(role);
                return(
                    <div key={msg._id} className="flex flex-col">
                        <div className="flex items-baseline gap-2 mb-1 flex-wrap text-gray-400">
                            <div>{msg.userName}</div>
                            <div>{roleDisplayName}</div>
                            <div>
                                {new Date(msg.timestamp).toLocaleTimeString([],{
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}{' '}
                                {new Date(msg.timestamp).toLocaleDateString([],{
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded px-2 py-1">
                                {msg.message}
                        </div>
                    </div>
                )
            })}
            <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="w-full mx-auto">
            <div className="flex flex-col gap-8"> 
                 <textarea 
                 value={message}
                 onChange={(e)=>setMessage(e.target.value)}
                 placeholder="Message..."
                 disabled={isSending}
                 className="flex-1 border border-[#bfbfbf] rounded px-2 py-1 h-25.5 focus:outline-none focus:border-primary focus:shadow-button-default caret-primary resize-none"
                 rows={4}
                 />
                <button
                type="submit"
                disabled={!message.trim() || isSending}
                className="bg-primary/50 text-primary text-2xl px-4 py-2 h-17 rounded hover:bg-primary hover:text-white disabled:cursor-not-allowed cursor-pointer duration-300"
                >
                    {isSending ? "Sending..." : "Send"}
                </button>
            </div>
        </form>
        </div>
    </div>
  )
};

export default OrderChatModal;
