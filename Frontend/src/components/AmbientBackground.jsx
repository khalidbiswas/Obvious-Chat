import { useTheme } from "../context/ThemeContext";

const AmbientBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Glow Blob 1 (Top-Left) */}
      <div
        className={`absolute -top-20 left-10 w-80 h-80 rounded-full transition-all duration-500 ${
          theme === "dark" ? "bg-purple-600/30" : "bg-purple-400/50"
        }`}
        style={{ filter: "blur(100px)" }}
      />

      {/* Glow Blob 2 (Bottom-Right) */}
      <div
        className={`absolute -bottom-20 right-10 w-96 h-96 rounded-full transition-all duration-500 ${
          theme === "dark" ? "bg-blue-600/20" : "bg-blue-300/60"
        }`}
        style={{ filter: "blur(100px)" }}
      />
    </div>
  );
};

export default AmbientBackground;