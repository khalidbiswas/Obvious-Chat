import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiSun, HiMoon } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import AmbientBackground from "../../components/AmbientBackground";
import useLogin from "../../hooks/useLogin"; // 1. Import the useLogin hook

const Login = () => {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // 2. Destructure login function and loading state from hook
  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 3. Call real login function from hook
    await login(formData.username, formData.password);
  };

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 flex flex-col items-center justify-center p-4 overflow-hidden ${
        theme === "dark" ? "bg-[#121214] text-white" : "bg-[#f4f4f6] text-gray-900"
      }`}
    >
      {/* 1. Ambient Background Globs */}
      <AmbientBackground />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        type="button"
        className="absolute top-6 right-6 z-20 glass-pill p-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      >
        {theme === "dark" ? (
          <HiSun className="text-xl text-yellow-400" />
        ) : (
          <HiMoon className="text-xl text-indigo-600" />
        )}
      </button>

      {/* 2. Main Glass Card Container */}
      <div className="relative z-10 w-full max-w-md glass-card rounded-[36px] p-8 shadow-2xl">
        {/* Header Pill */}
        <div className="flex flex-col items-center mb-8">
          <div className="glass-pill px-4 py-1.5 rounded-full text-xs font-medium mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Obvious Chat • v1.0
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Sign in to start messaging
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              className={`block text-xs font-medium mb-1.5 pl-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Username
            </label>
            <div className="relative flex items-center glass-input rounded-2xl">
              <HiEnvelope
                className={`absolute left-4 text-lg pointer-events-none ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                required
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-transparent py-3 pl-11 pr-4 text-sm outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className={`block text-xs font-medium mb-1.5 pl-2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Password
            </label>
            <div className="relative flex items-center glass-input rounded-2xl">
              <HiLockClosed
                className={`absolute left-4 text-lg pointer-events-none ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent py-3 pl-11 pr-11 text-sm outline-none placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 transition ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {showPassword ? <HiEyeSlash className="text-lg" /> : <HiEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 font-semibold py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-lg active:scale-[0.98] disabled:opacity-50 cursor-pointer ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div
          className={`text-center mt-6 text-xs ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className={`font-medium hover:underline ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;