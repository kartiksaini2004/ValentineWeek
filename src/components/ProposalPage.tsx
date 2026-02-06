import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface ProposalPageProps {
  onAccept: () => void;
}

export default function ProposalPage({ onAccept }: ProposalPageProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!noButtonRef.current || showPopup) return;

    const button = noButtonRef.current;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
    );

    if (distance < 150) {
      setDodgeCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setShowPopup(true);
        }
        return newCount;
      });

      const angle = Math.atan2(buttonCenterY - e.clientY, buttonCenterX - e.clientX);
      const moveDistance = 150 - distance;

      const newX = Math.cos(angle) * moveDistance * 2;
      const newY = Math.sin(angle) * moveDistance * 2;

      setNoButtonPosition(prev => {
        const newPosX = prev.x + newX;
        const newPosY = prev.y + newY;
        
        // Keep button within bounds
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;
        const minX = -100;
        const minY = -50;
        
        return {
          x: Math.max(minX, Math.min(maxX, newPosX)),
          y: Math.max(minY, Math.min(maxY, newPosY)),
        };
      });
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-rose-300 flex items-center justify-center p-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-md">
            <div className="text-center">
              <div className="mb-4 text-6xl">😤</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Come on! 😭
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                You cannot say NO! Stop dodging and just say YES already! I'm getting tired here... 
                <br />
                <span className="font-bold text-red-500">Go on, click YES and put me out of my misery! 💔</span>
              </p>
              <button
                onClick={onAccept}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white text-2xl font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full"
              >
                YES! 💚 Let's Do This!
              </button>
              <p className="text-sm text-gray-500 mt-4 italic">
                (There's no escape... 😏)
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <Heart className="w-24 h-24 text-red-500 mx-auto fill-red-500" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 animate-pulse">
          Will You Be My Valentine?
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 italic">
          This Valentine's week, I want to celebrate every moment with you... 💕
        </p>

        <div className="flex gap-6 justify-center items-center relative min-h-32">
          <button
            onClick={onAccept}
            className="bg-green-500 hover:bg-green-600 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 hover:shadow-green-500/50 relative z-10"
          >
            Yes! 💖
          </button>

          <button
            ref={noButtonRef}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: isHovering ? 'transform 0.3s ease-out' : 'none',
            }}
            className="bg-red-500 text-white text-2xl font-bold py-6 px-12 rounded-full shadow-2xl cursor-move relative"
          >
            No 😢
          </button>
        </div>

        <div className="mt-8 text-gray-600 text-sm">
          <p>Hint: The "No" button is a bit shy... 😉</p>
          {dodgeCount > 0 && (
            <p className="text-red-600 font-semibold mt-2">
              You've tried {dodgeCount} time{dodgeCount !== 1 ? 's' : ''}! 👀
            </p>
          )}
        </div>
      </div>

      <div className="absolute top-10 left-10 animate-pulse text-4xl">💕</div>
      <div className="absolute top-20 right-20 animate-pulse text-4xl delay-75">💖</div>
      <div className="absolute bottom-10 left-20 animate-pulse text-4xl delay-150">💗</div>
      <div className="absolute bottom-20 right-10 animate-pulse text-4xl delay-300">💝</div>
    </div>
  );
}
