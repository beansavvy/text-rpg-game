'use client';

import { useEffect } from 'react';
import $ from 'jquery';
import anime from 'animejs';
import { buildPaper } from '../public/scrollingText';
import '../styles/globalStyles.css';

const ScrollingPaperText: React.FC<{
  text: string;
  onComplete: () => void;
}> = ({ text, onComplete }) => {
  useEffect(() => {
    // Initialize the canvas for paper
    const canvas = document.getElementById('paper-canvas');
    if (canvas) {
      canvas.style.display = 'block';
      canvas.style.background = '#efe297';
    }

    buildPaper(text);

    return () => {
      // Cleanup function to remove text and hide canvas
      const canvasText = document.getElementById('canvas-text');
      if (canvasText) {
        canvasText.innerHTML = '';
      }
      if (canvas) {
        canvas.style.display = 'none';
      }
    };
    text = '';
  }, [text]);

  return (
    <div id="paper-canvas" className="scrolling-paper">
      <div id="canvas-text"></div>
    </div>
  );
};

export default ScrollingPaperText;

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import anime from 'animejs';

// const ScrollingPaperText: React.FC<{
//   text: string;
//   onComplete: () => void;
// }> = ({ text, onComplete }) => {
//   const [textQueue, setTextQueue] = useState<string[]>([]);
//   const currentAnimation = useRef<any>(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [animationIndex, setAnimationIndex] = useState(0);

//   useEffect(() => {
//     buildPaper(text);
//     text = '';
//   }, [text]);

//   useEffect(() => {
//     if (textQueue.length > 0 && !isAnimating) {
//       dequeueAndAnimateText(1000);
//     }
//   }, [textQueue, isAnimating]);

//   const buildPaper = (text: string) => {
//     const words = text.split(' ');
//     let tempLine = '';

//     words.forEach((word) => {
//       if (/[.!?]$/.test(word)) {
//         tempLine += `<span class="paperWord">${word}</span> `;
//         enqueueText(tempLine);
//         tempLine = '';
//       } else {
//         tempLine += `<span class="paperWord">${word}</span> `;
//       }
//     });

//     if (tempLine) {
//       enqueueText(tempLine.trim());
//     }
//   };

//   const enqueueText = (line: string) => {
//     setTextQueue((prevQueue) => [...prevQueue, line]);
//   };

//   const dequeueAndAnimateText = (delay: number) => {
//     if (textQueue.length > 0) {
//       const line = textQueue.shift()!;
//       animateTextLine(line).then(() => {
//         if (textQueue.length > 0) {
//           setTimeout(() => {
//             dequeueAndAnimateText(delay);
//           }, delay);
//         } else {
//           endOfDialogue();
//         }
//       });
//     }
//   };

//   const animateTextLine = (line: string) => {
//     return new Promise<void>((resolve) => {
//       if (isAnimating) {
//         return;
//       }
//       setIsAnimating(true);
//       document.body.addEventListener('click', skipCurrentAnimation, {
//         once: true,
//       });
//       const lineElement = document.createElement('span');
//       lineElement.className = 'fade-in-text';
//       lineElement.innerHTML = line;
//       const canvasText = document.getElementById('canvas-text');
//       if (canvasText) {
//         canvasText.appendChild(lineElement);
//       }

//       currentAnimation.current = anime.timeline({ loop: false }).add({
//         targets: lineElement.querySelectorAll('.paperWord'),
//         opacity: [0, 1],
//         duration: 1500,
//         delay: anime.stagger(100),
//         easing: 'easeInOutQuad',
//         complete: function () {
//           lineElement.className = 'faded-in-text';
//           document.getElementById('paper-canvas')!.scrollTop =
//             document.getElementById('paper-canvas')!.scrollHeight;
//           setIsAnimating(false);
//           resolve();
//         },
//       });
//     });
//   };

//   const skipCurrentAnimation = () => {
//     if (currentAnimation.current) {
//       currentAnimation.current.seek(currentAnimation.current.duration);
//       currentAnimation.current = null;
//       setIsAnimating(false);
//       setTimeout(() => {
//         dequeueAndAnimateText(0); // Immediately start the next animation
//       }, 0);
//     }
//   };

//   const endOfDialogue = () => {
//     const canvasText = document.getElementById('canvas-text');
//     if (canvasText) {
//       const prompt = document.createElement('div');
//       prompt.id = 'paper-continue-prompt';
//       prompt.className = 'flashing-text';
//       prompt.style.cssText =
//         'float: right; margin-top: 10px; cursor: pointer; animation: flashText 2s ease-in-out infinite;';
//       prompt.innerText = 'Click anywhere to continue...';
//       canvasText.appendChild(prompt);

//       const padding = document.createElement('div');
//       padding.id = 'paper-continue-padding';
//       padding.style.cssText = 'height: 30px; opacity: 1;';
//       canvasText.appendChild(padding);

//       document.body.addEventListener('click', onComplete, { once: true });
//     }
//   };

//   return (
//     <div id="paper-canvas" className="scrolling-paper">
//       <div id="canvas-text"></div>
//     </div>
//   );
// };

// export default ScrollingPaperText;

// // const dequeueAndAnimateText = (delay: number) => {
// //   if (textQueue.length > 0) {
// //     const line = textQueue.shift()!;
// //     animateTextLine(line).then(() => {
// //       if (skippedAnimation) {
// //         setSkippedAnimation(false);
// //         dequeueAndAnimateText(delay);
// //         return;
// //       }
// //       setTimeout(() => {
// //         dequeueAndAnimateText(delay);
// //       }, delay);
// //     });
// //   } else {
// //     endOfDialogue();
// //   }
// // };

//FADE IN FADE OUT

// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import anime from 'animejs';

// const ScrollingPaperText: React.FC<{
//   text: string;
//   onComplete: () => void;
// }> = ({ text, onComplete }) => {
//   const [queue, setQueue] = useState<string[]>([]);
//   const currentLineRef = useRef<string | null>(null);
//   const isAnimatingRef = useRef(false);

//   useEffect(() => {
//     buildPaper(text);
//   }, [text]);

//   const buildPaper = (text: string) => {
//     const words = text.split(' ');
//     let tempLine = '';

//     words.forEach((word, index) => {
//       if (/[.!?]$/.test(word) || index === words.length - 1) {
//         tempLine += `<span class="paperWord">${word}</span> `;
//         enqueueText(tempLine);
//         tempLine = '';
//       } else {
//         tempLine += `<span class="paperWord">${word}</span> `;
//       }
//     });
//   };

//   const enqueueText = (line: string) => {
//     setQueue((prevQueue) => [...prevQueue, line]);
//   };

//   const dequeueAndAnimateText = () => {
//     if (!isAnimatingRef.current && queue.length > 0) {
//       const line = queue.shift()!;
//       currentLineRef.current = line;
//       isAnimatingRef.current = true;
//       animateTextLine(line);
//     }
//   };

//   const animateTextLine = (line: string) => {
//     const canvasText = document.getElementById('canvas-text');
//     if (canvasText) {
//       canvasText.innerHTML = line;
//       const words = canvasText.getElementsByClassName('paperWord');
//       anime({
//         targets: words,
//         opacity: [0, 1],
//         translateX: [50, 0],
//         delay: anime.stagger(100),
//         complete: () => {
//           setTimeout(() => {
//             removeTextLine();
//           }, 1000);
//         },
//       });
//     }
//   };

//   const removeTextLine = () => {
//     const canvasText = document.getElementById('canvas-text');
//     if (canvasText) {
//       const words = canvasText.getElementsByClassName('paperWord');
//       anime({
//         targets: words,
//         opacity: [1, 0],
//         translateX: [0, -50],
//         delay: anime.stagger(100),
//         complete: () => {
//           canvasText.innerHTML = '';
//           isAnimatingRef.current = false;
//           dequeueAndAnimateText();
//         },
//       });
//     }
//   };

//   const skipCurrentAnimation = () => {
//     if (isAnimatingRef.current) {
//       anime.remove('.paperWord');
//       const canvasText = document.getElementById('canvas-text');
//       if (canvasText) {
//         canvasText.innerHTML = '';
//       }
//       isAnimatingRef.current = false;
//       dequeueAndAnimateText();
//     }
//   };

//   useEffect(() => {
//     dequeueAndAnimateText();
//   }, [queue]);

//   return (
//     <div
//       id="paper-canvas"
//       className="scrolling-paper"
//       onClick={skipCurrentAnimation}
//     >
//       <div id="canvas-text"></div>
//     </div>
//   );
// };

// export default ScrollingPaperText;
