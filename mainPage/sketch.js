let bgImage;
let difficulty;
let finalLocationLabel;
let mapImg;
let menuButton;
let menuBar;

let revealImages = [];
let labelImages = [];
let clickCount = 0;
const maxReveals = 12;

let LocationTriggerTester = false; // Toggle for Location Testing
let clickReady = true; // ensures one click at a time
let autoRevealCount = 0; // From localStorage

let scanButton, languageButton, exitButton;

let LungSelected = 2; //English Selected
let Subtitles_OnOf = true;
let LungMenuActive = false;

function preload() {
  bgImage = loadImage('../assets/mainPage/MainPage_BG.jpg');
  finalLocationLabel = loadImage('../assets/mainPage/Lower_Sighn.png');
  mapImg = loadImage('../assets/mainPage/Map.png');
  
  for (let i = 1; i <= maxReveals; i++) {
	revealImages.push(loadImage(`../assets/mainPage/locatioTrigger/T${i}.png`));
	labelImages.push(loadImage(`../assets/mainPage/finalWord/L${i}.png`));
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Get difficulty from localStorage
  difficulty = localStorage.getItem('selectedDifficulty');

  if (difficulty === 'Junior Hunt') {
    console.log('6 spots selected for Junior Hunt!');
    // TODO: Setup 6 spot logic here
  } else if (difficulty === 'Master Hunt') {
    console.log('12 spots selected for Master Hunt!');
    // TODO: Setup 12 spot logic here
  } else {
    console.log('No difficulty set. Defaulting...');
  }

  // === Menu Button (top center) ===
  menuW = width * 0.25;
  menuH = width * 0.15;
  menuButton = createImg('../assets/mainPage/Menu_BT.png', 'Menu Button');
  menuButton.size(menuW, menuH);
  menuButton.position(width / 2 - menuW / 2, height * 0.005);
  menuButton.mousePressed(menuButtonPressed);
  
  // === Menu Bar (top center) ===
  menuBarH = width * 0.21;
  menuBar = createImg('../assets/mainPage/MenuBar.png', 'Menu Bar');
  menuBar.size(width, menuBarH);
  menuBar.position(0, height * 0.005);
  menuBar.hide();
  
  // === Menu PopUp (top center) ===
  menuPopH = width * 0.21;
  menuPop = createImg('../assets/mainPage/MenuBar.png', 'Menu Bar');
  menuPop.size(width, menuBarH);
  menuPop.position(0, height * 0.005);
  menuPop.hide();
  
  let btnW = width * 0.23; // Width for each button
  let btnH = (128 / 225) * btnW; // Keep aspect ratio

  // === Language Button (center top) ===
  languageButton = createImg('../assets/mainPage/buttons/Language_BT.png', 'Language Button');
  languageButton.size(btnW, btnH);
  languageButton.position(width / 2 - btnW / 2, height * 0.015);
  languageButton.mousePressed(LunguageBT_Pressed);
  languageButton.hide();

  // === Scan Button (left of center) ===
  scanButton = createImg('../assets/mainPage/buttons/Scan_BT.png', 'Scan Button');
  scanButton.size(btnW, btnH);
  scanButton.position(width / 2 - btnW * 1.5 - 10, height * 0.015); // small gap between buttons
  scanButton.mousePressed(ScanBT_Pressed);
  scanButton.hide();

  // === Exit Button (right of center) ===
  exitButton = createImg('../assets/mainPage/buttons/Exit_BT.png', 'Exit Button');
  exitButton.size(btnW, btnH);
  exitButton.position(width / 2 + btnW * 0.5 + 10, height * 0.015);
  exitButton.mousePressed(ExitBT_Pressed);
  exitButton.hide();
  
  let LungBody_W = width * 0.7;
  let LungBody_H = width * 0.9;
  
  let LungBT_W = width * 0.6;
  let LungBT_H = width * 0.15;
  
  // === Lunguage Menu (top center) ===
  LungMenu_Body = createImg('../assets/mainPage/PopUpMenu.png', 'Lunguage Menu Body');
  LungMenu_Body.size(LungBody_W, LungBody_H);
  LungMenu_Body.position(width / 2 - LungBody_W / 2, height * 0.1);
  LungMenu_Body.hide();
  
  // === Lunguage Menu BT1 (top center) ===
  LungMenu_BT1 = createImg('../assets/mainPage/buttons/GR_D.png', 'Greek Button');
  LungMenu_BT1.size(LungBT_W, LungBT_H);
  LungMenu_BT1.position(width / 2 - LungBT_W / 2, height * 0.19);
  LungMenu_BT1.mousePressed(GreekSelected);
  LungMenu_BT1.hide();
  
  // === Lunguage Menu BT2 (top center) ===
  LungMenu_BT2 = createImg('../assets/mainPage/buttons/EN_A.png', 'English Button');
  LungMenu_BT2.size(LungBT_W, LungBT_H);
  LungMenu_BT2.position(width / 2 - LungBT_W / 2, height * 0.27);
  LungMenu_BT2.mousePressed(EnglishSelected);
  LungMenu_BT2.hide();
  
  // === Lunguage Menu BT3 (top center) ===
  LungMenu_BT3 = createImg('../assets/mainPage/buttons/OnBT.png', 'ON/OFF Button');
  LungMenu_BT3.size(LungBT_W, LungBT_H);
  LungMenu_BT3.position(width / 2 - LungBT_W / 2, height * 0.415);
  LungMenu_BT3.mousePressed(LunguageOnOf);
  LungMenu_BT3.hide();

  
  let mapW = width;
  let mapH = (mapImg.height / mapImg.width) * mapW;
  let mapY = height / 2 - mapH / 2;

  let labelW = width;
  let labelH = (finalLocationLabel.height / finalLocationLabel.width) * labelW;
  let labelY = height * 0.95 - labelH / 2;

  for (let i = 0; i < maxReveals; i++) {
    // T Images
    let tImg = createImg(`../assets/mainPage/locatioTrigger/T${i + 1}.png`);
    tImg.hide();
    tImg.size(mapW, mapH);
    tImg.position(0, mapY);
    tImg.style('position', 'absolute');
    tImg.style('z-index', '5');
    revealImages[i] = tImg;

    // L Images
    let lImg = createImg(`../assets/mainPage/finalWord/L${i + 1}.png`);
    lImg.hide();
    lImg.size(labelW, labelH);
    lImg.position(0, labelY);
    lImg.style('position', 'absolute');
    lImg.style('z-index', '6'); // above the T image
    labelImages[i] = lImg;
  }
  
  // === Auto-reveal from localStorage (READ ONLY) ===
  autoRevealCount = parseInt(localStorage.getItem("LocationsComplete")) || 0;

  for (let i = 0; i < autoRevealCount && i < maxReveals; i++) {
    revealImages[i].show();
    labelImages[i].show();
    console.log(`Auto-Revealed from saved progress: T${i + 1} and L${i + 1}`);
  }
  
  windowResized();
}

function draw() {
  image(bgImage, 0, 0, width, height);

  // === Centered MAP ===
  mapW = width;
  mapH = (mapImg.height / mapImg.width) * mapW;
  mapY = height / 2 - mapH / 2;
  image(mapImg, 0, mapY, mapW, mapH);

  // === Final Location Label (at 95% height, centered) ===
  labelW = width;
  labelH = (finalLocationLabel.height / finalLocationLabel.width) * labelW;
  labelY = height * 0.95 - labelH / 2;
  image(finalLocationLabel, 0, labelY, labelW, labelH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Reposition menu button
  menuW = width * 0.25;
  menuH = width * 0.15;
  menuButton.size(menuW, menuH);
  menuButton.position(width / 2 - menuW / 2, height * 0.005);
  
  mapW = width;
  mapH = (mapImg.height / mapImg.width) * mapW;
  mapY = height / 2 - mapH / 2;

  labelW = width;
  labelH = (finalLocationLabel.height / finalLocationLabel.width) * labelW;
  labelY = height * 0.95 - labelH / 2;

  for (let i = 0; i < revealImages.length; i++) {
    revealImages[i].size(mapW, mapH);
    revealImages[i].position(0, mapY);

    labelImages[i].size(labelW, labelH);
    labelImages[i].position(0, labelY);
  }
  
  let btnW = width * 0.23;
  let btnH = (128 / 225) * btnW;

  languageButton.size(btnW, btnH);
  languageButton.position(width / 2 - btnW / 2, height * 0.015);

  scanButton.size(btnW, btnH);
  scanButton.position(width / 2 - btnW * 1.5 - 10, height * 0.015);

  exitButton.size(btnW, btnH);
  exitButton.position(width / 2 + btnW * 0.5 + 10, height * 0.015);


}

function mousePressed() {
  // === Handle menu closing ===
  if (menuBar.elt.style.display !== 'none') {
    let isOverScan = isMouseOver(scanButton);
    let isOverLang = isMouseOver(languageButton);
    let isOverExit = isMouseOver(exitButton);

    if (!isOverScan && !isOverLang && !isOverExit) {
      hideMenuBar();
      return;
    }
  }

  // === Handle language menu closing ===
  if (LungMenu_Body.elt.style.display !== 'none') {
    let isOverGreek = isMouseOver(LungMenu_BT1);
    let isOverEnglish = isMouseOver(LungMenu_BT2);
    let isOverOnOff = isMouseOver(LungMenu_BT3);

    if (!isOverGreek && !isOverEnglish && !isOverOnOff && LungMenuActive == true) {
      hideLungMenu();
	  LungMenuActive = false;
      return;
    }
  }

  // === Handle location trigger ===
  if (!LocationTriggerTester || !clickReady) return;

  if (clickCount < maxReveals) {
    clickReady = false;

    revealImages[clickCount].show();
    labelImages[clickCount].show();

    console.log(`Revealed T${clickCount + 1} and L${clickCount + 1}`);
    clickCount++;

    setTimeout(() => {
      clickReady = true;
    }, 200);
  } else {
    console.log("All images revealed!");
  }
}

function isMouseOver(button) {
  let x = button.position().x;
  let y = button.position().y;
  let w = button.width;
  let h = button.height;
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}


function menuButtonPressed() {
  console.log('Menu button pressed!');
  menuButton.hide();
  menuBar.show();
  
  scanButton.show();
  languageButton.show();
  exitButton.show();
}

function hideMenuBar() {
  menuBar.hide();
  scanButton.hide();
  languageButton.hide();
  exitButton.hide();
  menuButton.show();
}

function hideLungMenu() {
	LungMenu_Body.hide();
	LungMenu_BT1.hide();
	LungMenu_BT2.hide();
	LungMenu_BT3.hide();
}

function ScanBT_Pressed() {
	console.log('Scan button pressed');
	
	scanButton.attribute('src', '../assets/mainPage/buttons/Scan_Pressed.png');
	setTimeout(() => {
		scanButton.attribute('src', '../assets/mainPage/buttons/Scan_BT.png');
	}, 400);
	
	setTimeout(function () {
			window.location.href = "../AR_Code/index.html"; //Sent to Scan Page 
	}, 700);
}

function LunguageBT_Pressed() {
	console.log('Language button pressed');
	
	languageButton.attribute('src', '../assets/mainPage/buttons/Language_Pressed.png');
	setTimeout(() => {
		languageButton.attribute('src', '../assets/mainPage/buttons/Language_BT.png');
	}, 400);
	
	LungMenu_Body.show();
	LungMenu_BT1.show();
	LungMenu_BT2.show();
	LungMenu_BT3.show();
	
	setTimeout(() => {
		LungMenuActive = true;
	}, 400);
}

function GreekSelected() {
	console.log('Greek Subtitles Selected');
	
	if (LungSelected == 2) {
		LungMenu_BT1.attribute('src', '../assets/mainPage/buttons/GR_A.png');
		LungMenu_BT2.attribute('src', '../assets/mainPage/buttons/EN_D.png');
		LungSelected = 1;
	} 
}

function EnglishSelected() {
	console.log('English Subtitles Selected');
	
	if (LungSelected == 1) {
		LungMenu_BT1.attribute('src', '../assets/mainPage/buttons/GR_D.png');
		LungMenu_BT2.attribute('src', '../assets/mainPage/buttons/EN_A.png');
		LungSelected = 2;
	}
}

function LunguageOnOf() {
	console.log('Subtitles:');
	
	if (Subtitles_OnOf == true) {
		console.log('Off');
		LungMenu_BT3.attribute('src', '../assets/mainPage/buttons/OffBT.png');
		Subtitles_OnOf = false;
	} else {
		console.log('On');
		LungMenu_BT3.attribute('src', '../assets/mainPage/buttons/OnBT.png');
		Subtitles_OnOf = true;
	}
}

function ExitBT_Pressed() {
	console.log('Exit button pressed — returning to Welcome Page');
	
	exitButton.attribute('src', '../assets/mainPage/buttons/Exit_Pressed.png');
	setTimeout(() => {
		exitButton.attribute('src', '../assets/mainPage/buttons/Exit_BT.png');
	}, 400);
	
	setTimeout(() => {
		window.location.href = '../index.html';
	}, 600);
}