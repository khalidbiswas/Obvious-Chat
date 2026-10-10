import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";

const Conversations = ({ selectedConversation, onSelectConversation, searchQuery = "" }) => {
  const { loading, conversations } = useGetConversations();

  // Safely ensure conversations is an array before filtering
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  const filteredConversations = safeConversations.filter((conv) => {
    const name = conv.fullname || conv.username || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner text-indigo-400"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-0.5 p-2 custom-scrollbar">
      {filteredConversations.length === 0 ? (
        <div className="text-center text-xs text-gray-400 py-6">
          No conversations found
        </div>
      ) : (
        filteredConversations.map((conv, idx) => (
          <Conversation
            key={conv._id}
            conversation={conv}
            isSelected={selectedConversation?._id === conv._id}
            onSelect={onSelectConversation}
            lastIdx={idx === filteredConversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;