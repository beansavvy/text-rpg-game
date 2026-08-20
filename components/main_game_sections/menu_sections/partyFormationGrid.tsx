import React, { useRef, useEffect, useState } from 'react';
import { useGameContext } from '@context/GameContext';
import * as PIXI from 'pixi.js';

const GRID_WIDTH = 75;
const GRID_HEIGHT = 75;
const CELL_SIZE = 5; // Pixel size of each cell
const MOVEMENT_RANGE = 15; // Movement range in cells

const PartyFormationGrid = ({ onFormationUpdate }: any) => {
  const { party } = useGameContext();
  const pixiContainer = useRef(null);
  const appRef = useRef(null);
  const gameContainerRef = useRef<PIXI.Container | null>(null);
  const [memberPositions, setMemberPositions] = useState([]);

  // Function to update member positions
  const updateMemberPositions = () => {
    if (party?.members?.length > 0) {
      const updatedPositions = party.members.map((member) => ({
        id: member.id,
        x: member.position?.x ?? Math.floor(GRID_WIDTH / 2), // Fallback to center if undefined
        y: member.position?.y ?? Math.floor(GRID_HEIGHT / 2),
      }));
      setMemberPositions(updatedPositions);
    }
  };

  // Force update member positions on initial render and when `party` changes
  useEffect(() => {
    updateMemberPositions();
  });

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
        });

        if (isAppValid && pixiContainer.current) {
          pixiContainer.current.appendChild(pixiApp.view);
          appRef.current = pixiApp;

          const gameContainer = new PIXI.Container();
          gameContainerRef.current = gameContainer;
          pixiApp.stage.addChild(gameContainer);
          drawGame(gameContainer);
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
      updateMemberPositions();
      drawGame(gameContainerRef.current);
    }
  }, [memberPositions]);

  const drawGame = (gameContainer) => {
    gameContainer.removeChildren();

    console.log('ATTEMPTING TO DRAW GAME!!!! ', memberPositions);
    // Draw each member's position
    memberPositions.forEach((member) => {
      console.log(
        'DRAWING ' + member.id + ' CIRCLE AT ' + member.x + ', ' + member.y
      );
      const player = new PIXI.Graphics();
      player.lineStyle(1, 0x0000ff, 1); // Add a blue border
      player.beginFill(0x0000ff, 0.7); // Semi-transparent blue fill
      player.drawCircle(
        member.x * CELL_SIZE + CELL_SIZE / 2,
        member.y * CELL_SIZE + CELL_SIZE / 2,
        2
      );
      player.endFill();
      gameContainer.addChild(player);
    });
  };

  return <div ref={pixiContainer} />;
};

export default PartyFormationGrid;
