import { HiPlay, HiCog6Tooth, HiPlus } from "react-icons/hi2";

const FloatingDock = () => {
  return (
    <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
      <button className="p-2 rounded-full hover:bg-white/10 transition">
        <HiPlay className="text-sm" />
      </button>
      <button className="p-2 rounded-full hover:bg-white/10 transition">
        <HiCog6Tooth className="text-sm" />
      </button>
      <button className="p-2 rounded-full hover:bg-white/10 transition">
        <HiPlus className="text-sm" />
      </button>
    </div>
  );
};

export default FloatingDock;