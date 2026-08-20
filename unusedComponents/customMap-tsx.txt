import React, { useRef, useEffect, useState } from 'react';
// import { db, getLocationById } from '@data/data.js';
import { useGameContext } from '@context/GameContext';

const CustomMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const { currentLocation, getLocationById, db } = useGameContext(); // Use context

  console.log('current loc: ' + currentLocation);

  const getTextWidth = (ctx, text, font) => {
    ctx.font = font;
    const metrics = ctx.measureText(text);
    return metrics.width;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const currentLocationTemp = getLocationById(currentLocation);

    if (
      currentLocationTemp &&
      currentLocationTemp.mapx !== undefined &&
      currentLocationTemp.mapy !== undefined &&
      ctx
    ) {
      const textWidth = getTextWidth(
        ctx,
        currentLocationTemp.mapName,
        '20px Arial bold'
      );
      setOffsetX(canvas.width / 2 - (currentLocationTemp.mapx + textWidth / 2));
      setOffsetY(canvas.height / 2 - 20 - currentLocationTemp.mapy);
    }
  }, [currentLocation]); // Add currentLocation as dependency

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        db.locations.forEach((location) => {
          if (location.showOnMap == false) {
            return;
          }
          if (
            location.mapx !== undefined &&
            location.mapy !== undefined &&
            location.discovered == true
          ) {
            const textWidth = getTextWidth(
              ctx,
              location.name,
              '20px Arial bold'
            );

            const textY = location.mapy;
            const drawingY = textY + 10;
            if (location.type === 'forest') {
              drawForest(ctx, location.mapx + textWidth / 2, drawingY);
            } else if (location.type === 'town') {
              drawHouse(ctx, location.mapx + textWidth / 2, drawingY + 20);
            }
            ctx.font = '20px Arial bold';
            ctx.fillStyle = 'black';
            ctx.fillText(location.name, location.mapx, location.mapy);
          } else if (
            location.mapx !== undefined &&
            location.mapy !== undefined &&
            location.discovered == false
          ) {
            ctx.font = '20px Arial bold';
            ctx.fillStyle = 'black';
            ctx.fillText('???', location.mapx, location.mapy);
          } else {
            console.warn(`Location ${location.name} has invalid coordinates.`);
          }
        });

        ctx.restore();
      };

      render();

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const delta = -event.deltaY / 500;
        const newScale = Math.min(Math.max(0.5, scale + delta), 1.25);

        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        const zoomFactor = newScale / scale;
        setOffsetX(mouseX - zoomFactor * (mouseX - offsetX));
        setOffsetY(mouseY - zoomFactor * (mouseY - offsetY));

        setScale(newScale);
        render();
      };

      const handleMouseDown = (event: MouseEvent) => {
        if (event.button === 1 || event.button === 2) {
          event.preventDefault();
          setIsDragging(true);
          setLastX(event.clientX);
          setLastY(event.clientY);
        }
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (isDragging) {
          const dx = event.clientX - lastX;
          const dy = event.clientY - lastY;

          setLastX(event.clientX);
          setLastY(event.clientY);

          setOffsetX(offsetX + dx);
          setOffsetY(offsetY + dy);

          render();
        }
      };

      const handleMouseUp = (event: MouseEvent) => {
        if (event.button === 1 || event.button === 2) {
          setIsDragging(false);
        }
      };

      canvas.addEventListener('wheel', handleWheel);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('contextmenu', (e) => e.preventDefault());

      return () => {
        canvas.removeEventListener('wheel', handleWheel);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
      };
    }
  }, [scale, offsetX, offsetY, isDragging, lastX, lastY]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default CustomMap;

const drawHouse = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = 'brown';
  ctx.fillRect(x - 15, y, 30, 30);
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(x - 15, y);
  ctx.lineTo(x + 15, y);
  ctx.lineTo(x, y - 15);
  ctx.closePath();
  ctx.fill();
};

const drawForest = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.fillStyle = 'green';

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - 10, y + 20);
  ctx.lineTo(x + 10, y + 20);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x - 15, y + 30);
  ctx.lineTo(x + 15, y + 30);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y + 20);
  ctx.lineTo(x - 20, y + 40);
  ctx.lineTo(x + 20, y + 40);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'brown';
  ctx.fillRect(x - 5, y + 40, 10, 20);
};
