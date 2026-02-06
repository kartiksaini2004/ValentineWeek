import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { valentineDays } from '../data/valentineDays';

interface DayPageProps {
  day: number;
  onBack: () => void;
}

// Map day numbers to their emoji decorations
const dayDecorations: Record<number, string[]> = {
  7: ['🌹', '🌹', '🌹', '🌷', '🌺'],
  8: ['💍', '💎', '👑', '💍', '✨'],
  9: ['🍫', '🍪', '🎂', '🍫', '🍬'],
  10: ['🧸', '🧸', '🎀', '🧸', '🎁'],
  11: ['🔔', '🎋', '🎊', '💐', '🔔'],
  12: ['🤗', '🥰', '😊', '🤗', '💛'],
  13: ['💋', '👄', '💅', '💄', '💋'],
  14: ['❤️', '💖', '💕', '💝', '💗'],
};

export default function DayPage({ day, onBack }: DayPageProps) {
  const dayData = valentineDays.find((d) => d.day === day);

  if (!dayData) return null;

  const isValentinesDay = day === 14;
  const decorations = dayDecorations[day] || ['✨', '💫', '⭐'];

  // Generate floating elements with day-specific emojis
  const floatingElements = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 4,
    size: 30 + Math.random() * 50,
    emoji: decorations[i % decorations.length],
  }));

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${dayData.theme.gradient} flex items-center justify-center p-4 relative overflow-hidden`}
    >
      {/* Animated background emoji elements */}
      {floatingElements.map((elem) => (
        <div
          key={elem.id}
          className="absolute text-center select-none pointer-events-none"
          style={{
            left: `${elem.left}%`,
            top: `${elem.top}%`,
            fontSize: `${elem.size}px`,
            animation: `float ${elem.duration}s ease-in-out ${elem.delay}s infinite`,
            opacity: 0.25,
          }}
        >
          {elem.emoji}
        </div>
      ))}

      {/* Decorative sparkles for non-Valentine days */}
      {!isValentinesDay && (
        <>
          <Sparkles className="absolute top-10 right-10 w-8 h-8 text-white animate-pulse opacity-60" />
          <Sparkles className="absolute bottom-10 left-10 w-6 h-6 text-white animate-pulse delay-150 opacity-60" />
          <Sparkles className="absolute top-1/3 left-5 w-5 h-5 text-white animate-pulse delay-300 opacity-60" />
        </>
      )}

      <button
        onClick={onBack}
        className="absolute top-6 left-6 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {isValentinesDay && (
        <>
          <div className="absolute top-20 left-10 animate-bounce text-6xl">❤️</div>
          <div className="absolute top-40 right-20 animate-bounce delay-100 text-6xl">💖</div>
          <div className="absolute bottom-20 left-20 animate-bounce delay-200 text-6xl">💕</div>
          <div className="absolute bottom-40 right-10 animate-bounce delay-300 text-6xl">💝</div>
          <Sparkles className="absolute top-1/4 left-1/4 w-8 h-8 text-white animate-pulse" />
          <Sparkles className="absolute top-1/3 right-1/3 w-10 h-10 text-white animate-pulse delay-150" />
          <Sparkles className="absolute bottom-1/4 right-1/4 w-8 h-8 text-white animate-pulse delay-300" />
        </>
      )}

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.1;
          }
          25% {
            opacity: 0.3;
          }
          75% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(${Math.random() * 400 - 200}px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0.05;
          }
        }
      `}</style>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className={`mb-8 ${isValentinesDay ? 'animate-bounce' : 'animate-pulse'}`}>
          <div className="text-9xl mb-4 transition-transform duration-300 hover:scale-110">{dayData.theme.icon}</div>
          {isValentinesDay && (
            <Heart className="w-20 h-20 text-white mx-auto fill-white animate-pulse" />
          )}
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
          <div className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800 mb-2">
            February {dayData.day}, 2026
          </div>
          <h1
            className={`${
              isValentinesDay ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'
            } font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-4 animate-pulse`}
          >
            {dayData.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8 italic">{dayData.description}</p>

          <div className={`${isValentinesDay ? 'border-4 border-red-400' : 'border-2 border-gray-200'} rounded-2xl p-6 md:p-8 bg-gradient-to-br from-pink-50 to-rose-50 transform transition-all duration-300 hover:scale-105`}>
            <p
              className={`${
                isValentinesDay ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
              } text-gray-700 leading-relaxed font-medium`}
            >
              {dayData.message}
            </p>
          </div>

          {isValentinesDay && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center gap-4 text-4xl">
                <span className="animate-pulse transform transition-transform hover:scale-125">💑</span>
                <span className="animate-pulse delay-100 transform transition-transform hover:scale-125">💏</span>
                <span className="animate-pulse delay-200 transform transition-transform hover:scale-125">👫</span>
              </div>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 animate-pulse">
                Forever and Always 💖
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={onBack}
            className="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-lg"
          >
            Back to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
