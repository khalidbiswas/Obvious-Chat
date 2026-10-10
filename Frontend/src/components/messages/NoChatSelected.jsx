import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext"; 

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
console.log('wtf');

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg text-gray-700 dark:text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser?.fullname || authUser?.username || "User"} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center text-indigo-400 mt-2" />
      </div>
    </div>
  );
};

export default NoChatSelected;