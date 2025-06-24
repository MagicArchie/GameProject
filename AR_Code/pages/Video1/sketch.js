let bgImage;
let video;
let titleText = "1. Αγιος Γεώργιος - Παλιό Φρούριο";
let msg;

let landscapeW, landscapeH;
let ContinueBT, ReturnBT;

let rotateWarningImg;

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
let selectedLanguageOnOf = localStorage.getItem('selectedLanguageOnOf') || 'on'; //Default to ON


function preload() {
  bgImage = loadImage('../../../assets/mainPage/MainPage_BG.jpg');
  rotateWarningImg = loadImage('../../../assets/RotateIMG.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Lock logic to landscape orientation
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);

  setupUI();
}

function draw() {
	// Always update to current orientation
    landscapeW = max(windowWidth, windowHeight);
    landscapeH = min(windowWidth, windowHeight);
  
   if (windowWidth < windowHeight) {
    // Portrait mode: show warning
    background(0);

    let warningSize = min(width, height) * 0.4;
    imageMode(CENTER);
    image(rotateWarningImg, width / 2, height / 2.5, warningSize, warningSize);

    fill(255);
    textAlign(CENTER, TOP);
    textSize(landscapeW * 0.03);
    if (selectedLanguage === 'gr') {
		// Show Greek text
		msg = "Παρακαλώ κρατήστε τη συσκευή οριζόντια";
	} else {
		// Show English text
		msg = "Please hold your device horizontally";
    }
    let textBoxWidth = width * 0.8; // 80% of screen width
    text(msg, width / 2 - textBoxWidth / 2, height / 2 + warningSize / 2 - height * 0.03, textBoxWidth);

    // === Hide interactive elements ===
    video.hide();
    ContinueBT.hide();
    ReturnBT.hide();

    return; // Skip rest of draw
  }
  
  //Show elements again if landscape
  video.show();
  ContinueBT.show();
  ReturnBT.show();
  
  imageMode(CORNER); //Important reset
  image(bgImage, 0, 0, landscapeW, landscapeH);

  // === Title at top center ===
  fill(0);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  textSize(landscapeW * 0.04);
  text(titleText, landscapeW / 2, landscapeH * 0.05);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);
  styleUI();
}

function setupUI() {
  // === Video Setup ===
  video = createVideo(['../../../assets/videos/Video1.mp4']);
  video.attribute('controls', true);
  video.show();

  // === Continue Button
  ContinueBT = createImg('../../../assets/videoPage/VideoButton_Continue.png', 'Continue Button');
  ContinueBT.mousePressed(ContinuePressed);

  // === Return Button
  ReturnBT = createImg('../../../assets/videoPage/VideoButton_Return.png', 'Return Button');
  ReturnBT.mousePressed(RetuenPressed);

  styleUI();
}

function styleUI() {
  // === Resize and position video ===
  let videoW = landscapeW * 0.7;
  let videoH = videoW * 9 / 16;
  video.size(videoW, videoH);
  video.position((windowWidth - videoW) / 2, (windowHeight - videoH) * 0.85);

  // === Buttons Size ===
  let VideoBT_WH = landscapeW * 0.08;
  ContinueBT.size(VideoBT_WH, VideoBT_WH);
  ContinueBT.position(windowWidth - VideoBT_WH - windowWidth * 0.02, windowHeight / 2 - VideoBT_WH / 2);

  ReturnBT.size(VideoBT_WH, VideoBT_WH);
  ReturnBT.position(windowWidth * 0.02, windowHeight / 2 - VideoBT_WH / 2);
}

function ContinuePressed() {
  ContinueBT.attribute('src', '../../../assets/videoPage/VideoButton_Continue Pressed.png');
  setTimeout(() => {
    ContinueBT.attribute('src', '../../../assets/videoPage/VideoButton_Continue.png');
  }, 400);

  setTimeout(() => {
    localStorage.setItem("lastPage", "Video1");
    window.location.href = "../QuizPage/index.html";
  }, 600);
}

function RetuenPressed() {
  ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return Pressed.png');
  setTimeout(() => {
    ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return.png');
  }, 400);

  setTimeout(() => {
    window.location.href = "../../../mainPage/game.html";
  }, 600);
}
