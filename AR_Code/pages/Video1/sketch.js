let bgImage;
let video;
let titleText = "1. Αγιος Γεώργιος - Παλιό Φρούριο";

let landscapeW, landscapeH;

function preload() {
  bgImage = loadImage('../../../assets/mainPage/MainPage_BG.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Lock logic to landscape orientation
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);

  setupUI();
  
  let VideoBT_WH = width * 0.1;
  
  // === Continue Button
  ContinueBT = createImg('../../../assets/videoPage/VideoButton_Continue.png', 'Continue Button');
  ContinueBT.size(VideoBT_WH, VideoBT_WH);
  ContinueBT.position(width - VideoBT_WH - width * 0.02, height / 2 - VideoBT_WH / 2);
  ContinueBT.mousePressed(ContinuePressed);
  
  // === Return Button
  ReturnBT = createImg('../../../assets/videoPage/VideoButton_Return.png', 'Return Button');
  ReturnBT.size(VideoBT_WH, VideoBT_WH);
  ReturnBT.position(0 + width * 0.02, height / 2 - VideoBT_WH / 2);
  ReturnBT.mousePressed(RetuenPressed);
}

function draw() {
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

  styleUI();
}

function styleUI() {
  let videoW = landscapeW * 0.7;
  let videoH = videoW * 9 / 16;
  video.size(videoW, videoH);
  video.position((windowWidth - videoW) / 2, (windowHeight - videoH) * 0.9);
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
