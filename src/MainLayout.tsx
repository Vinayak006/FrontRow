import { Outlet } from "react-router-dom";
import Profile from "./components/shared/Profile";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-4 py-2 flex justify-between">
        <h1 className="font-bold text-xl">FrontRow</h1>
        <Profile />
      </div>
      <div className="h-px bg-gray-200"></div>
      <Outlet />
    </div>
  );
};

export default HomePage;
