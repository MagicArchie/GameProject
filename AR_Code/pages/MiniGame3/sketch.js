/**********************************************
 * Global Variables
 **********************************************/

// Retrieve the stored DifficultySL value from localStorage
const DifficultySL = localStorage.getItem('DifficultySL');

// Retrieve the stored DifficultySL value from localStorage
const TotorialComplete_C  = localStorage.getItem('TotorialComplete_MiniGame3');
let TotorialComplete = false;

// Debug logs?
let AdminHelper = false;

// Optional custom font
let customFont;

let OneUse = false;
let OneUse2 = false;
let OneUse3 = false;

// Single background image
let backgroundImage;
let ActiveCard = 0;

let StartBarrier = true; //change backt to true ====================================================000
let Totorial = true;

let typingSounds = [];

// Card dimensions for vertical layout
let CardWidth = 250;
let CardHeight = 480;

// Positions for the 2 rows (3 cards each)
let CardX1, CardX2, CardX3;
let CardY123 = 600;   // first row
let CardY456 = 1150;  // second row

// Arrays and game logic variables
let cardImages = [];
let cards = [];
let visibleCards = [];
let matchedCards = [];
let isProcessing = false;

// Global variables for text positions
let roundTextY, matchesTextY, roomCodeTextY, roomCodeTextY2;

// Round tracking
let showRoundMessage = true;
let roundMessageTimer = 3000;
let messageStartTime;
let currentRound = 1;
const TOTAL_ROUNDS = 3;
let victorySequenceStarted = false;

// Round 1 back choice
let round1BackChoice = null;

// Current round's back image/pool
let currentBackImagePath = '';
let currentFrontImagePool = [];

/**********************************************
 * Lives / Hearts Tracking
 **********************************************/
let hearts = [];
let heartsLost = 0;

// Hearts bigger, placed higher
const HEART_COUNT = 10;
let heartWidth = 70;
let heartHeight = 70;
let heartSpacing = 8;

let heartsRectX, heartsRectY;
let heartsRectW, heartsRectH;

/**********************************************
 * "You Lost" Screen
 **********************************************/
// Show "You lost!" for 3s, revert one round
let showLostMessage = false;
let lostMessageStartTime = 0;
let lostMessageDuration = 3000; // 3 seconds

// Achivements 🥇

  //MiniGames 🕹
  //MiniGame-3:
  const AC_MG3_1 = localStorage.getItem('MG3_1');
  const AC_MG3_2 = localStorage.getItem('MG3_2');
  const AC_MG3_3 = localStorage.getItem('MG3_3');

  //MiniGames 🕹
  //MiniGame-3:
  let MG3_1 = false, MG3_2 = false, MG3_3 = false;

/**********************************************
 * Preload
 **********************************************/
function preload() {
  // If using custom font: customFont = loadFont('materials/fonts/WitchMystery.otf');
  backgroundImage = loadImage('materials/images/BackGround.png');
  
  typingSounds.push(loadSound('materials/sounds/Type1.mp3'));
  typingSounds.push(loadSound('materials/sounds/Type2.mp3'));
  typingSounds.push(loadSound('materials/sounds/Type3.mp3'));
  
  AC_SFX = loadSound('materials/sounds/AC_SFX.mp3');
  backgroundMS = loadSound('materials/sounds/DarkPiano_Silence.mp3');
  CardFlip1 = loadSound('materials/sounds/CardFlip1.mp3');
  CardFlip2 = loadSound('materials/sounds/CardFlip2.wav');
  HeartLost = loadSound('materials/sounds/HeartLost.mp3');
  LevelUp = loadSound('materials/sounds/LevelUp.mp3');
  RoundStart = loadSound('materials/sounds/RoundStart.mp3');
  RoundLost = loadSound('materials/sounds/RoundLost.mp3');
  Complete = loadSound('materials/sounds/Complete.mp3');
  GameStart = loadSound('materials/sounds/GameStart.mp3');
}

/**********************************************
 * Setup
 **********************************************/
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log("Canvas width:", width, "height:", height);

  // if using customFont globally: textFont(customFont);

  // Calculate X for 3 columns
  CardX1 = width / 2 - CardWidth / 2 - 270;
  CardX2 = width / 2 - CardWidth / 2;
  CardX3 = width / 2 - CardWidth / 2 + 270;

  initializeRound();
  createHearts(); // create hearts once initially

  messageStartTime = millis();

  // Check difficulty
  if (DifficultySL) {
    console.log('Difficulty Level Selected:', DifficultySL);
    if (DifficultySL == 1) console.log('Crazy Difficulty selected.');
    else if (DifficultySL == 2) console.log('Insane Difficulty selected.');
    else if (DifficultySL == 3) console.log('Lunatic Difficulty selected.');
  } else {
    console.log('No difficulty level selected.');
  }
  
  //Check for Achivements
  if (!OneUse3) {
	  if (AC_MG3_1 !== null) {
		  MG3_1 = AC_MG3_1;
		  console.log("Achievement-(MG3_1): You Never Lost. Right?");
	  }
	  if (AC_MG3_2 !== null) {
		  MG3_2 = AC_MG3_2;
		  console.log("Achievement-(MG3_2): The System Remembers, Even If You Don't");
	  }
	  if (AC_MG3_3 !== null) {
		  MG3_3 = AC_MG3_3;
		  console.log("Achievement-(MG3_3): Memory Fragment Lost");
	  }
	  
	  if (TotorialComplete_C !== null) {
		  TotorialComplete = TotorialComplete_C;
	  } 
	  
	  OneUse3 = true;
  }
  
  // Play background music on loop
  backgroundMS.loop();
  backgroundMS.setVolume(0.4);
  
  windowResized();
}

/**********************************************
 * Round / Card Setup
 **********************************************/
function initializeRound() {
  initializeRandomCardPairs();
  createAllCards();
  
  if (OneUse2 == false) {
	GameStart.setVolume(0.9);
	GameStart.play();  
	OneUse2 = true;
  }
}

function initializeRandomCardPairs() {
  if (currentRound === 1) {
    const choice = Math.floor(Math.random() * 2);
    if (choice === 0) setV11Config();
    else setV21Config();
    round1BackChoice = currentBackImagePath;

    pickAndShuffleFronts();
    logFrontSelection();
    logAdminCardOrderIfEnabled();

  } else if (currentRound === 2) {
    if (round1BackChoice && round1BackChoice.includes('MemortBackCardV11')) setV21Config();
    else setV11Config();
    pickAndShuffleFronts();
    logFrontSelection();
    logAdminCardOrderIfEnabled();

  } else {
    const v2Options = [
      'materials/images/cards/V2/Card1.png',
      'materials/images/cards/V2/Card2.png',
      'materials/images/cards/V2/Card3.png',
      'materials/images/cards/V2/Card4.png',
      'materials/images/cards/V2/Card5.png',
      'materials/images/cards/V2/Card6.png',
    ];
    const chosenV2 = [];
    while (chosenV2.length < 3) {
      const randIndex = Math.floor(Math.random() * v2Options.length);
      const c = v2Options[randIndex];
      if (!chosenV2.includes(c)) chosenV2.push(c);
    }
    cardImages = [...chosenV2, ...chosenV2];
    shuffleArray(cardImages);

    currentBackImagePath = 'materials/images/cards/V2/Card0.png';

    const friendlyFronts = chosenV2.map(f => f.split('/').pop()).join(', ');
    console.log(`Round ${currentRound}: Using V2 logic. Cards: ${friendlyFronts}`);

    if (AdminHelper) {
      console.log(`AdminHelper: Round ${currentRound} card order:`);
      cardImages.forEach((img, idx) => {
        console.log(`  [${idx}]: ${img.split('/').pop()}`);
      });
    }
  }
}

function setV11Config() {
  currentBackImagePath = 'materials/images/cards/V1/MemortBackCardV11.png';
  currentFrontImagePool = [
    'materials/images/cards/V1/MemoryCard1.2.png',
    'materials/images/cards/V1/MemoryCard2.2.png',
    'materials/images/cards/V1/MemoryCard3.2.png',
    'materials/images/cards/V1/MemoryCard4.2.png'
  ];
}

function setV21Config() {
  currentBackImagePath = 'materials/images/cards/V1/MemortBackCardV21.png';
  currentFrontImagePool = [
    'materials/images/cards/V1/MemoryCard5.2.png',
    'materials/images/cards/V1/MemoryCard6.2.png',
    'materials/images/cards/V1/MemoryCard7.2.png',
    'materials/images/cards/V1/MemoryCard8.2.png'
  ];
}

function pickAndShuffleFronts() {
  const selectedFronts = [];
  while (selectedFronts.length < 3) {
    const randIndex = Math.floor(Math.random() * currentFrontImagePool.length);
    const chosen = currentFrontImagePool[randIndex];
    if (!selectedFronts.includes(chosen)) selectedFronts.push(chosen);
  }
  cardImages = [...selectedFronts, ...selectedFronts];
  shuffleArray(cardImages);
}

function logFrontSelection() {
  const friendlyBack = currentBackImagePath.split('/').pop();
  const uniqueFronts = [...new Set(cardImages)];
  const friendlyFronts = uniqueFronts.map(f => f.split('/').pop()).join(', ');
  console.log(`Round ${currentRound}: Back = ${friendlyBack}, Cards: ${friendlyFronts}`);
}

function logAdminCardOrderIfEnabled() {
  if (AdminHelper) {
    console.log(`AdminHelper: Round ${currentRound} card order:`);
    cardImages.forEach((img, idx) => {
      console.log(`  [${idx}]: ${img.split('/').pop()}`);
    });
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**********************************************
 * Hearts
 **********************************************/
function createHearts() {
  hearts = [];
  heartsLost = 0;

  // Place hearts higher => let's say 200 px from bottom
  let totalWidth = HEART_COUNT * heartWidth + (HEART_COUNT - 1) * heartSpacing;
  let startX = (width - totalWidth) / 2;
  let y = height - heartHeight - 100;

  heartsRectX = startX - 10;
  heartsRectY = y - 10;
  heartsRectW = totalWidth + 20;
  heartsRectH = heartHeight + 20;

  for (let i = 0; i < HEART_COUNT; i++) {
    let x = startX + i * (heartWidth + heartSpacing);
    let heart = createImg('materials/images/HealthBar/ActiveHeart.png', `heart-${i}`);
    heart.size(heartWidth, heartHeight);
    heart.position(x, y);
    hearts.push(heart);
  }
}

/**********************************************
 * Cards / Game Logic
 **********************************************/
function createAllCards() {
  cards = [];
  // 1st row
  cards.push(createCard(CardX1, CardY123, 0));
  cards.push(createCard(CardX2, CardY123, 1));
  cards.push(createCard(CardX3, CardY123, 2));
  // 2nd row
  cards.push(createCard(CardX1, CardY456, 3));
  cards.push(createCard(CardX2, CardY456, 4));
  cards.push(createCard(CardX3, CardY456, 5));

  // Hide them until round message is done
  cards.forEach(c => c.hide());
}

function createCard(x, y, index) {
  const card = createImg(currentBackImagePath, `Card-${index + 1}`);
  card.size(CardWidth, CardHeight);
  card.position(x, y);
  card.mousePressed(() => handleCardPress(card, index));
  return card;
}

function handleCardPress(card, index) {
	if (StartBarrier == false) {
	  if (isProcessing || showRoundMessage || showLostMessage || matchedCards.includes(index)) return;
	  
	  CardFlip1.play();  
	  
	  const frontImagePath = cardImages[index];
	  card.attribute('src', frontImagePath);
	  visibleCards.push({ card, index });

	  if (visibleCards.length === 2) {
		isProcessing = true;
		const [first, second] = visibleCards;

		if (cardImages[first.index] === cardImages[second.index]) {
		  
		  setTimeout(() => {
			Complete.play();	
		  }, 500);
			
		  console.log('Match found!');
		  matchedCards.push(first.index, second.index);

		  first.card.removeAttribute('mousePressed');
		  second.card.removeAttribute('mousePressed');
		  visibleCards = [];
		  isProcessing = false;
		  checkForRoundCompletion();

		} else {
		  console.log('No match!');
		  loseOneHeart();

		  setTimeout(() => {
			CardFlip2.play();    
			  
			first.card.attribute('src', currentBackImagePath);
			second.card.attribute('src', currentBackImagePath);
			visibleCards = [];
			isProcessing = false;
		  }, 2000);
		}
	  }
	}
}

function loseOneHeart() {
	
	HeartLost.play();
	
  if (heartsLost < HEART_COUNT) {
    let indexToKill = (HEART_COUNT - 1) - heartsLost;
    hearts[indexToKill].attribute('src', 'materials/images/HealthBar/DeadHeart.png');
    heartsLost++;
	
	//Achievement Storage - Memory Fragment Lost
	if (MG3_3 == false) {
		console.log("Memory Fragment Lost");
		localStorage.setItem('MG3_3', true);
		showAchievement("MG3_3");
		MG3_3 = true;
	}
  }
  if (heartsLost >= HEART_COUNT) {
    console.log("All hearts lost => wait 2s, then show lost message");
    isProcessing = true;
	
	//Achievement Storage - You Never Lost. Right?
	if (MG3_1 == false) {
		console.log("You Never Lost. Right?");
		localStorage.setItem('MG3_1', true);
		showAchievement("MG3_1");
		MG3_1 = true;
	}
	
    setTimeout(() => {
      showLostMessage = true;
      lostMessageStartTime = millis();
    }, 2000);
  }
}

/**********************************************
 * Round Completion
 **********************************************/
function checkForRoundCompletion() {
  if (matchedCards.length === cardImages.length) {
	  
	LevelUp.play();  
	  
    console.log(`Round ${currentRound} Completed!`);
	
    setTimeout(() => {
      currentRound++;
      showRoundMessage = true;
      messageStartTime = millis();
      matchedCards = [];
      visibleCards = [];

      if (currentRound > TOTAL_ROUNDS) {
        cards.forEach(c => c.remove());
        cards = [];
		
		if (DifficultySL == "3") {
			//Achievement Storage - The System Remembers, Even If You Don't
			if (MG3_2 == false) {
				console.log("The System Remembers, Even If You Don't");
				localStorage.setItem('MG3_2', true);
				showAchievement("MG3_2");
				MG3_2 = true;
			}
		}
      } else {
        // do NOT reset hearts unless user loses
		
		RoundStart.play();
		
        cards.forEach(c => c.remove());
        cards = [];
        initializeRound();
      }
    }, 2000);
  }
}

/**********************************************
 * draw() / UI
 **********************************************/
function draw() {
  // if using customFont => textFont(customFont);

  // 1) "You lost" message
  if (showLostMessage) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
	
	if (OneUse == false) {
		RoundLost.play();  
		OneUse = true;
	}
    
    textSize(min(width * 0.08, 80)); // ⬅ Limits max size to 80px
    text('YOU LOST!', width / 2, height / 2);

    hearts.forEach(h => h.hide());
    cards.forEach(c => c.hide());

    if (millis() - lostMessageStartTime >= lostMessageDuration) {
      showLostMessage = false;
      isProcessing = false;

      if (currentRound > 1) currentRound--;
      matchedCards = [];
      visibleCards = [];

      hearts.forEach(h => h.remove());
      hearts = [];
      createHearts();
      initializeRound();
    }
    return;
  }

  // 2) Round message
  if (showRoundMessage) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);

	if (currentRound > TOTAL_ROUNDS) {
		textSize(min(width * 0.08, 70)); // ⬅ Reduced max size to 70px
		text('CONGRATULATIONS!', width / 2, height / 2 - 50);

		textSize(min(width * 0.06, 50)); // ⬅ Reduced max size to 50px
		text('You have completed all rounds!', width / 2, height / 2 + 20);

		textSize(min(width * 0.07, 55)); // ⬅ Reduced max size to 55px
		text('Code: X0X5', width / 2, height / 2 + 150);

		// Hide game elements when showing victory message
		cards.forEach(c => c.hide());
		hearts.forEach(h => h.hide());

      if (!victorySequenceStarted) {
        victorySequenceStarted = true;
        setTimeout(function() {
          localStorage.setItem('MiniGameN3', true);
          window.location.href = "../../../index.html";
        }, 5500);
      }
    } else {
      // The "Round X Completed!" and "Starting Round X..." messages
      textSize(min(width * 0.12, 100)); // ⬅ Max size 100px
      if (matchedCards.length === cardImages.length && currentRound <= TOTAL_ROUNDS) {
        text(`Round ${currentRound - 1} Completed!`, width / 2, height / 2 - 50);
        text(`Starting Round ${currentRound}...`, width / 2, height / 2 + 50);
      } else {
        text(`Round ${currentRound}`, width / 2, height / 2);
      }

      cards.forEach(c => c.hide());
      hearts.forEach(h => h.hide());

      if (millis() - messageStartTime >= roundMessageTimer && currentRound <= TOTAL_ROUNDS) {
        showRoundMessage = false;
        image(backgroundImage, 0, 0, width, height);

        cards.forEach(c => c.show());
        hearts.forEach(h => h.show());
      }
    }
  } else {
    // 3) Normal gameplay
    image(backgroundImage, 0, 0, width, height);

    // Draw Round text (with max size limit)
    textAlign(CENTER, TOP);
    fill(255);

    textSize(min(width * 0.11, 95)); // ⬅ Max size 95px
    text(`Round ${currentRound}`, width / 2, roundTextY);

    // Draw Matches text (with max size limit)
    textSize(min(width * 0.08, 90)); // ⬅ Max size 90px
    let pairsMatched = matchedCards.length / 2;
    text(`Matches: ${pairsMatched}/3`, width / 2, matchesTextY);

    // Draw Room Code (Round 1 only)
    if (currentRound == 1) {
      textSize(min(width * 0.08, 90)); // ⬅ Max size 90px
      text(`Join Room Code:`, width / 2, roomCodeTextY);
      text(`00-00-03`, width / 2, roomCodeTextY2);
    }

    // Draw hearts rectangle
    push();
    fill(0, 80);
    stroke(195);
    strokeWeight(2);
    rect(heartsRectX, heartsRectY, heartsRectW, heartsRectH, 20);
    pop();

    hearts.forEach(h => h.show());
    cards.forEach(c => c.show());
  }
}

/**********************************************
 * windowResized
 **********************************************/
function windowResized() {
  let newWidth = fullscreen() ? displayWidth : windowWidth;
  let newHeight = fullscreen() ? displayHeight : windowHeight;
  
  resizeCanvas(newWidth, newHeight);

  // Adjust background
  image(backgroundImage, 0, 0, width, height);

  // Maintain proportional scaling of game elements
  let aspectRatio = width / height;
  let heartScale = aspectRatio > 1.5 ? 0.06 : 0.08;

  // Adjust card dimensions
  CardWidth = width * 0.26;
  CardHeight = height * 0.23;

  let cardSpacingX = width * 0.28;
  let cardSpacingY = height * 0.02;

  // Adjust card positions dynamically
  CardX1 = width / 2 - CardWidth / 2 - cardSpacingX;
  CardX2 = width / 2 - CardWidth / 2;
  CardX3 = width / 2 - CardWidth / 2 + cardSpacingX;
  
  CardY123 = height * 0.22;
  CardY456 = CardY123 + CardHeight + cardSpacingY;

  if (cards.length > 0) {
    cards[0].position(CardX1, CardY123);
    cards[1].position(CardX2, CardY123);
    cards[2].position(CardX3, CardY123);
    cards[3].position(CardX1, CardY456);
    cards[4].position(CardX2, CardY456);
    cards[5].position(CardX3, CardY456);

    cards.forEach(card => {
      card.size(CardWidth, CardHeight);
    });
  }

  // Adjust hearts dynamically
  heartWidth = width * heartScale;
  heartHeight = heartWidth;
  heartSpacing = width * 0.008;

  let totalHeartWidth = HEART_COUNT * heartWidth + (HEART_COUNT - 1) * heartSpacing;
  let startX = (width - totalHeartWidth) / 2;
  let y = height * 0.9;

  heartsRectX = startX - 10;
  heartsRectY = y - 10;
  heartsRectW = totalHeartWidth + 20;
  heartsRectH = heartHeight + 20;

  hearts.forEach((heart, i) => {
    let x = startX + i * (heartWidth + heartSpacing);
    heart.position(x, y);
    heart.size(heartWidth, heartHeight);
  });

  //Store text positions globally so they update dynamically!
  roundTextY = height * 0.07;
  matchesTextY = height * 0.13;
  roomCodeTextY = height * 0.75;
  roomCodeTextY2 = height * 0.80;

  //Limit text size so it doesn't become huge!
  textSize(min(width * 0.08, 80));
  textSize(min(width * 0.05, 50));

  // Make sure all elements are shown correctly after resizing
  hearts.forEach(h => h.show());
  cards.forEach(c => c.show());
}


const characterDialogues = [
  "Ah, memory. A fascinating thing, isn’t it? The way the mind holds onto details, the patterns it recognizes… or fails to recognize. Shall we see how well yours functions?",
  "Before you lie six cards, face down. Your objective is simple flip them over and find the matching pairs. There are three pairs in total per round. A test of pattern recognition, logic, and most importantly your ability to remember what you’ve seen.",
  "But, of course, I must make it interesting. You have ten hearts. Every time you fail to match two cards, the cards will reset… and you will lose a heart. Lose all of them, and well… let’s just say progress is a privilege, not a guarantee.",
  "Ah, and one more thing should you deplete your hearts entirely, you’ll find yourself… a step backward. Wouldn’t that be unfortunate? So do try to focus.",
  "Let’s see if your memory is as sharp as you think it is. Begin."
];

let currentDialogueIndex = 0; // Track which dialogue to show
let currentText = ""; // The currently displayed text (animated)
let targetText = ""; // The full text for the current dialogue
let textIndex = 0; // Tracks the current character being displayed in the animation
let textAnimationInterval; // Holds the interval ID for text animation
let currentImageElement = null; // Track the currently visible image
let currentDialogueArray = characterDialogues;

// Function to play a random typing sound
function playRandomTypingSound() {
  const randomIndex = Math.floor(Math.random() * typingSounds.length);
  const sound = typingSounds[randomIndex];
  if (sound) {
    sound.setVolume(0.3); // Adjust volume as needed
    sound.play();
  }
}

// Create a function to show the character image and dialogue
function showCharacterDialogue() {
  // Create a container for the dialogue (if not already present)
  let dialogueContainer = document.getElementById("dialogue-container");
  if (!dialogueContainer) {
    dialogueContainer = document.createElement("div");
    dialogueContainer.id = "dialogue-container";
    dialogueContainer.style.position = "fixed";
    dialogueContainer.style.bottom = "20px";
    dialogueContainer.style.left = "50%";
    dialogueContainer.style.transform = "translateX(-50%)"; // Center horizontally
    dialogueContainer.style.display = "flex";
    dialogueContainer.style.flexDirection = "column"; // Stack character image and text box
    dialogueContainer.style.alignItems = "center"; // Center elements horizontally
    dialogueContainer.style.gap = "10px"; // Space between image and text box
    dialogueContainer.style.zIndex = "1000";
    document.body.appendChild(dialogueContainer);
  }

  // Create or update the character image
  let characterImage = document.getElementById("character-image");
  if (!characterImage) {
    characterImage = document.createElement("img");
    characterImage.id = "character-image";
    characterImage.src = "materials/images/TitBit/TitBitV1.png";
	characterImage.style.backgroundColor = "rgba(100, 100, 100, 0.2)"; // Semi-transparent box
    characterImage.style.position = "fixed";
    characterImage.style.top = "20px";
    characterImage.style.right = "20px";
    characterImage.style.width = "150px";
    characterImage.style.height = "auto";
    characterImage.style.borderRadius = "10px";
    characterImage.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    document.body.appendChild(characterImage);
  }

  // Create or update the dialogue rectangle
  let dialogueTextContainer = document.getElementById("dialogue-text-container");
  if (!dialogueTextContainer) {
    dialogueTextContainer = document.createElement("div");
    dialogueTextContainer.id = "dialogue-text-container";
    dialogueTextContainer.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // White with 80% opacity
    dialogueTextContainer.style.color = "#000000"; // Black text
    dialogueTextContainer.style.padding = "15px";
    dialogueTextContainer.style.borderRadius = "10px";
    dialogueTextContainer.style.width = "300px"; // Adjust width as needed
    dialogueTextContainer.style.fontFamily = "Arial, sans-serif";
    dialogueTextContainer.style.fontSize = "16px";
    dialogueTextContainer.style.lineHeight = "1.5";
    dialogueTextContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
    dialogueTextContainer.style.textAlign = "center"; // Center text
    dialogueContainer.appendChild(dialogueTextContainer);
  }

  // Set the target text for the animation
  targetText = characterDialogues[currentDialogueIndex];
  currentText = ""; // Reset current text
  textIndex = 0; // Reset text index

  // Hide the currently visible image, if any
  if (currentImageElement) {
    currentImageElement.hide();
    currentImageElement = null;
  }

  // Determine which image to show and perform actions based on the current dialogue index
  switch (currentDialogueIndex) {
    case 2:

      break;
    case 3:

      break;
    case 4:

      break;
    case 5:

      break;
    case 6:

      break;
    case 7:

      break;
    default:
      // No image for other dialogues
      currentImageElement = null;
  }

  // Start animating the text
  textAnimationInterval = setInterval(() => {
    if (textIndex < targetText.length) {
      const currentChar = targetText[textIndex];
      currentText += currentChar;
      dialogueTextContainer.innerText = currentText;

      // Play sound only for letters
      if (/[a-zA-Z]/.test(currentChar)) {
        playRandomTypingSound();
      }

      textIndex++;
    } else {
      clearInterval(textAnimationInterval);
    }
  }, 50); // Adjust speed of text animation

  // Move to the next dialogue for subsequent calls
  currentDialogueIndex++;
}

// Advance dialogue on click
function advanceDialogue() {
	console.log('advanced dialogue');
  if (textIndex === targetText.length) {
    if (currentDialogueIndex < characterDialogues.length) {
      showCharacterDialogue();
    } else {
      let dialogueContainer = document.getElementById("dialogue-container");
      if (dialogueContainer) {
        dialogueContainer.style.display = "none";
        StartBarrier = false;
		
	    // Hide the character image at the end of the tutorial
        let characterImage = document.getElementById("character-image");
        if (characterImage) {
          characterImage.style.display = "none"; // Hides the character image
        }
		
		console.log('Totorial Completed!');
		localStorage.setItem('TotorialComplete_MiniGame3', true);
      }
      window.removeEventListener("click", advanceDialogue);
    }
  }
}

function animateCharacter1() {
  const characterImage = document.getElementById("character-image");

  // Initial starting position (top-right corner)
  characterImage.style.position = "fixed";
  characterImage.style.top = "20px";
  characterImage.style.right = "20px";

  // Add transition for smooth movement
  characterImage.style.transition = "all 1s ease"; // Adjust duration as needed

  // Step 1: Move character out of the canvas to the right
  setTimeout(() => {
    characterImage.style.right = "-150px"; // Move fully out of canvas (width + padding)
  }, 0);

  // Step 2: Change to the bottom-right outside the canvas
  setTimeout(() => {
    characterImage.style.transition = "none"; // Disable transition for instant position change
    characterImage.style.top = ""; // Reset top property
    characterImage.style.right = "-150px"; // Stay outside canvas on the right
    characterImage.style.bottom = "130px"; // Move to bottom-right outside the canvas
  }, 1000); // Match the duration of Step 1

  // Step 3: Re-enter the canvas from the right side
  setTimeout(() => {
    characterImage.style.transition = "all 1s ease"; // Re-enable transition
    characterImage.style.right = "20px"; // Move into the canvas from the right
  }, 1100); // Slight delay after Step 2 for smooth animation
}

function animateCharacter2() {
  const characterImage = document.getElementById("character-image");

  // Initial position (bottom-right corner)
  characterImage.style.position = "fixed";
  characterImage.style.bottom = "130px";
  characterImage.style.right = "20px";

  // Add transition for smooth movement
  characterImage.style.transition = "all 1s ease"; // Adjust duration as needed

  // Step 1: Move character out of the canvas to the right
  setTimeout(() => {
    characterImage.style.right = "-150px"; // Move fully out of canvas (width + padding)
  }, 0);

  // Step 2: Change to the top-right outside the canvas
  setTimeout(() => {
    characterImage.style.transition = "none"; // Disable transition for instant position change
    characterImage.style.bottom = ""; // Reset bottom property
    characterImage.style.right = "-150px"; // Stay outside canvas on the right
    characterImage.style.top = "20px"; // Move to top-right outside the canvas
  }, 1000); // Match the duration of Step 1

  // Step 3: Re-enter the canvas from the right side
  setTimeout(() => {
    characterImage.style.transition = "all 1s ease"; // Re-enable transition
    characterImage.style.right = "20px"; // Move into the canvas from the right
  }, 1100); // Slight delay after Step 2 for smooth animation
}


let fullscreenActivated = true;  //change back to false ==========================================================000

function mousePressed() {		
  if (Totorial && TotorialComplete == false) {
    Totorial = false;
    showCharacterDialogue();
    window.addEventListener("click", advanceDialogue);
  } else if (TotorialComplete == "true") {
	StartBarrier = false;  
  }
  if (StartBarrier) {
    //backgroundMusic.loop();
  }
  if (!fullscreenActivated && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
    fullscreenActivated = true; // Mark as activated
  }
}

function showAchievement(achievementCode) {
  // Ensure only one achievement is shown at a time
  let existingAchievement = document.getElementById("achievement-popup");
  if (existingAchievement) {
    existingAchievement.remove();
  }
  
  AC_SFX.setVolume(0.9);
  AC_SFX.play();
  
  // Create the achievement container
  let achievementContainer = document.createElement("div");
  achievementContainer.id = "achievement-popup";
  achievementContainer.style.position = "fixed";
  achievementContainer.style.top = `${window.innerHeight * 0.85}px`;
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
      localStorage.setItem('TotorialComplete_MiniGame3', true);
	  location.reload();
    } else if (userCode === "ResetT") {
      console.log("Code ResetT entered.");
      localStorage.removeItem('TotorialComplete_MiniGame3');
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