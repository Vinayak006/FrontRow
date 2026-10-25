import { cn } from "cn";
import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  className?: string;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ className, text }) => {
  return (
    <div className="flex items-center">
      <LoaderCircle size={16} className={cn("animate-spin", className)} />
      {text && <span className="ml-2">{text}</span>}
    </div>
  );
};

export default Loader;
