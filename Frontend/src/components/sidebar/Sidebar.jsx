import { useState } from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import { useTheme } from "../../context/ThemeContext";

const Sidebar = ({ selectedConversation, onSelectConversation }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`w-full md:w-80 border-r flex flex-col h-full shrink-0 ${
        theme === "dark"
          ? "border-white/10 bg-black/20"
          : "border-black/5 bg-white/20"
      }`}
    >
      {/* Header / Brand Badge */}
      <div className="p-3.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xs shadow-inner">
            OC
          </div>
          <div>
            <h2 className="text-xs font-bold tracking-wide">Obvious Chat</h2>
            <p className="text-[10px] text-gray-400">Messages</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchInput onSearch={(q) => setSearchQuery(q)} />

      {/* Divider */}
      <div className="h-pxbg-black/10 dark:bg-white/10 mx-3 my-0" />

      {/* Conversation List */}
      <Conversations
        selectedConversation={selectedConversation}
        onSelectConversation={onSelectConversation}
        searchQuery={searchQuery}
      />

      {/* Footer / Logout */}
      <LogoutButton />
    </div>
  );
};

export default Sidebar;