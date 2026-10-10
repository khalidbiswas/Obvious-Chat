import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import AmbientBackground from "../../components/AmbientBackground";
import { useTheme } from "../../context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi2";

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-[#121214] text-white" : "bg-[#f4f4f6] text-gray-900"
      }`}
    >
      <AmbientBackground />

      <div className="relative z-10 w-full max-w-6xl h-[85vh] min-h-125 glass-card rounded-4xl flex overflow-hidden shadow-2xl border border-white/10">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          className="absolute top-3 right-3 z-20 glass-pill p-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {theme === "dark" ? (
            <HiSun className="text-xl text-yellow-400" />
          ) : (
            <HiMoon className="text-xl text-indigo-600" />
          )}
        </button>

        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;