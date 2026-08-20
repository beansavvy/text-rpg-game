import React, { useEffect, useRef, useState } from 'react';
import { useGameContext } from '@context/GameContext';

const CustomMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const { gameState, getLocationById, db } = useGameContext();
  const currentLocationId = gameState.world.currentLocationId;
  const currentLocation = getLocationById(currentLocationId);

  const getTextWidth = (
    ctx: CanvasRenderingContext2D,
    text: string,
    font: string
  ) => {
    ctx.font = font;
    return ctx.measureText(text).width;
  };

  const centerOnParty = () => {
    const canvas = canvasRef.current;

    if (
      !canvas ||
      !currentLocation ||
      currentLocation.mapx === undefined ||
      currentLocation.mapy === undefined
    ) {
      return;
    }

    setOffsetX(canvas.width / 2 - currentLocation.mapx * scale);
    setOffsetY(canvas.height / 2 - currentLocation.mapy * scale);
  };

  useEffect(() => {
    centerOnParty();
  }, [currentLocationId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) {
      return;
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      db.locations?.forEach((location: any) => {
        if (location.showOnMap === false) {
          return;
        }

        if (location.mapx === undefined || location.mapy === undefined) {
          console.warn(`Location ${location.name} has invalid coordinates.`);
          return;
        }

        const discovered =
          location.discovered === true ||
          gameState.world.discoveredLocationIds.includes(location.id);

        if (discovered) {
          const textWidth = getTextWidth(ctx, location.name, 'bold 20px Arial');

          const drawingY = location.mapy + 10;

          if (location.type === 'forest') {
            drawForest(ctx, location.mapx + textWidth / 2, drawingY);
          } else if (location.type === 'town') {
            drawHouse(ctx, location.mapx + textWidth / 2, drawingY + 20);
          }

          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText(location.name, location.mapx, location.mapy);
        } else {
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText('???', location.mapx, location.mapy);
        }
      });

      if (
        currentLocation &&
        currentLocation.mapx !== undefined &&
        currentLocation.mapy !== undefined
      ) {
        const textWidth = getTextWidth(
          ctx,
          currentLocation.name,
          'bold 20px Arial'
        );

        drawPartyIndicator(
          ctx,
          currentLocation.mapx + textWidth / 2,
          currentLocation.mapy
        );
      }

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
      if (!isDragging) {
        return;
      }

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;

      setLastX(event.clientX);
      setLastY(event.clientY);
      setOffsetX((current) => current + dx);
      setOffsetY((current) => current + dy);
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button === 1 || event.button === 2) {
        setIsDragging(false);
      }
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('contextmenu', handleContextMenu);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [
    db.locations,
    gameState.world.discoveredLocationIds,
    currentLocation,
    scale,
    offsetX,
    offsetY,
    isDragging,
    lastX,
    lastY,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={600}
      style={{ width: '95%', height: '95%', display: 'block', margin: 'auto' }}
    />
  );
};

export default CustomMap;

const drawPartyIndicator = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  const tipY = y - 8;
  const markerY = tipY - 24;

  ctx.save();

  ctx.fillStyle = '#2563eb';

  ctx.beginPath();
  ctx.arc(x, markerY, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - 7, markerY + 7);
  ctx.lineTo(x + 7, markerY + 7);
  ctx.lineTo(x, tipY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'white';

  ctx.beginPath();
  ctx.arc(x, markerY, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

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
  ctx.fillRect(x - 5, y + 40, 10, 5);
};
