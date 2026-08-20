import React, { useEffect, useRef, useState } from 'react';
import { customGrid } from '@eventHandlers/customGridHandler.tsx';
import * as PIXI from 'pixi.js';

const GRID_HEIGHT = 80; // Number of cells in height
const GRID_WIDTH = 70; // Number of cells in width
const CELL_SIZE = 5; // Size of each cell in pixels
const MOVEMENT_RANGE = 15; // Movement range in cells
const PLAYER_SIZE = 3; // Size of the player circle
const MOVE_DURATION = 0.5; // Movement duration in seconds

const CombatGrid = (party: any, enemies: any) => {
  const pixiContainer = useRef(null);
  const appRef = useRef(null);
  const gameContainerRef = useRef<PIXI.Container | null>(null);
  const [playerPosition, setPlayerPosition] = useState({
    x: Math.floor(GRID_WIDTH / 2),
    y: Math.floor(GRID_HEIGHT / 2),
  });

  const tempGrid = new customGrid(GRID_WIDTH, GRID_HEIGHT);

  // Initialize PixiJS Application
  useEffect(() => {
    let isAppValid = true;

    const initPixiApp = async () => {
      if (appRef.current || !pixiContainer.current || !isAppValid) return;

      const pixiApp = new PIXI.Application();

      try {
        await pixiApp.init({
          width: GRID_WIDTH * CELL_SIZE,
          height: GRID_HEIGHT * CELL_SIZE,
          backgroundColor: 0xeeeeee,
          antialias: true, // Enable antialiasing for smoother circles
        });

        if (isAppValid && pixiContainer.current) {
          pixiContainer.current.appendChild(pixiApp.view);
          appRef.current = pixiApp;

          const gameContainer = new PIXI.Container();
          gameContainerRef.current = gameContainer;
          pixiApp.stage.addChild(gameContainer);
          drawGame(gameContainer, pixiApp);
        }
      } catch (error) {
        console.error('Error initializing PixiJS:', error);
      }
    };

    initPixiApp();

    return () => {
      isAppValid = false;
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
        gameContainerRef.current = null;
      }
    };
  }, []);

  // Update when player position changes
  useEffect(() => {
    if (gameContainerRef.current) {
      drawGame(gameContainerRef.current);
    }
  }, [playerPosition]);

  const addObstacle = (
    startX: number,
    startY: number,
    width: number,
    height: number,
    container: PIXI.Container
  ) => {
    console.log(tempGrid);
    // 1. Update the grid
    for (let x = startX - 1; x <= startX + width; x++) {
      for (let y = startY - 1; y <= startY + height; y++) {
        tempGrid.setWalkable(x, y, false);
      }
    }

    // 2. Draw the obstacle visually
    const obstacle = new PIXI.Graphics();
    obstacle.beginFill(0x000000, 1);
    obstacle.drawRect(
      startX * CELL_SIZE,
      startY * CELL_SIZE,
      width * CELL_SIZE,
      height * CELL_SIZE
    );
    obstacle.endFill();

    container.addChild(obstacle);
  };

  const drawGame = (gameContainer) => {
    gameContainer.removeChildren();

    addObstacle(30, 30, 2, 30, gameContainer);

    const outlineTiles = tempGrid.getReachableWithinRange(
      playerPosition.x,
      playerPosition.y,
      MOVEMENT_RANGE
    );

    console.log(outlineTiles);

    const movementOutline = new PIXI.Graphics();
    movementOutline.beginFill(0x90ee90, 0.3); // Light green fill
    movementOutline.lineStyle(1, 0x90ee90, 0.3); // Green outline

    for (const { x, y } of outlineTiles) {
      movementOutline.drawRect(
        x * CELL_SIZE,
        y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    }

    movementOutline.endFill();
    gameContainer.addChild(movementOutline);

    // Create invisible hit areas for movement
    const hitAreas = new PIXI.Container();

    for (const { x, y } of outlineTiles) {
      const hitArea = new PIXI.Graphics();

      // Make the hit area completely invisible
      hitArea.beginFill(0xffffff, 0);
      hitArea.drawCircle(
        x * CELL_SIZE + CELL_SIZE / 2,
        y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 1.5 // adjust radius to fine-tune the click zone
      );
      hitArea.endFill();

      hitArea.eventMode = 'static';
      hitArea.hitArea = new PIXI.Circle(
        x * CELL_SIZE + CELL_SIZE / 2,
        y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 1.5
      );

      hitArea.eventMode = 'static';
      hitArea.on('pointerdown', () => {
        setPlayerPosition({ x, y });
      });

      hitAreas.addChild(hitArea);
    }

    gameContainer.addChild(hitAreas);

    // Draw the player
    const player = new PIXI.Graphics();
    player.lineStyle(1, 0x0000ff, 1); // Add a blue border
    player.beginFill(0x0000ff, 0.7); // Semi-transparent blue fill
    player.drawCircle(
      playerPosition.x * CELL_SIZE + CELL_SIZE,
      playerPosition.y * CELL_SIZE + CELL_SIZE,
      PLAYER_SIZE
    );
    player.endFill();
    gameContainer.addChild(player);
  };

  return (
    <div
      style={{
        margin: 'auto',
        width: 'fit-content',
        height: 'fit-content',
        border: '1px solid black',
      }}
      ref={pixiContainer}
    />
  );
};

export default CombatGrid;
