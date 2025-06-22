let bgImage;
let questionText = "";
let answers = [];

let landscapeW, landscapeH;

function preload() {
  bgImage = loadImage('../../../assets/mainPage/MainPage_BG.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);

  setupContentBasedOnPreviousPage();
  setupUI();
}

function draw() {
  image(bgImage, 0, 0, landscapeW, landscapeH);

  // Question at top center
  fill(255);
  textAlign(CENTER, TOP);
  textSize(landscapeW * 0.04);
  textStyle(BOLD);
  text(questionText, landscapeW / 2, landscapeH * 0.05);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);
  styleUI();
}

// === Step 1: Set question/answers based on previous page ===
function setupContentBasedOnPreviousPage() {
  const lastPage = localStorage.getItem("lastPage");

  if (lastPage === "video1") {
    questionText = "What was the topic of the video?";
    answers = ["Healthy Lungs", "Planet Earth"];
  } else if (lastPage === "mapPage") {
    questionText = "What did the map show?";
    answers = ["Hidden Locations", "Alien Bases"];
  } else {
    questionText = "Default Question: What did you see?";
    answers = ["Option A", "Option B"];
  }
}

// === Step 2: Setup buttons ===
let answerButtons = [];

function setupUI() {
  for (let i = 0; i < 2; i++) {
    let btn = createButton(answers[i]);
    btn.mousePressed(() => onAnswerSelected(i));
    btn.style('font-size', '1.8vw');
    btn.style('padding', '1vh 3vw');
    btn.style('border-radius', '12px');
    btn.style('background', '#ffffffdd');
    btn.style('border', 'none');
    answerButtons.push(btn);
  }

  styleUI();
}

function styleUI() {
  const btnW = landscapeW * 0.4;
  const btnH = landscapeH * 0.1;

  for (let i = 0; i < answerButtons.length; i++) {
    const btn = answerButtons[i];
    btn.size(btnW, btnH);
    btn.position(
      (windowWidth - btnW) / 2,
      landscapeH * 0.35 + i * (btnH + landscapeH * 0.08)
    );
  }
}

function onAnswerSelected(index) {
  console.log("Answer selected:", answers[index]);
  // Do something (e.g., go to next page)
  window.location.href = "../nextPage/index.html"; // replace as needed
}
