import { useEffect, useRef } from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useGetMessages from "../../hooks/useGetMessages";
import { useConversation } from "../../zustand/useConversation";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef(null);

  // Auto scroll to bottom when new messages load or change
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {/* 1. Loading State */}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {/* 2. Empty Conversation State */}
      {!loading && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-sm text-gray-400">
            Send a message to start the conversation with{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {selectedConversation?.fullname || selectedConversation?.username}
            </span>
          </p>
        </div>
      )}

      {/* 3. Messages List */}
      {!loading &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id || index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))}
    </div>
  );
};

export default Messages;