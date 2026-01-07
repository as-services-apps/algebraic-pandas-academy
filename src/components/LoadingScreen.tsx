import React, { useEffect, useState } from 'react';
import pandaMascot from '@/assets/panda-mascot.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 gradient-game flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Panda Mascot */}
        <div className="float">
          <img 
            src={pandaMascot} 
            alt="Panda Mascot" 
            className="w-40 h-40 object-contain drop-shadow-2xl bounce-in"
          />
        </div>

        {/* Title */}
        <div className="text-center bounce-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            The Algebraic
          </h1>
          <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
            Pandas 🐼
          </h1>
        </div>

        {/* Loading Bar */}
        <div className="w-64 md:w-80 slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="h-4 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/90 text-center mt-3 font-medium">
            Loading... {progress}%
          </p>
        </div>

        {/* Fun Math Facts */}
        <p className="text-white/80 text-lg mt-4 animate-pulse">
          {progress < 33 && "🧮 Preparing equations..."}
          {progress >= 33 && progress < 66 && "📐 Organizing geometry..."}
          {progress >= 66 && progress < 100 && "🎯 Setting up challenges..."}
          {progress === 100 && "✨ Ready to learn!"}
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-white/70 text-sm">
          Made by <span className="font-semibold text-white">Angad Singh</span> from{' '}
          <span className="font-semibold text-white">AS Services</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
