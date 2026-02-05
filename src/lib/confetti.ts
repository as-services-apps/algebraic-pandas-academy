// Simple confetti effect
const confetti = () => {
  const colors = ['#14b8a6', '#f97316', '#8b5cf6', '#ec4899', '#22c55e'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events: none;
      z-index: 9999;
      animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
      transform: rotate(${Math.random() * 360}deg);
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
  
  // Add keyframes if not exists
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confetti-fall {
        0% {
          top: -10px;
          opacity: 1;
          transform: translateX(0) rotate(0deg);
        }
        100% {
          top: 100vh;
          opacity: 0;
          transform: translateX(${Math.random() > 0.5 ? '' : '-'}100px) rotate(720deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
};

export const triggerConfetti = confetti;
export default confetti;
