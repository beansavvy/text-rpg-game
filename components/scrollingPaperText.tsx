'use client';

import { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

const ScrollingPaperText: React.FC<{
  text: string;
  onComplete: () => void;
}> = ({ text, onComplete }) => {
  const [queue, setQueue] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasTextRef = useRef<HTMLDivElement>(null);
  const continueMessageRef = useRef<HTMLDivElement>(null);
  // const paperCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const words = text.split(' ');
    let sentence = '';
    const tempQueue: string[] = [];

    words.forEach((word) => {
      if (word == '##BR##') {
        sentence += `<br><span class="scroll-text-linebreak"></span> `;
        // tempQueue.push(sentence);
        // sentence = '';
      } else if (word == '##TAB##') {
        sentence += `<span class="scroll-text-indent"></span> `;
      } else {
        const wrappedWord = `<span class="paperWord">${word}</span>`;
        sentence += `${wrappedWord} `;
        if (word.endsWith('.')) {
          tempQueue.push(sentence);
          sentence = '';
        }
      }
    });

    setQueue(tempQueue);
  }, [text]);

  const animateText = (sentence: string) => {
    if (canvasTextRef.current) {
      const span = document.createElement('span');
      span.classList.add('fade-in-text');
      span.innerHTML = sentence;
      canvasTextRef.current.appendChild(span);

      anime
        .timeline({ loop: false })
        .add({
          targets: span.querySelectorAll('.paperWord'),
          opacity: [0, 1],
          duration: 1500,
          delay: anime.stagger(100),
          easing: 'easeInOutQuad',
        })
        .finished.then(() => {
          if (queue.length > 0) {
            setTimeout(() => {
              animateText(queue.shift() as string);
              setQueue([...queue]);
            }, 100);
          } else {
            setTimeout(showContinueMessage, 1000);
          }
        });
    }
  };

  const showContinueMessage = () => {
    const continueMessage = document.createElement('div');
    continueMessage.classList.add('continue-message');
    continueMessage.innerText = 'Click to continue';
    continueMessageRef.current = continueMessage;
    if (canvasTextRef.current) {
      canvasTextRef.current.appendChild(continueMessage);
    }
  };

  useEffect(() => {
    if (queue.length > 0 && !isAnimating) {
      setIsAnimating(true);
      animateText(queue.shift() as string);
      setQueue([...queue]);
    }
  }, [queue]);

  const handleClick = () => {
    if (anime.running.length > 0) {
      anime.running.forEach((anim) => anim.seek(anim.duration));
    } else if (continueMessageRef.current) {
      onComplete();
    }
  };

  return (
    <div id="paper-canvas" className="scrolling-paper">
      <div id="click-mask" onClick={handleClick}></div>
      <div
        id="canvas-text-wrapper"
        style={{
          maxWidth: 1000 + 'px',
          position: 'relative',
          minWidth: 750 + 'px',
        }}
      >
        <div
          id="canvas-text"
          ref={canvasTextRef}
          style={{
            whiteSpace: 'pre-wrap',
            margin: 100 + 'px',
            zIndex: 100,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ScrollingPaperText;
