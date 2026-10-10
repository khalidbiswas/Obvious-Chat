import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Log the response payload to inspect its shape in the browser console
        console.log("Fetched conversations payload:", data);

        // Ensure state is always set to an array
        if (Array.isArray(data)) {
          setConversations(data);
        } else if (Array.isArray(data.users)) {
          setConversations(data.users);
        } else {
          setConversations([]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
        toast.error("Failed to fetch conversations. Please try again later.");
        setConversations([]); // Reset to empty array on error to prevent filter crashes
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;