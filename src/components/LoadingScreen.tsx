import React, { useEffect, useState } from 'react';

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
      className={`fixed inset-0 gradient-game flex flex-col z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 px-4">
          {/* Title */}
          <div className="text-center bounce-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              The Algebraic
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
              Pandas 🐼
            </h1>
          </div>

          {/* Loading Bar */}
          <div className="w-48 sm:w-56 md:w-64 slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="h-2 md:h-3 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-white/90 text-center mt-2 font-medium text-sm">
              Loading... {progress}%
            </p>
          </div>

          {/* Fun Math Facts */}
          <p className="text-white/80 text-sm md:text-base animate-pulse text-center">
            {progress < 33 && "🧮 Preparing equations..."}
            {progress >= 33 && progress < 66 && "📐 Organizing geometry..."}
            {progress >= 66 && progress < 100 && "🎯 Setting up challenges..."}
            {progress === 100 && "✨ Ready to learn!"}
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-4 text-center">
        <a 
          href="https://as-services.info" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/70 text-xs sm:text-sm hover:text-white transition-colors"
        >
          Made by <span className="font-semibold text-white">Angad Singh</span> from{' '}
          <span className="font-semibold text-white">AS Services</span>
        </a>
      </footer>
    </div>
  );
};

export default LoadingScreen;
