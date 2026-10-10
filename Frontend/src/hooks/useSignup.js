import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullname, username, email, birthDate, gender, password, confirmPassword }) => {
    // 1. Validate inputs
    const success = handleInputErrors({ fullname, username, email, birthDate, gender, password, confirmPassword });
    if (!success) return; // Exit if validation fails

    // 2. Execute API Call
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, birthDate, gender, password, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Signup failed");
      }

      // 3. Save session & update global auth context
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

// Helper function for validation
function handleInputErrors({ fullname, username, email, birthDate, gender, password, confirmPassword }) {
  if (!fullname || !username || !email || !birthDate || !gender || !password || !confirmPassword) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true; // Return true when all checks pass!
}