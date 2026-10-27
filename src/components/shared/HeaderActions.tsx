import { Bot, CalendarDays, MapPin } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Profile from "./Profile";
import { Button } from "@/components/ui/button";

const HeaderActions = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    {
      label: "Chat",
      path: "/chat",
      icon: Bot,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      {navItems.map(({ label, path, icon: Icon }) => {
        const isActive = pathname === path;

        return (
          <Button
            key={path}
            variant="ghost"
            title={isActive ? undefined : label}
            onClick={() => navigate(path)}
            className={`gap-2 ${
              isActive && "text-primary underline underline-offset-20"
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
