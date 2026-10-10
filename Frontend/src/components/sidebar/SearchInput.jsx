import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchInput = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="relative flex items-center glass-pill rounded-xl px-3 py-2">
        <HiMagnifyingGlass className="text-gray-400 mr-2 text-base shrink-0" />
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
          className="bg-transparent text-xs outline-none w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
    </form>
  );
};

export default SearchInput;