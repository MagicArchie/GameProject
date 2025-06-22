// Retrieve the stored DifficultySL value from localStorage
const DifficultySL = localStorage.getItem('DifficultySL');

// Retrieve the stored DifficultySL value from localStorage
const TotorialComplete_C  = localStorage.getItem('TotorialComplete_MiniGame1');
let TotorialComplete = false;

let bgImage;

let OneUse = false;
let OneUse2 = false;
let OneUse3 = false;

let FinalBT_WH;
let Final_X, Final_Y;
let BarBT_W, BarBT_H;
let BarBT1_X, BarBT1_Y, BarBT2_X, BarBT2_Y, BarBT3_X, BarBT3_Y, BarBT4_X, BarBT4_Y, BarBT5_X, BarBT5_Y;
let Hint1_W, Hint1_H, Hint2_WH;
let Hint1_X, Hint1_Y, Hint2_X, Hint2_Y, Hint3_X, Hint3_Y, Hint4_X, Hint4_Y, Hint5_X, Hint5_Y, Hint6_X, Hint6_Y;
let LockIMG_W, LockIMG_H, LockIMG_X, LockIMG_Y;
let CodeIMG_W, CodeIMG_H, CodeIMG_X, CodeIMG_Y;

let MathProgress = 0;
let BarPulled = 0;
let CodeLocked = true;

let AdminTester = true;

// Array of math problems
const mathProblems = [
    { question: "27/5 - 24/5", answer: "3/5" },
    { question: "((30/6)^2)/3 - 20/6", answer: "5" },
    { question: "18/5 - 14/5", answer: "4/5" },
    { question: "(31/5 + 27/5) - 8/5", answer: "10" },
    { question: "22/5 - 17/5", answer: "1" },
    { question: "21 - (20/5)", answer: "17" },
    { question: "10/6 - 1/6", answer: "3/2" },
    { question: "13 - (12 - 6)", answer: "7" },
    { question: "((31 - 13) + 14)/4", answer: "8" },
    { question: "(29/5 - 12/5) + 3/5", answer: "4" },
    //{ question: "(29/5 - 11/5) - ((16/2)/5)", answer: "2" },
    { question: "(23 + 10 - 17 + 2)/2", answer: "9" }
];

let usedProblems = []; // Array to keep track of used problems
let correctAnswers = 0;
let currentProblem;
let inputBox;
let submitButton;
let questionDiv;

let typingSounds = [];
let soundsStopped = false; // Flag to track if stopTypingSounds is active

let Mistakes = 0;

// Achivements 🥇

  //MiniGames 🕹
  //MiniGame-1:
  const AC_MG1_1 = localStorage.getItem('MG1_1');
  const AC_MG1_2 = localStorage.getItem('MG1_2');
  const AC_MG1_3 = localStorage.getItem('MG1_3');
  const AC_MG1_4 = localStorage.getItem('MG1_4');

  //MiniGames 🕹
  //MiniGame-1:
  let MG1_1 = false, MG1_2 = false, MG1_3 = false, MG1_4 = false;

function preload() {
  bgImage = loadImage('materials/images/MiniGame1_BackGround1.png');
  BG_Music = loadSound('materials/sounds/BG_Music.wav');
  
  typingSounds.push(loadSound('materials/sounds/Type1.mp3'));
  typingSounds.push(loadSound('materials/sounds/Type2.mp3'));
  typingSounds.push(loadSound('materials/sounds/Type3.mp3'));
  
  AC_SFX = loadSound('materials/sounds/AC_SFX.mp3');
  BarPull = loadSound('materials/sounds/BarPull.mp3');
  SubmitBT1 = loadSound('materials/sounds/SubmitPress.mp3');
  SubmitBT2 = loadSound('materials/sounds/SubmitBT.mp3');
  IncorrectAnswer = loadSound('materials/sounds/Incorrect.mp3');
  CorrectAnswer = loadSound('materials/sounds/Correct.mp3');
  NotActiveBT = loadSound('materials/sounds/NotActiveBT.mp3');
  DataS = loadSound('materials/sounds/DataS.mp3');
  UnlockS = loadSound('materials/sounds/Unlock.mp3');
  ClaimS = loadSound('materials/sounds/Claim.mp3');
  Wrong = loadSound('materials/sounds/Wrong.mp3');
}

function setup() {
  // Create a canvas the size of the window
  createCanvas(windowWidth, windowHeight);
  
  
  if (TotorialComplete_C !== null && OneUse2 == false) {
	  TotorialComplete = TotorialComplete_C;
	  OneUse2 = true;
  }
  
  
  //Final button
  FinalBT_WH = width * 0.092;
  
  Final_X = width * 0.0825;
  Final_Y = height * 0.299;
  
  FinalBT = createImg('materials/images/buttons/ButtonV1.png', 'Final Button');
  FinalBT.size(FinalBT_WH, FinalBT_WH);
  FinalBT.position(Final_X, Final_Y);
  FinalBT.mousePressed(FinalBT_Pressed);
  
  //Bar Buttons
  BarBT_W = width * 0.06;
  BarBT_H = height * 0.015;
  
  BarBT1_X = width * 0.098;
  BarBT1_Y = height * 0.231;
  
  BarBT2_X = width * 0.207;
  BarBT2_Y = height * 0.208;
  
  BarBT3_X = width * 0.314;
  BarBT3_Y = height * 0.22;
  
  BarBT4_X = width * 0.422;
  BarBT4_Y = height * 0.188;
  
  BarBT5_X = width * 0.528;
  BarBT5_Y = height * 0.228;
  
  BarBT1 = createImg('materials/images/buttons/Bar.png', 'Bar Button 1');
  BarBT1.size(BarBT_W, BarBT_H);
  BarBT1.position(BarBT1_X, BarBT1_Y);
  BarBT1.mousePressed(BarBT1_Pressed);
  
  BarBT2 = createImg('materials/images/buttons/Bar.png', 'Bar Button 2');
  BarBT2.size(BarBT_W, BarBT_H);
  BarBT2.position(BarBT2_X, BarBT2_Y);
  BarBT2.mousePressed(BarBT2_Pressed);
  
  BarBT3 = createImg('materials/images/buttons/Bar.png', 'Bar Button 3');
  BarBT3.size(BarBT_W, BarBT_H);
  BarBT3.position(BarBT3_X, BarBT3_Y);
  BarBT3.mousePressed(BarBT3_Pressed);
  
  BarBT4 = createImg('materials/images/buttons/Bar.png', 'Bar Button 4');
  BarBT4.size(BarBT_W, BarBT_H);
  BarBT4.position(BarBT4_X, BarBT4_Y);
  BarBT4.mousePressed(BarBT4_Pressed);
  
  BarBT5 = createImg('materials/images/buttons/Bar.png', 'Bar Button 5');
  BarBT5.size(BarBT_W, BarBT_H);
  BarBT5.position(BarBT5_X, BarBT5_Y);
  BarBT5.mousePressed(BarBT5_Pressed);
  
  //HintV1 Images
  Hint1_W = width * 0.06;
  Hint1_H = height * 0.015;
  
  Hint1_X = width * 0.098;
  Hint1_Y = height * 0.066;
  
  Hint2_X = width * 0.207;
  Hint2_Y = height * 0.155;
  
  Hint3_X = width * 0.314;
  Hint3_Y = height * 0.185;
  
  Hint4_X = width * 0.422;
  Hint4_Y = height * 0.098;
  
  Hint5_X = width * 0.528;
  Hint5_Y = height * 0.128;
  
  HintIMG1 = createImg('materials/images/hints/Hint1.png', 'Hint Image 1');
  HintIMG1.size(Hint1_W, Hint1_H);
  HintIMG1.position(Hint1_X, Hint1_Y);
  HintIMG1.mousePressed(BarBT1_Pressed);
  HintIMG1.hide();
  
  HintIMG2 = createImg('materials/images/hints/Hint1.png', 'Hint Image 2');
  HintIMG2.size(Hint1_W, Hint1_H);
  HintIMG2.position(Hint2_X, Hint2_Y);
  HintIMG2.mousePressed(BarBT2_Pressed);
  HintIMG2.hide();
  
  HintIMG3 = createImg('materials/images/hints/Hint1.png', 'Hint Image 3');
  HintIMG3.size(Hint1_W, Hint1_H);
  HintIMG3.position(Hint3_X, Hint3_Y);
  HintIMG3.mousePressed(BarBT3_Pressed);
  HintIMG3.hide();
  
  HintIMG4 = createImg('materials/images/hints/Hint1.png', 'Hint Image 4');
  HintIMG4.size(Hint1_W, Hint1_H);
  HintIMG4.position(Hint4_X, Hint4_Y);
  HintIMG4.mousePressed(BarBT4_Pressed);
  HintIMG4.hide();
  
  HintIMG5 = createImg('materials/images/hints/Hint1.png', 'Hint Image 5');
  HintIMG5.size(Hint1_W, Hint1_H);
  HintIMG5.position(Hint5_X, Hint5_Y);
  HintIMG5.mousePressed(BarBT5_Pressed);
  HintIMG5.hide();
  
  //HintV1 Images
  Hint2_WH = width * 0.11;
  
  Hint6_X = width * 0.075;
  Hint6_Y = height * 0.295;
  
  HintIMG6 = createImg('materials/images/hints/Hint2.png', 'Hint Image 6');
  HintIMG6.size(Hint2_WH, Hint2_WH);
  HintIMG6.position(Hint6_X, Hint6_Y);
  HintIMG6.mousePressed(FinalBT_Pressed);
  HintIMG6.hide();
  
  //LockIMG
  LockIMG_W = width * 0.6;
  LockIMG_H = height * 0.14;
  
  LockIMG_X = width / 2 - LockIMG_W / 2;
  LockIMG_Y = height * 0.415;
  
  LockIMG = createImg('materials/images/lock_animation/LockFrame1.png', 'Locked Lock');
  LockIMG.size(LockIMG_W, LockIMG_H);
  LockIMG.position(LockIMG_X, LockIMG_Y);
  
  //CodeIMG Images
  CodeIMG_W = width * 0.45;
  CodeIMG_H = height * 0.06;
  
  CodeIMG_X = width / 2 - CodeIMG_W / 2;
  CodeIMG_Y = height * 0.45;
  
  // Create input box and submit button
  inputBox = createInput('');
  styleInputBox();

  submitButton = createButton('Submit');
  styleSubmitButton();
  submitButton.mousePressed(checkAnswer); // Link the button to the checkAnswer function

  // Create question display div
  questionDiv = createDiv('');
  styleQuestionDiv();

  // Display the first math problem
  displayNewProblem();
  
  //Check for Achivements
  if (!OneUse3) {
	  if (AC_MG1_1 !== null) {
		  MG1_1 = AC_MG1_1;
		  console.log("Achievement-(MG1_1): Out of Bounds");
	  }
	  if (AC_MG1_2 !== null) {
		  MG1_2 = AC_MG1_2;
		  console.log("Achievement-(MG1_2): Achievement Unlocked: Pain");
	  }
	  if (AC_MG1_3 !== null) {
		  MG1_3 = AC_MG1_3;
		  console.log("Achievement-(MG1_3): I Have Become Math");
	  }
	  if (AC_MG1_4 !== null) {
		  MG1_4 = AC_MG1_4;
		  console.log("Achievement-(MG1_4): Well, That’s New");
	  }

	  OneUse3 = true;
  }
  
  //Achievement Storage - Out of Bounds
  if (MG1_1 == false) {
	 console.log("Out of Bounds");
	 localStorage.setItem('MG1_1', true);
	 showAchievement("MG1_1");
	 MG1_1 = true;
  }
  
  if (DifficultySL == "3") {
	  //Achievement Storage - Achievement Unlocked: Pain
	  if (MG1_2 == false) {
		 console.log("Achievement Unlocked: Pain");
		 localStorage.setItem('MG1_2', true);
		 showAchievement("MG1_2");
		 MG1_2 = true;
	  }
  }
  
  BG_Music.loop();
  BG_Music.setVolume(0.1);
}

function draw() {
  // Set the background image
  background(bgImage);
  
  if (BarPulled == 5 && OneUse == false) {
		setTimeout(function () {
			bgImage = loadImage('materials/images/MiniGame1_BackGround2.png');
		}, 300)
		setTimeout(function () {
			HintIMG6.show();
			showMessage("MSG6");
			lockInputBox();
		}, 900)
		
		OneUse = true;
	}
}

function windowResized() {
  // Adjust the canvas size if the window is resized
  resizeCanvas(windowWidth, windowHeight);
  
  //Final button
  FinalBT_WH = width * 0.092;
  
  Final_X = width * 0.0825;
  Final_Y = height * 0.299;
  
  FinalBT.size(FinalBT_WH, FinalBT_WH);
  FinalBT.position(Final_X, Final_Y);
  
  //Bar Buttons
  BarBT_W = width * 0.06;
  BarBT_H = height * 0.015;
  
  BarBT1_X = width * 0.098;
  BarBT1_Y = height * 0.231;
  
  BarBT2_X = width * 0.207;
  BarBT2_Y = height * 0.208;
  
  BarBT3_X = width * 0.314;
  BarBT3_Y = height * 0.22;
  
  BarBT4_X = width * 0.422;
  BarBT4_Y = height * 0.188;
  
  BarBT5_X = width * 0.528;
  BarBT5_Y = height * 0.228;
  
  BarBT1.size(BarBT_W, BarBT_H);
  if (MathProgress >= 1 && !StartBarrier) {
	  BarBT1.position(BarBT1_X, Hint1_Y);
  } else {
	  BarBT1.position(BarBT1_X, BarBT1_Y);
  }
  
  BarBT2.size(BarBT_W, BarBT_H);
  if (MathProgress >= 2 && !StartBarrier) {
	  BarBT2.position(BarBT2_X, Hint2_Y);
  } else {
	  BarBT2.position(BarBT2_X, BarBT2_Y);
  }
  
  BarBT3.size(BarBT_W, BarBT_H);
  if (MathProgress >= 3 && !StartBarrier) {
	  BarBT3.position(BarBT3_X, Hint3_Y);
  } else {
	  BarBT3.position(BarBT3_X, BarBT3_Y);
  }
  
  BarBT4.size(BarBT_W, BarBT_H);
  if (MathProgress >= 4 && !StartBarrier) {
	  BarBT4.position(BarBT4_X, Hint4_Y);
  } else {
	  BarBT4.position(BarBT4_X, BarBT4_Y);
  }
  
  BarBT5.size(BarBT_W, BarBT_H);
  if (MathProgress >= 5 && !StartBarrier) {
	  BarBT5.position(BarBT5_X, Hint5_Y);
  } else {
	  BarBT5.position(BarBT5_X, BarBT5_Y);
  }
  
  //HintV1 Images
  Hint1_W = width * 0.06;
  Hint1_H = height * 0.015;
  
  Hint1_X = width * 0.098;
  Hint1_Y = height * 0.066;
  
  Hint2_X = width * 0.207;
  Hint2_Y = height * 0.155;
  
  Hint3_X = width * 0.314;
  Hint3_Y = height * 0.185;
  
  Hint4_X = width * 0.422;
  Hint4_Y = height * 0.098;
  
  Hint5_X = width * 0.528;
  Hint5_Y = height * 0.128;
  
  HintIMG1.size(Hint1_W, Hint1_H);
  HintIMG1.position(Hint1_X, Hint1_Y);
  
  HintIMG2.size(Hint1_W, Hint1_H);
  HintIMG2.position(Hint2_X, Hint2_Y);
  
  HintIMG3.size(Hint1_W, Hint1_H);
  HintIMG3.position(Hint3_X, Hint3_Y);
  
  HintIMG4.size(Hint1_W, Hint1_H);
  HintIMG4.position(Hint4_X, Hint4_Y);
  
  HintIMG5.size(Hint1_W, Hint1_H);
  HintIMG5.position(Hint5_X, Hint5_Y);
  
  //HintV1 Images
  Hint2_WH = width * 0.11;
  
  Hint6_X = width * 0.075;
  Hint6_Y = height * 0.295;
  
  HintIMG6.size(Hint2_WH, Hint2_WH);
  HintIMG6.position(Hint6_X, Hint6_Y);
  
  //LockIMG
  LockIMG_W = width * 0.6;
  LockIMG_H = height * 0.14;
  
  LockIMG_X = width / 2 - LockIMG_W / 2;
  LockIMG_Y = height * 0.415;
  
  LockIMG.size(LockIMG_W, LockIMG_H);
  LockIMG.position(LockIMG_X, LockIMG_Y);
  
  //CodeIMG Images
  CodeIMG_W = width * 0.45;
  CodeIMG_H = height * 0.06;
  
  CodeIMG_X = width / 2 - CodeIMG_W / 2;
  CodeIMG_Y = height * 0.45;
  
  // Adjust inputBox, submitButton, and questionDiv
  styleInputBox();
  styleSubmitButton();
  styleQuestionDiv();
}


function styleInputBox() {
  const inputBoxWidth = width * 0.35; // 20% of canvas width
  const inputBoxHeight = height * 0.035; // 5% of canvas height
  const inputBoxX = width * 0.049; // 10% margin from left
  const inputBoxY = height * 0.925; // Positioned 80% down the canvas

  inputBox.position(inputBoxX, inputBoxY);
  inputBox.size(inputBoxWidth, inputBoxHeight);
  inputBox.style('background-color', '#000');
  inputBox.style('color', '#00cb5a');
  inputBox.style('border', '1px solid #0f0');
  inputBox.style('font-family', 'Courier New');
  inputBox.style('font-size', `${height * 0.025}px`); // Font size relative to canvas height
  inputBox.style('outline', 'none'); // Remove glow effect
  inputBox.style('padding', '0'); // Remove padding
  inputBox.style('box-sizing', 'border-box'); // Ensure height includes border
  inputBox.style('padding-left', `${height * 0.01}px`);
}

function styleSubmitButton() {
  const buttonWidth = width * 0.25; // 10% of canvas width
  const buttonHeight = height * 0.035; // Match inputBox height
  const buttonX = width * 0.39; // Positioned relative to inputBox
  const buttonY = height * 0.925; // Same height as inputBox

  submitButton.position(buttonX, buttonY);
  submitButton.size(buttonWidth, buttonHeight);
  submitButton.style('background-color', '#000');
  submitButton.style('color', '#00cb5a');
  //submitButton.style('font-weight', 'bold'); // Make text bold
  submitButton.style('border', '1px solid #0f0');
  submitButton.style('font-family', 'Courier New');
  submitButton.style('font-size', `${height * 0.025}px`); // Font size relative to canvas height
  submitButton.style('cursor', 'pointer');
  submitButton.style('padding', '0'); // Remove padding
  submitButton.style('box-sizing', 'border-box'); // Ensure height includes border
}

function styleQuestionDiv() {
  const questionDivWidth = width * 0.8; // 80% of canvas width
  const questionDivHeight = height * 0.017; // 10% of canvas height
  const questionDivX = width * 0.049; // Centered with 10% margin on sides
  const questionDivY = height * 0.88; // Positioned above input box and button

  questionDiv.position(questionDivX, questionDivY);
  questionDiv.size(questionDivWidth, questionDivHeight);
  questionDiv.style('font-size', `${height * 0.03}px`); // Font size relative to canvas height
  questionDiv.style('color', '#00cb5a');
  questionDiv.style('font-family', 'Courier New');
  questionDiv.style('background-color', 'rgba(0, 0, 0, 0.5)'); // Transparent black background
  questionDiv.style('padding', `${height * 0.01}px`); // Padding relative to canvas height
  questionDiv.style('border', '1px solid #0f0');
  questionDiv.style('display', 'flex'); // Use flexbox
  questionDiv.style('justify-content', 'flex-start'); // Align text to the left
  questionDiv.style('align-items', 'center'); // Vertically center the text
  questionDiv.style('text-align', 'left'); // Ensure multi-line text starts from the left
  questionDiv.style('padding-left', `${height * 0.01}px`); // Add some left padding for aesthetics
}


function lockInputBox() {
  if (MathProgress >= 1 && BarPulled == 5) {
	inputBox.attribute('disabled', 'true'); // Disable the input box
  } else {
	inputBox.attribute('disabled', 'true'); // Disable the input box
	inputBox.style('opacity', '0.5'); // Optional: visually indicate it's locked
  }
}

function unlockInputBox() {
  inputBox.removeAttribute('disabled'); // Enable the input box
  inputBox.style('opacity', '1'); // Restore full visibility
}


function FinalBT_Pressed() {  
	if (!StartBarrier) {
		if ((MathProgress >= 1 && BarPulled == 5) || AdminTester == true) {
			SubmitBT1.setVolume(0.9);
			SubmitBT1.play();
			
			localStorage.setItem('MiniGameN1', true);
			FinalBT.attribute("src", "materials/images/buttons/ButtonV2.png");
			
			//Frame-1 (Button Press)
			setTimeout(function () {
				DataS.setVolume(0.9);
			    DataS.play();
				
				FinalBT.attribute("src", "materials/images/buttons/ButtonV1.png");
				showMessage("HIDE");
				stopTypingSounds();
			}, 400)
			
			//Frame-2 (Hide Hint 6)
			setTimeout(function () {
				HintIMG6.hide();
			}, 800)
			
			//Frame-3 (Show User Data)
			setTimeout(function () {
				UnlockS.setVolume(0.5);
			    UnlockS.play();
				
				bgImage = loadImage('materials/images/MiniGame1_BackGround3.png');  
			}, 1200)
			
			setTimeout(function () {
				LockIMG.attribute("src", "materials/images/lock_animation/LockFrame2.png");
			}, 2200)
			
			setTimeout(function () {
				setTimeout(function () {
					ClaimS.setVolume(0.9);
					ClaimS.play();
				}, 400)
				
				LockIMG.attribute("src", "materials/images/lock_animation/LockFrame3.png");
			}, 3200)
			
			setTimeout(function () {
				LockIMG.size(CodeIMG_W, CodeIMG_H);
				LockIMG.position(CodeIMG_X, CodeIMG_Y);
				LockIMG.attribute("src", "materials/images/lock_animation/LockFrame4.png");
			}, 4000)
			
			setTimeout(function () {
				window.location.href = "../../../index.html";
			}, 6000)
			
			//Unlock code
			CodeLocked = false;
		} else { 
			NotActiveBT.setVolume(0.9);
			NotActiveBT.play();
			
			FinalBT.attribute("src", "materials/images/buttons/ButtonV2.png");
			setTimeout(function () {
				FinalBT.attribute("src", "materials/images/buttons/ButtonV1.png");
			}, 400)
		}
	}
}

function BarBT1_Pressed() {
	if (MathProgress >= 1 && !StartBarrier) {
		BarPull.setVolume(1.2);
		BarPull.play();
		
		BarPulled = BarPulled + 1;
		BarBT1.style("pointer-events", "none"); // Disable click events
		HintIMG1.style("pointer-events", "none");
		
		BarBT1.position(BarBT1_X, Hint1_Y);
		setTimeout(function () {
			HintIMG1.hide();
			showMessage("HIDE");
			unlockInputBox();
			stopTypingSounds();
		}, 800)
	} else {
		Wrong.setVolume(0.3);
		Wrong.play();
	}
}

function BarBT2_Pressed() {
	if (MathProgress >= 2 && !StartBarrier) {
		BarPull.setVolume(1.2);
		BarPull.play();
		BarPulled = BarPulled + 1;
		BarBT2.style("pointer-events", "none"); // Disable click events
		HintIMG2.style("pointer-events", "none");
		
		BarBT2.position(BarBT2_X, Hint2_Y);
		setTimeout(function () {
			HintIMG2.hide();
			showMessage("HIDE");
			unlockInputBox();
			stopTypingSounds();
		}, 800)
	} else {
		Wrong.setVolume(0.3);
		Wrong.play();
	}
}

function BarBT3_Pressed() {
	if (MathProgress >= 3 && !StartBarrier) {
		BarPull.setVolume(1.2);
		BarPull.play();
		BarPulled = BarPulled + 1;
		BarBT3.style("pointer-events", "none"); // Disable click events
		HintIMG3.style("pointer-events", "none");
		
		BarBT3.position(BarBT3_X, Hint3_Y);
		setTimeout(function () {
			HintIMG3.hide();
			showMessage("HIDE");
			unlockInputBox();
			stopTypingSounds();
		}, 800)
	} else {
		Wrong.setVolume(0.3);
		Wrong.play();
	}
}

function BarBT4_Pressed() {
	if (MathProgress >= 4 && !StartBarrier) {
		BarPull.setVolume(1.2);
		BarPull.play();
		BarPulled = BarPulled + 1;
		BarBT4.style("pointer-events", "none"); // Disable click events
		HintIMG4.style("pointer-events", "none");
		
		BarBT4.position(BarBT4_X, Hint4_Y);
		setTimeout(function () {
			HintIMG4.hide();
			showMessage("HIDE");
			unlockInputBox();
			stopTypingSounds();
		}, 800)
	} else {
		Wrong.setVolume(0.3);
		Wrong.play();
	}
}

function BarBT5_Pressed() {
	if (MathProgress == 5 && !StartBarrier) {
		BarPull.setVolume(1.2);
		BarPull.play();
		BarPulled = BarPulled + 1;
		BarBT5.style("pointer-events", "none"); // Disable click events
		HintIMG5.style("pointer-events", "none");
		
		BarBT5.position(BarBT5_X, Hint5_Y);
		setTimeout(function () {
			HintIMG5.hide();
			showMessage("HIDE");
			stopTypingSounds();
		}, 800)
	} else {
		Wrong.setVolume(0.3);
		Wrong.play();
	}
}

function CheckForHints() {
	if (MathProgress == 1) {
		HintIMG1.show();
		showMessage("MSG1");
		lockInputBox();
	} 
	if (MathProgress == 2) {
		HintIMG2.show();
		showMessage("MSG2");
		lockInputBox();
	} 
	if (MathProgress == 3) {
		HintIMG3.show();
		showMessage("MSG3");
		lockInputBox();
	} 
	if (MathProgress == 4) {
		HintIMG4.show();
		showMessage("MSG4");
		lockInputBox();
	} 
	if (MathProgress == 5) {
		HintIMG5.show();
		showMessage("MSG5");
		lockInputBox();
	} 
}

function displayNewProblem() {
    // If all problems have been used, reset the used problems list
    if (usedProblems.length === mathProblems.length) {
        usedProblems = [];
    }

    // Get a new problem that hasn't been used
    let newProblem;
    do {
        newProblem = random(mathProblems);
    } while (usedProblems.includes(newProblem));

    // Mark the problem as used
    usedProblems.push(newProblem);

    // Update the current problem
    currentProblem = newProblem;

    // Update the question text
    questionDiv.html(currentProblem.question);

    // Style adjustments
    questionDiv.style('font-weight', 'bold'); // Make text bold
    questionDiv.style('letter-spacing', '-1px'); // Reduce spaces between characters
    questionDiv.style('font-size', `${height * 0.03}px`); // Adjust font size if needed

    // Clear the input box
    inputBox.value('');
}

function checkAnswer() {
	SubmitBT2.setVolume(0.9);
	SubmitBT2.play();
    const userAnswer = inputBox.value().trim();
    if (userAnswer === currentProblem.answer) { 
		setTimeout(() => {
			CorrectAnswer.setVolume(0.9);
			CorrectAnswer.play();
			
			MathProgress++; // Increment correct answers
			//MathProgress = 5; // Admin helper for testing
			console.log(`Correct! Total correct answers: ${MathProgress}`);
			CheckForHints();
			
			// Show "Incorrect" message
			questionDiv.html("Correct"); // Display incorrect message

			// Clear the input box
			inputBox.value(''); // Reset the input box to an empty string
			
			setTimeout(() => {
				if (MathProgress >= 5) { // Check if the user solved 5 problems
					console.log("Victory!");
					
					if (DifficultySL == "3") {
						//Achievement Storage - Well, That’s New
						if (MG1_4 == false) {
							console.log("Well, That’s New");
							localStorage.setItem('MG1_4', true);
							showAchievement("MG1_4");
							MG1_4 = true;
						}
					}
					
					if (Mistakes == 0) {
						//Achievement Storage -  I Have Become Math
						if (MG1_3 == false) {
							console.log("I Have Become Math");
							localStorage.setItem('MG1_3', true);
							showAchievement("MG1_3");
							MG1_3 = true;
						}
					}

					// Adjust the "Completed" box width
					questionDiv.html("C*mp!et&d"); // Show the "Completed" text
					questionDiv.size(width * 0.35, questionDiv.height); // Only change width, keep height
					questionDiv.style('font-size', `${height * 0.02}px`); // Adjust font size for smaller width

					// Adjust the input box width and add random symbols
					const randomSymbols = "!@#$%^&*+|;:,.?~";
					let randomString = "";
					for (let i = 0; i < 20; i++) { // Generate a longer string
						randomString += randomSymbols.charAt(Math.floor(Math.random() * randomSymbols.length));
					}
					inputBox.value(randomString); // Fill the input box with random symbols

					inputBox.style('pointer-events', 'none'); // Make it non-editable
					inputBox.size(width * 0.8, inputBox.height); // Only change width, keep height
					//inputBox.style('font-weight', 'bold'); // Make text bold
					inputBox.style('font-size', `${height * 0.03}px`); // Adjust font size for larger width
					inputBox.style('padding-left', `${height * 0.01}px`);

					submitButton.hide(); // Hide the submit button
				} else {
					displayNewProblem(); // Display the next math problem
				}
			}, 2000);
		}, 700);
    } else {
		setTimeout(() => {
			IncorrectAnswer.setVolume(0.9);
			IncorrectAnswer.play();
		
			console.log("Incorrect. Try again.");
			Mistakes = Mistakes + 1;
			
			// Show "Incorrect" message
			questionDiv.html("Incorrect"); // Display incorrect message

			// Clear the input box
			inputBox.value(''); // Reset the input box to an empty string

			// Revert to the math problem after 3 seconds
			setTimeout(() => {
				questionDiv.html(currentProblem.question); // Revert to the current problem
			}, 2000);
		}, 700);
    }
}


// Store the tutorial dialogues
const characterDialogues = [
  "Ahem. Well, this is… not exactly how I envisioned your first puzzle kicking off. Let’s just say the system decided to have a little hiccup. How charming. But no need to worry!",
  "I’ve got everything completely under control. Totally under control. A minor blip, nothing more. Moving on!",
  "Alright! Your first puzzle is a warm up: solve five math problems to align the system bars. Once done, hit ‘Submit’ to verify and unlock your first map piece. Easy peasy!",
  "Sure, the system might feel a bit ‘classic,’ but it works perfectly! I’ll be right here, cheering you on and ready to help—not that you’ll need it, of course. You’re the pros!",
  "So, let’s not dwell on the minor hiccup earlier. Instead, let’s focus on solving this puzzle and getting that map piece! First problem coming right up. Show me what you’ve got."
];

// Messages for the post-tutorial system
const postTutorialMessages = [
  "Well done! That’s one down. See the square indicating where Bar One needs to go? Just click Bar One, and it’ll snap into position. Easy, right? On to the next!",
  "Two in a row! You’re on a roll. Look for the square marking the position for Bar Two. Click Bar Two, and it’ll snap right where it belongs. Keep it up!",
  "Another one right! Bar Three is next. Spot the square marking its position? Click Bar Three, and it’ll lock into place automatically. Let’s move to the fourth!",
  "Fantastic work! Now look for the square showing Bar Four’s position. A quick click on Bar Four, and it’ll snap into place perfectly. One more to go!",
  "Perfect score so far! Look for the square where Bar Five needs to go. Click Bar Five, and it’ll snap right into position. That’s all of them aligned!",
  "Fantastic! All bars are aligned. Now, click the ‘Submit’ button to finalize everything and unlock your first map piece code. Great job!"
];

let currentDialogueIndex = 0; // Track which dialogue to show
let currentText = ""; // The currently displayed text (animated)
let targetText = ""; // The full text for the current dialogue
let textIndex = 0; // Tracks the current character being displayed in the animation
let textAnimationInterval; // Holds the interval ID for text animation

// Function to play a random typing sound
function playRandomTypingSound() {
  if (soundsStopped) {
    console.log("Typing sounds are currently stopped.");
    return; // Don't play a sound if stopTypingSounds is active
  }
  
  const randomIndex = Math.floor(Math.random() * typingSounds.length);
  const sound = typingSounds[randomIndex];
  if (sound) {
    sound.setVolume(0.3); // Adjust volume as needed
    sound.play();
  }
}

function stopTypingSounds() {
  if (BarPulled == 5) {
	  soundsStopped = true; // Mark sounds as stopped
	  typingSounds.forEach((sound, index) => {
		if (sound.isPlaying()) {
		  sound.stop(); // Stop the sound if it is playing
		  console.log(`Stopped sound ${index}`);
		}
	  });

	  // Optionally reset the flag after a delay if needed
	  setTimeout(() => {
		soundsStopped = false; // Allow sounds to play again after 2 seconds
		console.log("Sounds can now play again.");
	  }, 7000); // Adjust the delay as needed
  }
}

function showMessage(messageKey) {
  let dialogueContainer = document.getElementById("dialogue-container");
  
  // Create the container if it doesn't exist
  if (!dialogueContainer) {
    dialogueContainer = document.createElement("div");
    dialogueContainer.id = "dialogue-container";

    // Styling and positioning
    dialogueContainer.style.position = "absolute";
    dialogueContainer.style.top = `${height * 0.63}px`;
    dialogueContainer.style.left = `${width * 0.02}px`;
    dialogueContainer.style.backgroundColor = "transparent";
    dialogueContainer.style.color = "#10e353";
    dialogueContainer.style.padding = "15px";
    dialogueContainer.style.borderRadius = "10px";
    dialogueContainer.style.fontFamily = "Arial, sans-serif";
    dialogueContainer.style.fontSize = "12px";
    dialogueContainer.style.lineHeight = "1.5";
    dialogueContainer.style.textShadow = "0 0 5px #10e353, 0 0 20px #10e353";
    dialogueContainer.style.textAlign = "left";
    dialogueContainer.style.width = `${Math.min(300, window.innerWidth * 0.3)}px`;
    dialogueContainer.style.height = "auto";
    dialogueContainer.style.overflow = "hidden";
    dialogueContainer.style.zIndex = "1000";
    document.body.appendChild(dialogueContainer);
  }

  if (messageKey === "HIDE") {
    // Hide the container
    dialogueContainer.style.display = "none";
    console.log("Message hidden.");
    return;
  }

  // Make the container visible
  dialogueContainer.style.display = "block";

  // Resolve the message to display
  const messageIndex = parseInt(messageKey.replace("MSG", ""), 10) - 1;
  const message = postTutorialMessages[messageIndex];
  if (!message) {
    console.error("Invalid message key:", messageKey);
    return;
  }

  // Reset animation variables
  targetText = message;
  currentText = "";
  textIndex = 0;

  console.log("Starting to display text:", message);

  // Start animating the text
  textAnimationInterval = setInterval(() => {
    if (textIndex < targetText.length) {
      const currentChar = targetText[textIndex];
      currentText += currentChar;
      dialogueContainer.innerText = currentText;

      // Play sound only for letters
      if (/[a-zA-Z]/.test(currentChar)) {
        playRandomTypingSound();
      }

      textIndex++;
    } else {
      clearInterval(textAnimationInterval); // Stop the animation once all text is displayed
      console.log("Finished displaying text.");
    }
  }, 50);
}



// Function to display text letter by letter
function displayText(text) {
  let dialogueContainer = document.getElementById("dialogue-container");
  if (!dialogueContainer) {
    dialogueContainer = document.createElement("div");
    dialogueContainer.id = "dialogue-container";

    // Dynamically position at 60% of the canvas height
    dialogueContainer.style.position = "absolute";
    dialogueContainer.style.top = `${height * 0.63}px`; // 60% of canvas height
    dialogueContainer.style.left = `${width * 0.03}px`; // 3% of canvas width from the left

    // Styling
    dialogueContainer.style.backgroundColor = "transparent"; // Fully transparent background
    dialogueContainer.style.color = "#10e353"; // Neon green text
    dialogueContainer.style.padding = "15px";
    dialogueContainer.style.borderRadius = "10px";
    dialogueContainer.style.fontFamily = "Arial, sans-serif";
    dialogueContainer.style.fontSize = "12px";
    dialogueContainer.style.lineHeight = "1.5";
    dialogueContainer.style.textShadow = "0 0 5px #10e353, 0 0 20px #10e353"; // Neon glow effect
    dialogueContainer.style.textAlign = "left";
    dialogueContainer.style.width = `${Math.min(300, window.innerWidth * 0.3)}px`; // Max 300px or 30% of screen width
    dialogueContainer.style.height = "auto"; // Adjust height dynamically
    dialogueContainer.style.overflow = "hidden"; // Prevent text overflow
    dialogueContainer.style.zIndex = "1000"; // Ensure it's on top
    document.body.appendChild(dialogueContainer);
  }

  // Reset animation variables
  targetText = text;
  currentText = "";
  textIndex = 0;

  // Start animating the text
  textAnimationInterval = setInterval(() => {
    if (textIndex < targetText.length) {
      const currentChar = targetText[textIndex];
      currentText += currentChar;
      dialogueContainer.innerText = currentText;

      // Play sound only for letters
      if (/[a-zA-Z]/.test(currentChar)) {
        playRandomTypingSound();
      }

      textIndex++;
    } else {
      clearInterval(textAnimationInterval); // Stop the animation once all text is displayed
    }
  }, 50); // Adjust speed of text animation
}

// Advance dialogue on click
function advanceDialogue() {
  if (textIndex === targetText.length) { // Ensure the current text is fully displayed
    if (currentDialogueIndex < characterDialogues.length) {
      displayText(characterDialogues[currentDialogueIndex]); // Show the next dialogue
      currentDialogueIndex++;
    } else {
      const dialogueContainer = document.getElementById("dialogue-container");
      if (dialogueContainer) {
        dialogueContainer.style.display = "none"; // Hide dialogue container at the end
      }
      window.removeEventListener("click", advanceDialogue); // Remove event listener
      TotorialComplete = true; // Mark tutorial as complete
	  console.log('Totorial Completed!');
	  localStorage.setItem('TotorialComplete_MiniGame1', true);
	  unlockInputBox();
    }
  }
}

let fullscreenActivated = true; // Track if fullscreen has been activated      change back to false =======================================000
let StartBarrier = false; // Ensure the starting barrier is active               change back to true ==============================================000
let Totorial = true; // Tutorial activation flag

// Function to handle mousePressed events
function mousePressed() {
  // Check if the tutorial is active and not completed
  if (Totorial && !TotorialComplete) {
    Totorial = false; // Deactivate tutorial flag
    displayText(characterDialogues[currentDialogueIndex]); // Start the dialogue system
    window.addEventListener("click", advanceDialogue); // Attach event to advance dialogue
  } else if (TotorialComplete === true) {
    StartBarrier = false; // Remove the starting barrier if the tutorial is completed
  } else if (TotorialComplete == "true"){
	StartBarrier = false; 
    unlockInputBox();	
  }

  // Check if the starting barrier is active
  if (StartBarrier) {
	  lockInputBox();
    // Optionally start background music or other starting actions
    // backgroundMusic.loop(); // Uncomment if you have background music
  }

  // Enable fullscreen when the user clicks within the canvas
  if (!fullscreenActivated && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs); // Toggle fullscreen mode
    fullscreenActivated = true; // Mark fullscreen as activated
  }
}

function showAchievement(achievementCode) {
  // Ensure only one achievement is shown at a time
  //let existingAchievement = document.getElementById("achievement-popup");
  //if (existingAchievement) {
    //existingAchievement.remove();
  //}
  
  AC_SFX.setVolume(0.9);
  AC_SFX.play();
  
  // Create the achievement container
  let achievementContainer = document.createElement("div");
  achievementContainer.id = "achievement-popup";
  achievementContainer.style.position = "fixed";
  if (achievementCode === "MG1_1" || achievementCode === "MG1_4") {
    achievementContainer.style.top = `${window.innerHeight * 0.73}px`;
  } else {
	achievementContainer.style.top = `${window.innerHeight * 0.85}px`;  
  }
  achievementContainer.style.left = `${window.innerWidth * 0.95}px`;
  achievementContainer.style.width = "300px"; // Adjusted for wider images
  achievementContainer.style.height = "100px"; // Adjusted for banner format
  achievementContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  achievementContainer.style.borderRadius = "10px";
  achievementContainer.style.display = "flex";
  achievementContainer.style.justifyContent = "center";
  achievementContainer.style.alignItems = "center";
  achievementContainer.style.zIndex = "10000";
  achievementContainer.style.transition = "left 1s ease-in-out";

  // Create the achievement image
  let achievementImage = document.createElement("img");
  achievementImage.src = `materials/images/achievements/${achievementCode}.png`;
  achievementImage.style.width = "100%";
  achievementImage.style.height = "100%";
  //achievementImage.style.borderRadius = "10px";

  // Append elements
  achievementContainer.appendChild(achievementImage);
  document.body.appendChild(achievementContainer);

  // Animate the achievement popup
  setTimeout(() => {
    achievementContainer.style.left = `${window.innerWidth * 0.28}px`;
  }, 100);

  // Remove the achievement popup after 10 seconds
  setTimeout(() => {
    achievementContainer.remove();
  }, 10000);
}

function keyPressed() {
  // Check for the "`" key
  if (key === '`') {
    console.log("Backtick key pressed!");

    // Ask the user for a code
    const userCode = prompt("Enter a code:");

    // Check the entered code and redirect the user
    if (userCode === "SkipT") {
      console.log("Code SkipT entered.");
      localStorage.setItem('TotorialComplete_MiniGame1', true);
	  location.reload();
    } else if (userCode === "ResetT") {
      console.log("Code ResetT entered.");
      localStorage.removeItem('TotorialComplete_MiniGame1');
	  location.reload();
    } else if (userCode === "ClearAll") {
      console.log("Code ClearAll entered.");
      localStorage.clear();
	  location.reload();
    } else {
      console.log("Invalid code.");
    }
  }
}

function keyPressed() {
  // Check for the "`" key
  if (key === '`') {
    console.log("Backtick key pressed!");

    // Ask the user for a code
    const userCode = prompt("Enter a code:");

    // Check the entered code and redirect the user
    if (userCode === "SkipT") {
      console.log("Code SkipT entered.");
      localStorage.setItem('TotorialComplete_MiniGame1', true);
	  location.reload();
    } else if (userCode === "ResetT") {
      console.log("Code ResetT entered.");
      localStorage.removeItem('TotorialComplete_MiniGame1');
	  location.reload();
    } else if (userCode === "ClearAll") {
      console.log("Code ClearAll entered.");
      localStorage.clear();
	  location.reload();
    } else {
      console.log("Invalid code.");
    }
  }
}

