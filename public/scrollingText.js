import $ from 'jquery';
import anime from 'animejs';

let textQueue = [];
let currentAnimation = null;
let skippedAnimation = false;

// Function to add text to the queue
function enqueueText(line, regLine) {
  textQueue.push([line, regLine]);
}
// Function to remove text from the queue and process it
function dequeueAndAnimateText(delay) {
  if (textQueue.length > 0) {
    let line = textQueue.shift(); // Remove the first line from the queue
    // if (line[1].includes("gear you've just acquired")) {
    //   player.getInv().forEach((value, key, map) => {
    //     alertPlayer(
    //       value.name + ' has been added to your inventory.',
    //       3000,
    //       23
    //     );
    //   });
    // }
    animateTextLine(line[0], line[1]).then(() => {
      if (skippedAnimation) {
        dequeueAndAnimateText(delay);
        return;
      }
      setTimeout(() => {
        // Wait for the specified delay before processing the next line
        dequeueAndAnimateText(delay); // Handle the next line recursively
      }, delay);
    });
  } else {
    endOfDialogue();
  }
}
function animateTextLine(line, regLine) {
  return new Promise((resolve) => {
    $('body').one('click', skipCurrentAnimation); // Using .one() to automatically remove the listener after it fires once
    skippedAnimation = false;

    let lineElement = $('<span class="fade-in-text"></span>')
      .html(line)
      .appendTo('#canvas-text');
    currentAnimation = anime.timeline({ loop: false }).add({
      targets: '.fade-in-text .paperWord',
      opacity: [0, 1],
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeInOutQuad',
      complete: function () {
        $('body').off('click');
        lineElement.replaceWith(
          `<span class="faded-in-text">${regLine}</span>`
        );
        let paperCanvas = $('#paper-canvas');
        paperCanvas.scrollTop(paperCanvas.prop('scrollHeight'));
        // isAnimationRunning = false;
        resolve();
      },
    });
  });
}
function skipCurrentAnimation() {
  currentAnimation.seek(currentAnimation.duration);
  skippedAnimation = true;
}
function endOfDialogue() {
  $('#canvas-text').append(
    '<div id="paper-continue-prompt" class="flashing-text" style="float: right; margin-top: 10px; cursor: pointer; animation: flashText 2s ease-in-out infinite;">Click anywhere to continue...</div>'
  );
  $('#canvas-text').append(
    '<div id="paper-continue-padding" style="height: 30px; opacity: 1;"></div>'
  );
  $('body').one('click', function () {
    // Using .one() to automatically remove the listener after it fires once
    startGame();
    console.log('TESTING TESTING 123');
  });
}

export function buildPaper(text) {
  setupPCanvas();

  const paperCanvas = $('#paper-canvas');
  const totalWidth = paperCanvas.width(); // Get the total width of the container
  const padding =
    parseInt(paperCanvas.css('padding-left')) +
    parseInt(paperCanvas.css('padding-right') + 20);
  // console.log(padding);
  // console.log(totalWidth);
  const canvasWidth = paperCanvas.width() - padding; // Getting the width of the container
  // console.log(canvasWidth);
  // console.log(paperInfo);
  let tempText = text;

  let words = text.split(' ');
  let tempLine = '';
  let tempLineReg = '';

  // Compute where to split the text into lines
  words.forEach((word) => {
    let testLine = tempLine + word + ' ';
    let testLineReg = tempLineReg + word + ' ';
    // measurer.html(testLine);

    if (/[.!?]$/.test(word)) {
      let linebreak = '';
      if (word.includes('\\n')) {
        word = word.replace('\\n', '');
        linebreak = '<br><br>';
      }
      tempLine += '<span class="paperWord">' + word + '</span> ' + linebreak;
      tempLineReg += word + ' ' + linebreak;
      enqueueText(tempLine, tempLineReg); // Send formatted HTML and regular text
      tempLine = '';
      tempLineReg = '';
    } else {
      tempLine += '<span class="paperWord">' + word + '</span> ';
      tempLineReg += word + ' ';
    }
    // console
  });

  // Add any remaining text
  if (tempLine) {
    enqueueText(tempLine.trim(), tempLineReg.trim());
  }

  // measurer.remove(); // Remove the measurer element

  // Start processing the queue
  dequeueAndAnimateText(1000);

  // textElement.appendTo($('#canvas-text'));

  // addLetter(); // Start the loop
  // drawPCanvas();
}
function setupPCanvas() {
  let canvas = document.getElementById('paper-canvas');
  canvas.style.display = 'block';
  canvas.style.background = '#efe297';

  //   let myCanvas = createCanvas(600,800);
  //   myCanvas.parent('canvas-container');

  //   colorMode(HSB, 100);
  //   frameRate(5);
  //   noLoop();
}
function drawPCanvas() {
  background(17, 20, 100);
  // createTexture();
  createFibers();
}
function createPFibers() {
  let numFibers = 30000;
  for (let i = 0; i < numFibers; i++) {
    let x1 = random() * width;
    let y1 = random() * height;
    let theta = random() * 2 * Math.PI;
    let segmentLength = random() * 5 + 2;
    let x2 = cos(theta) * segmentLength + x1;
    let y2 = sin(theta) * segmentLength + y1;
    stroke(15, 10 - random() * 5, 100 - random() * 8, random() * 10 + 75);
    line(x1, y1, x2, y2);
  }
  console.log('created fibers');
}
function clearCanvas() {
  document.getElementById('canvas-text').innerHTML = '';
  document.getElementById('paper-canvas').style.display = 'none';
  document.getElementById('full-body-cover').style.display = 'none';
}
