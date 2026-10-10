import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext({ socket: null, onlineUsers: [] });

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState([]);

  // One socket per logged-in user. Same origin => the browser sends the jwt cookie
  // automatically (Vite proxies /socket.io to the backend, see vite.config.js).
  const socket = useMemo(() => (authUser ? io({ autoConnect: false }) : null), [authUser]);

  useEffect(() => {
    if (!socket) return;

    socket.on("getOnlineUsers", setOnlineUsers);
    socket.connect();

    return () => {
      socket.off("getOnlineUsers", setOnlineUsers);
      socket.disconnect(); // runs on logout and on unmount
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers: socket ? onlineUsers : [] }}>
      {children}
    </SocketContext.Provider>
  );
};