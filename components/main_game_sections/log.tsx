import React, { useEffect, useRef, useState } from 'react';
import { useLogContext } from '@context/LogContext'; // Adjust the import path accordingly
import '@styles/logStyle.css'; // Adjust the import path accordingly

const Log = () => {
  const { entries } = useLogContext();
  const logRef = useRef(null);
  const [scrollbarVisible, setScrollbarVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [animationFrameId, setAnimationFrameId] = useState(null);

  const handleScroll = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setScrollbarVisible(true);

    const logElement = logRef.current;
    if (logElement) {
      const scrolledToBottom =
        logElement.scrollHeight - logElement.scrollTop <=
        logElement.clientHeight + 1;
      if (!scrolledToBottom) {
        setUserScrolledUp(true);
        setIsScrolledToBottom(false);

        // if (animationFrameId) {
        //   cancelAnimationFrame(animationFrameId);
        //   setAnimationFrameId(null);
        // }
      } else {
        setUserScrolledUp(false);
        setIsScrolledToBottom(true);
      }
    }

    const newTimeoutId = setTimeout(() => {
      setScrollbarVisible(false);
    }, 2000);
    setTimeoutId(newTimeoutId);
  };

  const scrollToBottom = () => {
    const logElement = logRef.current;
    const startPosition = logElement.scrollTop;
    const endPosition = logElement.scrollHeight;
    const distance = endPosition - startPosition;
    const duration = 100; // Custom duration for the animation
    let startTime = null;

    console.log(
      'START: ' +
        startPosition +
        ' --- END: ' +
        endPosition +
        ' --- DISTANCE: ' +
        distance
    );

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const t = timeElapsed / duration;

      let run = startPosition + distance * t;

      // Check if the bottom has been reached
      if (run >= endPosition - logElement.clientHeight) {
        logElement.scrollTop = endPosition - logElement.clientHeight;
        setIsScrolledToBottom(true);
        setAnimationFrameId(null);
        return;
      }

      logElement.scrollTop = run;
      if (timeElapsed < duration) {
        const newAnimationFrameId = requestAnimationFrame(animation);
        setAnimationFrameId(newAnimationFrameId);
      } else {
        logElement.scrollTop = startPosition + distance; // Ensure it reaches the end position
        setIsScrolledToBottom(true);
        setAnimationFrameId(null);
      }
    };

    const newAnimationFrameId = requestAnimationFrame(animation);
    setAnimationFrameId(newAnimationFrameId);
  };

  useEffect(() => {
    const logElement = logRef.current;
    if (logElement) {
      const scrolledToBottom =
        logElement.scrollHeight - logElement.scrollTop <=
        logElement.clientHeight + 1;
      if (scrolledToBottom || !userScrolledUp) {
        logElement.scrollTop = logElement.scrollHeight;
      }
    }
  }, [entries, userScrolledUp]);

  useEffect(() => {
    const logElement = logRef.current;
    if (logElement) {
      logElement.addEventListener('scroll', handleScroll);
      return () => {
        logElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          borderBottom: '3px solid black',
          padding: '5px',
        }}
      >
        <h1>
          <strong>Event Log</strong>
        </h1>
      </div>
      <div className="log-container-wrapper">
        <div
          ref={logRef}
          className={`log-container ${
            scrollbarVisible ? '' : 'hidden-scrollbar'
          }`}
          onScroll={handleScroll}
        >
          {entries
            .map((entry, index) => (
              <p key={index}>
                <strong>{entry.timestamp}:</strong> {entry.message}
              </p>
            ))
            .reverse()}
        </div>
        {!isScrolledToBottom && (
          <button className="scroll-to-bottom" onClick={scrollToBottom}>
            ⬇
          </button>
        )}
      </div>
    </>
  );
};

export default Log;
