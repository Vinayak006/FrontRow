import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Profile = () => {
  const userName = "";

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon">
            <User />
          </Button>
        }
      />

      <PopoverContent className="w-48">
        <PopoverHeader>
          <PopoverTitle>{userName ? userName : "Guest"}</PopoverTitle>
        </PopoverHeader>

        {userName ? (
          <Button variant="outline" onClick={() => {}}>
            Sign out
          </Button>
        ) : (
          <Button onClick={() => {}}>Login</Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
