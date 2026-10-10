import { useState } from "react";
import { Link } from "react-router-dom";
import { HiEnvelope, HiLockClosed, HiUser, HiCalendar, HiAtSymbol, HiEye, HiEyeSlash, HiSun, HiMoon } from "react-icons/hi2";
import { useTheme } from "../../context/ThemeContext";
import useSignup from "../../hooks/useSignup"; // 1. Import the hook
import AmbientBackground from "../../components/AmbientBackground";

const SignUp = () => {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    birthDate: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, signup } = useSignup(); // 2. Destructure loading and signup function

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler connected to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData); // 3. Call the hook function
  };

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-300 flex flex-col items-center justify-center p-4 my-8 overflow-hidden ${theme === "dark" ? "bg-[#121214] text-white" : "bg-[#f4f4f6] text-gray-900"
      }`}>

      {/* Background Glowing Blobs */}
      <AmbientBackground />

      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-20 glass-pill p-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
      >
        {theme === "dark" ? (
          <HiSun className="text-xl text-yellow-400" />
        ) : (
          <HiMoon className="text-xl text-indigo-600" />
        )}
      </button>

      {/* Main Glassmorphic Card */}
      <div className="relative z-10 w-full max-w-lg glass-card rounded-[36px] p-8 shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="glass-pill px-4 py-1.5 rounded-full text-xs font-medium mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
              Obvious Chat • v1.0
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
          <p className={`text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Fill in your details to register
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">

          {/* Full Name & Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Full Name
              </label>
              <div className="relative flex items-center glass-input rounded-2xl">
                <HiUser className={`absolute left-3.5 text-lg pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  name="fullname"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Username
              </label>
              <div className="relative flex items-center glass-input rounded-2xl">
                <HiAtSymbol className={`absolute left-3.5 text-lg pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Email Address
            </label>
            <div className="relative flex items-center glass-input rounded-2xl">
              <HiEnvelope className={`absolute left-3.5 text-lg pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* Birth Date & Gender Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Birth Date
              </label>
              <div className="relative flex items-center glass-input rounded-2xl">
                <HiCalendar className={`absolute left-3.5 text-lg pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 pl-10 pr-3 text-sm outline-none placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Gender
              </label>
              <div className="flex items-center gap-4 py-2 pl-2">
                <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="accent-cyan-400"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="accent-cyan-400"
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>
          </div>

          {/* Passwords Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Password
              </label>
              <div className="relative flex items-center glass-input rounded-2xl">
                <HiLockClosed className={`absolute left-3.5 text-lg pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 pl-10 pr-9 text-sm outline-none placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 transition ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
                >
                  {showPassword ? <HiEyeSlash className="text-base" /> : <HiEye className="text-base" />}
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1 pl-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Confirm Password
              </label>
              <div className="relative flex items-center glass-input rounded-2xl">
                <HiLockClosed className={`absolute left-3.5 text-lg pointer-events-none ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2.5 pl-10 pr-9 text-sm outline-none placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-3 font-semibold py-3.5 rounded-2xl text-sm transition-all duration-200 shadow-lg active:scale-[0.98] disabled:opacity-50 cursor-pointer ${theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className={`text-center mt-5 text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          Already have an account?{" "}
          <Link to="/login" className={`font-medium hover:underline ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
            Sign in
          </Link>
        </div>

      </div>

    </div>
  );
};

export default SignUp;