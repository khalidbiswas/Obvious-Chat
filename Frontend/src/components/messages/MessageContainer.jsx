import { useEffect } from "react";
import { useConversation } from "../../zustand/useConversation";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected"; 

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
console.log("Current selected conversation:", selectedConversation);
  // Reset selected conversation on unmount
  useEffect(() => {
    // Cleanup function to reset selected conversation when the component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  if (!selectedConversation) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-500/20 px-4 py-3 mb-2 flex items-center gap-3">
        <span className="text-gray-500 dark:text-gray-400 text-xs">To:</span>{" "}
        <span className="text-gray-900 dark:text-white font-semibold text-sm">
          {selectedConversation.fullname || selectedConversation.username}
        </span>
      </div>

      {/* Messages Feed */}
      <Messages />
      {/* Input Field */}
      <MessageInput />
    </div>
  );
};

export default MessageContainer;