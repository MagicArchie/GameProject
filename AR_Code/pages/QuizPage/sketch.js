let bgImage;
let questionText = "";
let answers = [];

let landscapeW, landscapeH;
let answerButtons = [];
let buttonRects = [];

let correctAnswerIndex = -1;

let correctSound, wrongSound;
let ReturnBT;

let clickedIndex = -1;
let highlightTimer = 0;

function preload() {
  bgImage = loadImage('../../../assets/mainPage/MainPage_BG.jpg');

  // correctSound = loadSound('../../../assets/sounds/correct.mp3');
  // wrongSound = loadSound('../../../assets/sounds/wrong.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);

  setupContentBasedOnPreviousPage();
  setupUI();

  let VideoBT_WH = width * 0.1;

  // === Return Button ===
  ReturnBT = createImg('../../../assets/videoPage/VideoButton_Return.png', 'Return Button');
  ReturnBT.size(VideoBT_WH, VideoBT_WH);
  ReturnBT.position(width * 0.02, height - VideoBT_WH - height * 0.05);
  ReturnBT.mousePressed(RetuenPressed);
}

function draw() {
  image(bgImage, 0, 0, landscapeW, landscapeH);

  // === Draw question (no stroke) ===
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(landscapeW * 0.035);
  textStyle(BOLD);

  let textBoxWidth = landscapeW * 0.8;
  text(questionText, (landscapeW - textBoxWidth) / 2, landscapeH * 0.09, textBoxWidth);

  // === Draw answer backgrounds with highlight ===
  for (let i = 0; i < buttonRects.length; i++) {
    let b = buttonRects[i];
    stroke('#5c4033');       // Dark brown stroke
    strokeWeight(4);

    // Highlight if clicked
    if (i === clickedIndex && millis() - highlightTimer < 300) {
      fill('#d6c19a'); // Darker beige
    } else {
      fill('#ebd9b7'); // Normal beige
    }

    rect(b.x, b.y, b.w, b.h, 15); // Rounded corners
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);
  styleUI();
}

function setupContentBasedOnPreviousPage() {
  const lastPage = localStorage.getItem("lastPage");

  if (lastPage === "Video1") {
    questionText = "Ποιο είναι το ιδιαίτερο χαρακτηριστικό της αρχιτεκτονικής του ναού;";
    answers = [
      "Είναι χτισμένος σε βυζαντινό ρυθμό.",
      "Ανήκει στον Γεωργιανό ρυθμό.", // correct
      "Έχει γοτθικά στοιχεία."
    ];
    correctAnswerIndex = 1;
  } else if (lastPage === "mapPage") {
    questionText = "What did the map show;";
    answers = ["Hidden Locations", "Alien Bases"];
    correctAnswerIndex = 0;
  } else {
    questionText = "ERROR";
    answers = ["Option A", "Option B"];
    correctAnswerIndex = 0;
  }
}

function setupUI() {
  for (let i = 0; i < answers.length; i++) {
    let btn = createButton(answers[i]);
    btn.mousePressed(() => onAnswerSelected(i));
    btn.style('font-size', '1.8vw');
    btn.style('padding', '1vh 3vw');
    btn.style('border-radius', '12px');
    btn.style('background', 'transparent'); // Button over canvas-styled box
    btn.style('border', 'none');
    btn.style('z-index', '10');
    answerButtons.push(btn);
  }

  styleUI();
}

function styleUI() {
  const btnW = landscapeW * 0.5;
  const btnH = landscapeH * 0.1;

  buttonRects = [];

  for (let i = 0; i < answerButtons.length; i++) {
    const btn = answerButtons[i];
    const x = (windowWidth - btnW) / 2;
    const y = landscapeH * 0.35 + i * (btnH + landscapeH * 0.06);

    btn.size(btnW, btnH);
    btn.position(x, y);

    buttonRects.push({ x, y, w: btnW, h: btnH });
  }
}

function onAnswerSelected(index) {
  clickedIndex = index;
  highlightTimer = millis();

  if (index === correctAnswerIndex) {
    console.log("Correct answer!");
    // correctSound.play();
	localStorage.setItem("LocationsComplete", "1");
    setTimeout(() => {
      window.location.href = "../../../mainPage/game.html"; // Adjust as needed
    }, 1000); // Matches 1-second highlight duration
  } else {
    console.log("Wrong answer.");
    // wrongSound.play();
    // No redirect
  }
}

function RetuenPressed() {
  ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return Pressed.png');
  setTimeout(() => {
    ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return.png');
  }, 400);

  setTimeout(() => {
    window.location.href = "../Video1/index.html";
  }, 600);
}
