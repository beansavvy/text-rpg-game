useEffect(() => {
  const canvas = document.getElementById('bookCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  const scaleX = 2.5;
  const scaleY = 2;
  const leftPages = 5;
  const rightPages = 5;

  const drawBook = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bookWidth = 300 * scaleX;
    const bookHeight = 300 * scaleY;
    const coverWidth = bookWidth / 2;
    const coverHeight = bookHeight;
    const pageWidth = coverWidth - 20;
    const pageHeight = coverHeight - 20;
    const pageOffset = 3;
    let pageIndex = 0;

    const drawCover = (x: number, y: number, width: number, height: number) => {
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const drawPage = (
      x: number,
      y: number,
      width: number,
      height: number,
      offset: number
    ) => {
      ctx.fillStyle = '#FFFACD';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.lineTo(x + width, y + height);
      ctx.quadraticCurveTo(x + width / 2, y + height - offset, x, y + height);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#D0CA92';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Draw left cover
    drawCover(50, 50, coverWidth, coverHeight);

    // Draw right cover
    drawCover(50 + coverWidth, 50, coverWidth, coverHeight);

    // Draw left pages
    for (let i = 0; i < leftPages; i++) {
      drawPage(
        60 + i * pageOffset,
        60 + pageOffset,
        pageWidth - i * pageOffset,
        pageHeight,
        i * pageOffset + 10
      );
    }

    // Draw right pages
    for (let i = 0; i < rightPages; i++) {
      drawPage(
        60 + coverWidth + i * pageOffset,
        60 + i * pageOffset,
        pageWidth - i * pageOffset,
        pageHeight - i * pageOffset,
        pageOffset
      );
    }
  };

  drawBook();
}, []);
