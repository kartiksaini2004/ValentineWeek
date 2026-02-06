import { useState, useEffect } from 'react';
import { Lock, Heart } from 'lucide-react';
import { valentineDays } from '../data/valentineDays';

interface CalendarPageProps {
  onDayClick: (day: number) => void;
  visitedDays: number[];
}

export default function CalendarPage({ onDayClick, visitedDays }: CalendarPageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isDayUnlocked = (dateString: string) => {
    const dayDate = new Date(dateString);
    dayDate.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now >= dayDate;
  };

  const getTimeUntilUnlock = (dateString: string) => {
    const dayDate = new Date(dateString);
    dayDate.setHours(0, 0, 0, 0);
    const diff = dayDate.getTime() - currentTime.getTime();

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-100 to-red-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 fill-red-500 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">
            Our Valentine's Week Journey
          </h1>
          <p className="text-xl text-gray-600">8 days of love, starting February 7th</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valentineDays.map((day) => {
            const unlocked = isDayUnlocked(day.date);
            const timeUntil = getTimeUntilUnlock(day.date);
            const isVisited = visitedDays.includes(day.day);
            const isValentinesDay = day.day === 14;

            return (
              <div
                key={day.day}
                onClick={() => unlocked && onDayClick(day.day)}
                className={`relative rounded-2xl p-6 shadow-xl transform transition-all duration-300 overflow-hidden ${
                  unlocked
                    ? `bg-gradient-to-br ${day.theme.gradient} cursor-pointer hover:scale-105 hover:shadow-2xl`
                    : 'bg-gray-300 cursor-not-allowed'
                } ${isValentinesDay && unlocked ? 'ring-4 ring-red-500 animate-pulse' : ''}`}
              >
                {!unlocked && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-20">
                    <div className="text-center text-white space-y-2">
                      <Lock className="w-8 h-8 mx-auto" />
                      {timeUntil && (
                        <div className="font-mono text-sm">
                          <div className="text-base font-bold leading-tight">
                            {timeUntil.days > 0 && `${timeUntil.days}d `}
                            {String(timeUntil.hours).padStart(2, '0')}:
                            {String(timeUntil.minutes).padStart(2, '0')}:
                            {String(timeUntil.seconds).padStart(2, '0')}
                          </div>
                          <div className="text-xs mt-1">until unlock</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-center relative z-10">
                  <div className="text-5xl mb-3">{day.theme.icon}</div>
                  <div className="text-sm font-semibold mb-1 text-white/90">
                    February {day.day}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{day.name}</h3>
                  <p className="text-sm text-white/80">{day.description}</p>

                  {unlocked && isVisited && (
                    <div className="mt-3 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">
                      ✓ Visited
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">
            Each day unlocks at midnight. 💕
          </p>
        </div>
      </div>
    </div>
  );
}
