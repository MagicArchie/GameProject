// Retrieve the stored DifficultySL value from localStorage
const DifficultySL = localStorage.getItem('DifficultySL');

let backgroundImage1, backgroundImage2;
let BT_H;
let BT_W1, BT_W2;

let OneUse = false;

function preload() {
  
  BackgroundIMG = loadImage('materials/images/ItemBackground.png');
  
  //backgroundMS = loadSound('materials/sounds/horrorBGM.mp3');
  BT_Press = loadSound('materials/sounds/Button.mp3');
  ItemFound = loadSound('materials/sounds/ItemFound.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  BT_H = height * 0.05;
  
  BT_W1 = width * 0.3;
  BT_W2 = width * 0.4;
  
  ChoiceBT1 = createImg('materials/images/buttons/Choice1_BT.png', 'Select Choice 1');
  ChoiceBT1.size(BT_W1, BT_H);
  ChoiceBT1.position(width / 2 - BT_W1 / 2, height * 0.78);
  ChoiceBT1.mousePressed(Choice1);
  //ChoiceBT1.hide();
  
  ChoiceBT2 = createImg('materials/images/buttons/Choice2_BT.png', 'Select Choice 2');
  ChoiceBT2.size(BT_W2, BT_H);
  ChoiceBT2.position(width / 2 - BT_W2 / 2, height * 0.845);
  ChoiceBT2.mousePressed(Choice2);
  //ChoiceBT2.hide();
  
  EndingIMG = createImg('materials/images/Ending1_PM.png', 'Ending Image');
  EndingIMG.size(width, height);
  EndingIMG.position(0, 0);
  //EndingIMG.mousePressed();
  EndingIMG.hide();
  
  ToBeContinued = createImg('materials/images/ToBeContinued_PM.png', 'Ending Image');
  ToBeContinued.size(width, height);
  ToBeContinued.position(0, 0);
  //ToBeContinued.mousePressed();
  ToBeContinued.hide();
  
  // Check if the value exists
  if (DifficultySL) {
    console.log('Difficulty Level Selected:', DifficultySL);

    // You can use the value as needed
    if (DifficultySL == 1) {
        console.log('Crazy Difficulty selected.');
    } else if (DifficultySL == 2) {
        console.log('Insane Difficulty selected.');
    } else if (DifficultySL == 3) {
        console.log('Lunatic Difficulty selected.');
    }
  } else {
    console.log('No difficulty level selected.');
  }

  //...
  
  //backgroundMS.loop();
  
  windowResized();
}

function draw() {
	
  if (OneUse == false) {
	ItemFound.play();  
	OneUse = true;
  }
  
  if (displayHeight < 700) {
    image(BackgroundIMG, 0, 0, width, height);
  }else{
    image(BackgroundIMG, 0, 0, width, height);
  }
  
  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Dynamically adjust button heights and widths
  BT_H = height * 0.05; // Adjust button height
  BT_W1 = width * 0.3;  // Adjust button 1 width
  BT_W2 = width * 0.4;  // Adjust button 2 width

  // Reposition buttons dynamically to remain centered
  ChoiceBT1.size(BT_W1, BT_H);
  ChoiceBT1.position(width / 2 - BT_W1 / 2, height * 0.78);

  ChoiceBT2.size(BT_W2, BT_H);
  ChoiceBT2.position(width / 2 - BT_W2 / 2, height * 0.845);
  
  EndingIMG.size(width, height);
  EndingIMG.position(0, 0);
  
  ToBeContinued.size(width, height);
  ToBeContinued.position(0, 0);
  
  // Ensure background image scales correctly
  image(BackgroundIMG, 0, 0, width, height);
}

function Choice1() {
	BT_Press.play();
	
	localStorage.setItem('Choice1', true);
	localStorage.setItem('Choice2', false);
	ChoiceBT1.attribute("src", "materials/images/buttons/Choice1_BT_Pressed.png");
	setTimeout(function () {
		ChoiceBT1.attribute("src", "materials/images/buttons/Choice1_BT.png");
    }, 400);
	setTimeout(function () {
		//window.location.href = "../../../index.html";
		
		//To be Continued
		console.log("To be Continued")
		ToBeContinued.show();
		
    }, 1000);
}

function Choice2() {
	BT_Press.play();
	
	localStorage.setItem('Choice2', true);
	localStorage.setItem('Choice1', false);
	ChoiceBT2.attribute("src", "materials/images/buttons/Choice2_BT_Pressed.png");
	setTimeout(function () {
		ChoiceBT2.attribute("src", "materials/images/buttons/Choice2_BT.png");
    }, 400);
	setTimeout(function () {
		//Ending 1
		console.log("Ending 1")
		showEndingScreen();
    }, 1000);
}

function showEndingScreen() {
    EndingIMG.show();
}

let fullscreenActivated = true; //change back to false =================================000

function mousePressed() {
  if (!fullscreenActivated && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
    fullscreenActivated = true; // Mark as activated
  }
}
