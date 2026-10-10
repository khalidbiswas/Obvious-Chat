import { useTheme } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";
import { useConversation } from "../../zustand/useConversation";
import useListenMessages from "../../hooks/useListenMessages";

const Message = ({ message }) => {
  const { theme } = useTheme();
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  useListenMessages(); // live incoming messages

  const isMe = String(message.senderId) === String(authUser?._id);
  const avatar = isMe ? authUser?.profilePicture : selectedConversation?.profilePicture;
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <img
          src={avatar}
          alt="user avatar"
          className="w-7 h-7 rounded-full object-cover"
        />

        {/* Message Bubble */}
        <div
          className={`max-w-xs md:max-w-md px-4 py-2.5 rounded-2xl text-xs backdrop-blur-md transition-all ${isMe
              ? "bg-indigo-600 text-white rounded-br-none shadow-md"
              : theme === "dark"
                ? "bg-white/10 text-white rounded-bl-none border border-white/10"
                : "bg-black/5 text-gray-900 rounded-bl-none border border-black/5"
            }`}
        >
          {message.message}
        </div>
      </div>

      {/* Time Stamp */}
      <span className="text-[9px] text-gray-400 mt-1 px-9">{time}</span>
    </div>
  );
};

export default Message;