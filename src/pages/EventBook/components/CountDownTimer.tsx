import { useEffect, useState } from "react";

interface CountdownTimerProps {
  datetime: string;
}

const getRemainingTime = (datetime: string) =>
  Math.max(0, new Date(datetime).getTime() - Date.now());

const CountdownTimer = ({ datetime }: CountdownTimerProps) => {
  const [remaining, setRemaining] = useState(() => getRemainingTime(datetime));

  useEffect(() => {
    const updateTimer = () => {
      setRemaining(getRemainingTime(datetime));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [datetime]);

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (remaining === 0) {
    return null;
  }

  return (
    <span>
      {days > 0 && `${days}d `}
      {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
};

export default CountdownTimer;
