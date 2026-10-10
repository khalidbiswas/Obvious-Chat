// src/components/sidebar/Conversation.jsx
import { useConversation } from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;

  // Handle image and display name fallbacks safely
  const avatarUrl =
    conversation.profilePicture ||
    conversation.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${conversation.username}`;

  const displayName = conversation.fullname || conversation.fullName || conversation.username;

  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)} //  Ensure this sets state
        className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-200 ${
          isSelected ? "bg-black/10 dark:bg-white/15 shadow-sm" : "hover:bg-black/5 dark:hover:bg-white/5"
        }`}
      >
        <div className="relative shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold truncate text-gray-900 dark:text-white">
            {displayName}
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
            @{conversation.username}
          </p>
        </div>
      </div>

      {!lastIdx && <div className="h-px h-px bg-black/5 dark:bg-white/5 my-1 mx-2" />}
    </>
  );
};

export default Conversation;