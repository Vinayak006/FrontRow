import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import HeaderActions from "./components/shared/HeaderActions";
import { useMe } from "./hooks/useMe";
import Loader from "./components/shared/Loader";

const HomePage = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useMe();

  useEffect(() => {
    if (!data && !isFetching) {
      navigate("/auth");
    }
  }, [data, navigate, isFetching]);

  if (isFetching) {
    return <Loader text="Getting you in..." />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="px-4 py-2 flex justify-between">
        <h1 className="font-bold text-xl" onClick={() => navigate("/")}>
          FrontRow
        </h1>
        <HeaderActions />
      </div>
      <div className="h-px bg-gray-200"></div>

      <Outlet />
    </div>
  );
};

export default HomePage;
