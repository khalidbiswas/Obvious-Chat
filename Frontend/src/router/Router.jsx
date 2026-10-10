import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
// Import future pages here (e.g., SignUp, Chat)

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      {/* <Route path="/chat" element={<Chat />} /> */}
    </Routes>
  );
};

export default AppRouter;