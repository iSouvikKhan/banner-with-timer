import { FC, useEffect, useState } from "react";

interface BannerProps {
  bannerText: string;
  hrefLink: string;
  targetDate: Date;
}

export const Banner: FC<BannerProps> = ({ bannerText, hrefLink, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const timeRemaining = getTimeRemaining(targetDate);

      if (timeRemaining.total <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
        clearInterval(interval);
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  function getTimeRemaining(targetDate: Date) {
    const now = new Date();
    const total = targetDate.getTime() - now.getTime();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  function formatTime(time: number) {
    return String(time).padStart(2, '0');
  }

  return (
    <div className="border-2 border-sky-500 m-6 relative min-h-24 rounded text-red-500 shadow-lg shadow-cyan-500/50 grid grid-cols-6 gap-4">
      <div className="bg-red-500 col-span-4 grid grid-rows-4">
        <div className="text-white row-span-3 text-center">
          <p className="text-4xl">{bannerText}</p>
        </div>
        <div className="text-white text-center">
          <a href={hrefLink} target="_blank">click here</a>
        </div>
      </div>
      <div className="bg-red-500 col-span-2">
        <div className="min-h-24 m-2 text-white text-center">
          <div className="text-4xl grid grid-cols-4">
            <span className="grid grid-rows-2">
              <span className="text-sm">Days</span>
              <span>{formatTime(timeLeft.days)}</span>
            </span>
            <span className="grid grid-rows-2">
              <span className="text-sm">Hours</span>
              <span>{formatTime(timeLeft.hours)}</span>
            </span>
            <span className="grid grid-rows-2">
              <span className="text-sm">Minutes</span>
              <span>{formatTime(timeLeft.minutes)}</span>
            </span>
            <span className="grid grid-rows-2">
              <span className="text-sm">Seconds</span>
              <span>{formatTime(timeLeft.seconds)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
