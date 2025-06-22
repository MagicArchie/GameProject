const THREE = window.MINDAR.IMAGE.THREE; // Use THREE.js from the MindAR library

// Wait for the DOM content to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  let mindarThree = null; // Variable to hold the AR session instance
  let isStarted = false;  // Flag to track if the AR session is running

  // Function to start the AR experience
  const start = async () => {
    if (isStarted) return; // If already started, do nothing
    isStarted = true;      // Mark the session as started

    // Initialize MindAR with the container and image target configuration
    mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,                // Use the whole page as the AR view
      imageTargetSrc: './assets/targets/targets.mind' // Define the image target file
    });
    const {renderer, scene, camera} = mindarThree;

    const Anchor0 = mindarThree.addAnchor(0);
        Anchor0.onTargetFound = () => {
     
		console.log("Target 0 Found!");
		window.location.href = "./pages/Video1/index.html"; // Redirect to page 1
		//window.open('https://www.mindar.org/', '_self'); 
	};
   
    const Anchor1 = mindarThree.addAnchor(1);
		Anchor1.onTargetFound = () => {
     
		console.log("Target 1 Found!");
		window.location.href = "./pages/Video2/index.html"; // Redirect to page 2
        //window.open('https://www.mindar.org/', '_self'); 
	};
		
	const Anchor2 = mindarThree.addAnchor(2);
		Anchor2.onTargetFound = () => {
     
		console.log('Target 2 Found!');
		window.location.href = './pages/Video3/index.html'; // Redirect to page 3
        //window.open('https://www.mindar.org/', '_self'); 
    };
	
	const Anchor3 = mindarThree.addAnchor(3);
		Anchor3.onTargetFound = () => {
     
		console.log('Target 3 Found!');
		window.location.href = './pages/Video4/index.html'; // Redirect to page 4
        //window.open('https://www.mindar.org/', '_self'); 
    };
   
    // Start the AR experience and continuously render the scene
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    // Enable stop button, disable start button
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
  };

  // Function to stop the AR experience
  const stop = () => {
    if (!isStarted) return; // Prevent stopping if not started
    isStarted = false;

    // Stop the AR experience and animation loop
    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
    mindarThree = null; // Reset the AR instance

    // Enable start button, disable stop button
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
  };

  // Add event listeners to the start and stop buttons
  document.getElementById('startButton').addEventListener('click', start);
  document.getElementById('stopButton').addEventListener('click', stop);
});