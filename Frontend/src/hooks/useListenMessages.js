import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useConversation } from "../zustand/useConversation";

// Adds messages that arrive over the socket to the chat that is currently open.
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const openChatId = useConversation((state) => state.selectedConversation?._id);

  useEffect(() => {
    if (!socket) return;

    const onNewMessage = (newMessage) => {
      // Sent by someone whose chat isn't open: it will load from the DB when you open it
      if (String(newMessage.senderId) !== String(openChatId)) return;

      // Read the latest list from the store (never a stale copy) and avoid duplicates
      const { messages, setMessages } = useConversation.getState();
      if (messages.some((m) => m._id === newMessage._id)) return;
      setMessages([...messages, newMessage]);
    };

    socket.on("newMessage", onNewMessage);
    return () => socket.off("newMessage", onNewMessage);
  }, [socket, openChatId]);
};

export default useListenMessages;