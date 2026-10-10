import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "../../hooks/useLogout"; // Adjust path if needed

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="p-3 border-t border-black/10 dark:border-white/10 mt-auto flex items-center justify-between">
      <button
        onClick={logout}
        disabled={loading}
        className="flex items-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer group disabled:opacity-50"
      >
        <HiArrowRightOnRectangle className="text-base group-hover:-translate-x-0.5 transition-transform" />
        <span>{loading ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
};

export default LogoutButton;