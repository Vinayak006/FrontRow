import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/useMe";
import { useNavigate } from "react-router-dom";
import { useSignout } from "@/hooks/useSignout";
import Loader from "./Loader";

const Profile = () => {
  const navigate = useNavigate();

  const { data: user, isPending } = useMe();

  const { mutate: mutateSignout, isPending: isSigningOut } = useSignout();

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" title="Profile">
            <User />
            {isPending && <Loader />}
          </Button>
        }
      />

      <PopoverContent className="w-48">
        <PopoverHeader>
          <PopoverTitle>{user && user.name ? user.name : "Guest"}</PopoverTitle>
        </PopoverHeader>

        {user ? (
          <Button
            variant="outline"
            disabled={isSigningOut}
            onClick={() => {
              mutateSignout();
            }}
          >
            {isSigningOut ? <Loader text="signing out..." /> : <>Sign out</>}
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/auth");
            }}
          >
            Login
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
