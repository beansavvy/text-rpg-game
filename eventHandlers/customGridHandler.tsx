type Cell = {
  x: number;
  y: number;
  walkable: boolean;
};

type Node = {
  x: number;
  y: number;
  g: number;
  f: number;
  cameFrom?: Node;
};

export class customGrid {
  width: number;
  height: number;
  grid: Cell[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < width; x++) {
        row.push({ x, y, walkable: true });
      }
      this.grid.push(row);
    }
  }

  setWalkable(x: number, y: number, walkable: boolean) {
    if (this.inBounds(x, y)) {
      this.grid[y][x].walkable = walkable;
    }
  }

  isWalkable(x: number, y: number): boolean {
    return this.inBounds(x, y) && this.grid[y][x].walkable;
  }

  inBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  getNeighbors(x: number, y: number): Cell[] {
    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0], // cardinal
    ];

    // const dirs = [
    //   [0, -1],
    //   [1, 0],
    //   [0, 1],
    //   [-1, 0], // cardinal directions
    //   [-1, -1],
    //   [1, -1],
    //   [1, 1],
    //   [-1, 1], // diagonal directions
    // ];

    const neighbors: Cell[] = [];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (this.isWalkable(nx, ny)) {
        neighbors.push(this.grid[ny][nx]);
      }
    }

    return neighbors;
  }

  findPath(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): { x: number; y: number }[] {
    const openSet: Node[] = [
      {
        x: startX,
        y: startY,
        g: 0,
        f: this.heuristic(startX, startY, endX, endY),
      },
    ];
    const closedSet = new Set<string>();

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      const key = `${current.x},${current.y}`;
      if (closedSet.has(key)) continue;
      closedSet.add(key);

      if (current.x === endX && current.y === endY) {
        return this.reconstructPath(current);
      }

      for (const neighbor of this.getNeighbors(current.x, current.y)) {
        const g = current.g + 1;
        const f = g + this.heuristic(neighbor.x, neighbor.y, endX, endY);

        openSet.push({
          x: neighbor.x,
          y: neighbor.y,
          g,
          f,
          cameFrom: current,
        });
      }
    }

    return []; // No path found
  }

  private heuristic(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2); // Manhattan distance
  }

  private reconstructPath(node: Node): { x: number; y: number }[] {
    const path: { x: number; y: number }[] = [];
    let current: Node | undefined = node;
    while (current) {
      path.push({ x: current.x, y: current.y });
      current = current.cameFrom;
    }
    return path.reverse();
  }

  // Non-euclidean range
  getReachableWithinRange(
    startX: number,
    startY: number,
    range: number
  ): { x: number; y: number }[] {
    const visited = new Set<string>();
    const frontier: { x: number; y: number; distance: number }[] = [
      { x: startX, y: startY, distance: 0 },
    ];
    const result: { x: number; y: number }[] = [];

    while (frontier.length > 0) {
      const { x, y, distance } = frontier.shift()!;
      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);

      if (distance > range) continue;

      result.push({ x, y });

      for (const neighbor of this.getNeighbors(x, y)) {
        const neighborKey = `${neighbor.x},${neighbor.y}`;
        if (!visited.has(neighborKey)) {
          frontier.push({
            x: neighbor.x,
            y: neighbor.y,
            distance: distance + 1,
          });
        }
      }
    }

    return result;
  }

  // // Euclidean range
  // getReachableWithinRange(
  //   startX: number,
  //   startY: number,
  //   range: number
  // ): { x: number; y: number }[] {
  //   const visited = new Set<string>();
  //   const frontier: { x: number; y: number }[] = [{ x: startX, y: startY }];
  //   const result: { x: number; y: number }[] = [];

  //   while (frontier.length > 0) {
  //     const { x, y } = frontier.shift()!;
  //     const key = `${x},${y}`;
  //     if (visited.has(key)) continue;
  //     visited.add(key);

  //     const dx = x - startX;
  //     const dy = y - startY;
  //     const euclideanDistance = Math.floor(Math.sqrt(dx * dx + dy * dy));
  //     if (euclideanDistance > range) continue;

  //     result.push({ x, y });

  //     for (const neighbor of this.getNeighbors(x, y)) {
  //       const neighborKey = `${neighbor.x},${neighbor.y}`;
  //       if (!visited.has(neighborKey)) {
  //         frontier.push({ x: neighbor.x, y: neighbor.y });
  //       }
  //     }
  //   }

  //   return result;
  // }
}
