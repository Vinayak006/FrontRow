import { useLocation, useNavigate } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMe } from "../../hooks/useMe";
import Profile from "./Profile";

const HeaderActions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: user } = useMe();

  const navItems = [
    {
      label: "My Venues",
      path: "/my-venues",
      icon: MapPin,
    },
    {
      label: "My Events",
      path: "/my-events",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {user &&
        navItems.map(({ label, path, icon: Icon }) => {
          const isActive = pathname === path;

          return (
            <Button
              key={path}
              variant="ghost"
              onClick={() => navigate(path)}
              className={`gap-2 ${
                isActive &&
                "text-primary underline underline-offset-4 decoration-2"
              }`}
            >
              <Icon size={18} />
              {isActive && <span>{label}</span>}
            </Button>
          );
        })}

      <Profile />
    </div>
  );
};

export default HeaderActions;
