/********** GAMEPLAY SPECIFIC JAVASCRIPT **********/
//game content:

var restartGame = function() {
	document.getElementById("outro-container").style.display = 'none';
	totalSpins = 0;
	spinClickable = true;
	slightOfHand(spin1);
	//bigwin restart animation here:

	document.getElementById("small-win-connections").style.visibility ="hidden";
	document.getElementById("big-win-connections").style.visibility ="hidden";
	document.getElementById("cherry-anim").style.visibility ="hidden";
	document.getElementById("wild-anim").style.visibility ="hidden";
	document.getElementById("seven-anim").style.visibility ="hidden";
	document.getElementById("exploding-coins").style.visibility ="hidden";

	document.getElementById("small-win-connections").style.visibility ="hidden";
	document.getElementById("increase-bet").style.visibility = "visible";
	document.getElementById("decrease-bet").style.visibility = "visible";
	document.getElementById("winning-text").innerHTML = 0;
	mNectarGame.credits = 10000;
	mNectarGame.currentBet = 10;
	mNectarGame.winning = 0;
	mNectarGame.animationTime = 1500;
	mNectarGame.animationSteps = 50;
	mNectarGame.betLines = 30;
	mNectarGame.totalBet = 0;
	updateNumbers();
	document.getElementById("stop").className ="stop-btn-anim";
}
// CALL THIS WHEN THE USER FINISHES PLAYING YOUR BUILD
var finishGameplay = function() {
	if (typeof gotoEndScreen != 'undefined') {
		//this is a function in the engineering templates and will only work once this project is uploaded to the UI
		gotoEndScreen();
		//report that the user has finished the game
		if (typeof mn != 'undefined'){mn("play","100%");}
	}
	else {
		displayInstallScreen();
	}
}
//game content
var mNectarGame = {};
	mNectarGame.credits = 10000;
	mNectarGame.currentBet = 10;
	mNectarGame.winning = 0;
	mNectarGame.animationTime = 1500;
	mNectarGame.animationSteps = 50;
	mNectarGame.betLines = 30;
	mNectarGame.totalBet = 0;
	mNectarGame.bigwinAmount = 0;

var spin1 = [
				[9,8,6,7,3,7,2,8,10,10,9,3,5,8,2,6,7,2], //reel1
				[2,9,10,8,3,7,2,8,10,10,9,3,5,9,4,7,5,8],  //reel2
				[8,8,7,9,3,7,2,8,10,10,9,3,5,10,2,8,6,2], //reel3
				[10,3,7,8,3,7,2,8,10,10,9,3,5,9,10,10,8,4], //reel4
				[7,8,3,6,3,7,2,8,10,10,9,3,5,9,6,8,3,6] //reel5
			];

var spin2 = [
				[2,6,2,7,3,7,2,8,10,10,9,3,5,3,9,8,6,7],
				[5,7,9,8,3,7,2,8,10,10,9,3,5,9,2,9,10,8],
				[1,3,8,6,3,7,2,8,10,10,9,3,5,10,8,8,7,9],
				[4,9,10,9,3,7,2,8,10,10,9,3,5,9,10,3,7,8],
				[1,7,6,6,3,7,2,8,10,10,9,3,5,9,7,8,3,6]
			];

var spin3 = [
				[1,8,10,3,3,7,2,8,10,10,9,3,5,8,2,6,2,7],
				[3,3,10,7,3,7,2,8,10,10,9,3,5,9,5,7,9,8],
				[4,3,10,5,3,7,2,8,10,10,9,3,5,10,1,3,8,6],
				[3,3,10,1,3,7,2,8,10,10,9,3,5,9,4,9,10,9],
				[1,9,10,3,3,7,2,8,10,10,9,3,5,9,1,7,6,6]
			];

var totalSpins = 0;

var spinClickable = true;
document.getElementById("stop").className ="stop-btn-anim";

// document.getElementById("bigwintext2").className = bigwinfade.className.replace( /(?:^|\s)wintextglow(?!\S)/g , '' );

var animateNumbers = function(finalValueOfCredits,finalValueOfWin) {
	var differenceOfCredits = finalValueOfCredits - mNectarGame.credits;
	var differenceOfWin = finalValueOfWin;
	//if difference is neg, current credits goes down. If difference is positive, current credits goes up
	var period = mNectarGame.animationTime / mNectarGame.animationSteps;
	//how much we will add to credits on each step
	var increaseAmountOfCredits = differenceOfCredits / mNectarGame.animationSteps;
	var increaseAmountOfWin = differenceOfWin / mNectarGame.animationSteps;

	incrementNumbers(period,finalValueOfCredits,increaseAmountOfCredits,increaseAmountOfWin);
}

var incrementNumbers = function(period,finalValueOfCredits,increaseAmountOfCredits,increaseAmountOfWin,betLines,currentBet) {
	//run what you want to run here:
	mNectarGame.winning += increaseAmountOfWin;
	mNectarGame.credits += increaseAmountOfCredits;

	updateNumbers();

	numberIncrementInterval = setInterval(function(){
		//only if we have not reached our target
		if (mNectarGame.credits < finalValueOfCredits){
			mNectarGame.winning += increaseAmountOfWin;
			mNectarGame.credits += increaseAmountOfCredits;

			updateNumbers();
		
		} else if (mNectarGame.credits >= finalValueOfCredits) {
			clearInterval(numberIncrementInterval);
		};
	}, period);
}

var incrementBigWin = function(period,finalValueOfbigwin,increaseAmountOfbigwin) {
	//run what you want to run here:
	mNectarGame.bigwinAmount += increaseAmountOfbigwin;

	mNectarGame.bigwinAmount += mNectarGame.credits;

	bigwinIncrementInterval = setInterval(function(){
		//only if we have not reached our target
		if (mNectarGame.bigwinAmount < finalValueOfbigwin){
			mNectarGame.bigwinAmount += increaseAmountOfbigwin;

			document.getElementById("current-credits").innerHTML = delimitNumbers(mNectarGame.bigwinAmount);
		
		} else if (mNectarGame.bigwinAmount >= finalValueOfbigwin) {
			clearInterval(bigwinIncrementInterval);
		};
	}, period);
}

var maxBet = function() {
	mNectarGame.currentBet = 20;
	document.getElementById("decrease-bet").style.visibility = "visible";
	document.getElementById("increase-bet").style.visibility = "hidden";
	document.getElementById("max-bet").style.visibility = "hidden";
	var updateBet = delimitNumbers(mNectarGame.currentBet);
	var updateCurrentBet = delimitNumbers(mNectarGame.updateCurrentBet);
	document.getElementById("current-bet").innerHTML = updateCurrentBet;
	
	calculateTotalBet();

	updateNumbers();
}

var increaseBet = function() {
	if(typeof mn != 'undefined'){mn("play","other: increase bet");}
	  
	if (mNectarGame.currentBet === 15) {
		document.getElementById("max-bet").style.visibility = "hidden";
		document.getElementById("increase-bet").style.visibility = "hidden";
	} 
	if (mNectarGame.currentBet === 10) {
		document.getElementById("max-bet").style.visibility = "visible";
		document.getElementById("decrease-bet").style.visibility = "visible";
	}
	
	 
	mNectarGame.currentBet += 5;
	
	var updateCurrentBet = delimitNumbers(mNectarGame.updateCurrentBet);
	document.getElementById("current-bet").innerHTML = updateCurrentBet;
	
	calculateTotalBet();

	updateNumbers();
}

var calculateTotalBet = function() {
	mNectarGame.totalBet = mNectarGame.betLines*mNectarGame.currentBet;
	//document.getElementById("total-bet").innerHTML = mNectarGame.totalBet;
}

var decreaseBet = function() {
	if(typeof mn != 'undefined'){mn("play","other: decrease bet");}

	if (mNectarGame.currentBet === 10) {
		document.getElementById("max-bet").style.visibility = "visible";
		document.getElementById("decrease-bet").style.visibility = "hidden";
	} 
	if (mNectarGame.currentBet === 15) {
		document.getElementById("max-bet").style.visibility = "visible";
		document.getElementById("increase-bet").style.visibility = "visible";
	}

	mNectarGame.currentBet -= 5;
	var updateBet = delimitNumbers(mNectarGame.currentBet);
	var updateCurrentBet = delimitNumbers(mNectarGame.updateCurrentBet);
	document.getElementById("current-bet").innerHTML = updateCurrentBet;

	calculateTotalBet();
	
	updateNumbers();
}

function delimitNumbers(str) {
	return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
		return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
	});
}

//updating UI numbers as 1 function
var updateNumbers = function() {

	var localWinning = delimitNumbers(Math.round(mNectarGame.winning));
	document.getElementById("winning-text").innerHTML = localWinning;

	var localBet = delimitNumbers(mNectarGame.currentBet, mNectarGame.totalBet);
	
	document.getElementById("current-bet").innerHTML = localBet;

	var totalCredits = delimitNumbers(mNectarGame.credits);
	document.getElementById("current-credits").innerHTML = totalCredits;

}

//immediately running the above function
updateNumbers();

var replaceImages = function(reelInfo) {
	for (var r=1; r<=5; r++) {
		var currentReel = reelInfo[r-1];
		for (var e = 1; e <= 18; e++) {
			var element = 'reel'+r+"-"+e;
			document.getElementById(element).className ="image" + currentReel[e-1];
		}; 
	}
}

replaceImages(spin1);

var spin = function() {
	
	totalSpins ++;

	document.getElementById("spin-prompt").innerHTML = "good luck!";

	document.getElementById("winning-text").innerHTML = "0";
	mNectarGame.winning = 0;

	//tracking info for all 3 spins
	if (totalSpins === 1) {
		if(typeof mn != 'undefined'){mn("play","25%");}
	}

	if (totalSpins === 2) {
		if(typeof mn != 'undefined'){mn("play","50%");}

	}

	if (totalSpins === 3) {
		if(typeof mn != 'undefined'){mn("play","75%");}
	}

	//on spin, update credits and experience 
	animateNumbers(mNectarGame.credits - mNectarGame.totalBet,mNectarGame.winning);


	document.getElementById("winning-text").innerHTML = " ";
	updateNumbers();

	document.getElementById("reel1").className ="reel-spin";
	document.getElementById("stop").className ="stop-btn";
	document.getElementById("stop").style.visibility ="visible";
	document.getElementById("increase-bet").style.visibility = "hidden";
	document.getElementById("decrease-bet").style.visibility = "hidden";
	document.getElementById("max-bet").style.visibility = "hidden";

	setTimeout(function(){ 
		document.getElementById("reel2").className ="reel-spin";
	 }, 200);

	setTimeout(function(){ 
		document.getElementById("reel3").className ="reel-spin";
	 }, 400);

	setTimeout(function(){ 
		document.getElementById("reel4").className ="reel-spin";
	 }, 600);

	setTimeout(function(){ 
		document.getElementById("reel5").className ="reel-spin";
	 }, 800);

	document.getElementById("small-win-connections").style.visibility ="hidden";
	document.getElementById("big-win-connections").style.visibility ="hidden";
	document.getElementById("cherry-anim").style.visibility ="hidden";
	document.getElementById("wild-anim").style.visibility ="hidden";
	//document.getElementById("exploding-coins").style.visibility ="hidden";

	setTimeout(function(){ 
		if (totalSpins === 1){
			slightOfHand(spin2);

			document.getElementById("spin-prompt").innerHTML = "wow!";

			setTimeout(function(){ 
				var winAmount = mNectarGame.currentBet * 10;


				animateNumbers(mNectarGame.credits + winAmount,winAmount);



				setTimeout(function(){ 
					//small-win:
					document.getElementById("reel1-16").style.visibility = "hidden";
					document.getElementById("reel2-18").style.visibility = "hidden";
					document.getElementById("reel3-16").style.visibility = "hidden";
					document.getElementById("reel4-18").style.visibility = "hidden";
					document.getElementById("reel5-16").style.visibility = "hidden";

					document.getElementById("small-win-connections").style.visibility ="visible";
					document.getElementById("cherry-anim").style.visibility ="visible";
					
					spinClickable = true;
					document.getElementById("stop").className ="stop-btn-anim";
					document.getElementById("bet-changers").style.visibility = "visible";
					

					if (mNectarGame.currentBet === 5) {
						document.getElementById("decrease-bet").style.visibility = "hidden";
					} else {
						document.getElementById("decrease-bet").style.visibility = "visible";
					}
					if (mNectarGame.currentBet === 20) {
						document.getElementById("increase-bet").style.visibility = "hidden";
						document.getElementById("max-bet").style.visibility = "hidden";
					} else {
						document.getElementById("increase-bet").style.visibility = "visible";
						document.getElementById("max-bet").style.visibility = "visible";
					}
				}, 500);

			}, 500);
		}

		if (totalSpins === 2) {
			document.getElementById("spin-prompt").innerHTML = "tough luck. try again";
			slightOfHand(spin3);
			setTimeout(function(){ 
				spinClickable = true;
				document.getElementById("stop").className ="stop-btn-anim";
				document.getElementById("bet-changers").style.visibility = "visible";
				
				if (mNectarGame.currentBet === 5) {
						document.getElementById("decrease-bet").style.visibility = "hidden";
					} else {
						document.getElementById("decrease-bet").style.visibility = "visible";
					}
					if (mNectarGame.currentBet === 20) {
						document.getElementById("increase-bet").style.visibility = "hidden";
						document.getElementById("max-bet").style.visibility = "hidden";
					} else {
						document.getElementById("increase-bet").style.visibility = "visible";
						document.getElementById("max-bet").style.visibility = "visible";
					}
			}, 300);
		}

		if (totalSpins === 3){
			document.getElementById("spin-prompt").innerHTML = "you did it!";
			setTimeout(function(){ 
				var winAmount = 50000;
				var bigwinperiod = mNectarGame.animationTime / mNectarGame.animationSteps;

				document.getElementById("winning-text").innerHTML = "50,000";
				
				//big-win animation here:
					document.getElementById("reel1-4").style.visibility = "hidden";
					document.getElementById("reel2-2").style.visibility = "hidden";
					document.getElementById("reel3-2").style.visibility = "hidden";
					document.getElementById("reel4-2").style.visibility = "hidden";
					document.getElementById("reel5-4").style.visibility = "hidden";


					document.getElementById("big-win-connections").style.visibility = "visible";
					document.getElementById("wild-anim").style.visibility ="visible";
					document.getElementById("seven-anim").style.visibility ="visible";
					//document.getElementById("exploding-coins").style.visibility ="visible";
					//increment parameters:
					incrementBigWin(bigwinperiod,winAmount,winAmount/mNectarGame.animationSteps);
					
					// setTimeout(function(){
					// 	finishGameplay();
					// },4500);

 			}, 500);
		}
	 }, 2800);
}

var setVisibilityWithDelay = function(elementID,visibilityStatus,delay) {
	setTimeout(function(){ 
		document.getElementById(elementID).style.visibility = visibilityStatus;
	 }, delay);
}

var slightOfHand = function(reelInfo) {
	document.getElementById("reel1").className ="reel-top";
	document.getElementById("reel2").className ="reel-top";
	document.getElementById("reel3").className ="reel-top";
	document.getElementById("reel4").className ="reel-top";
	document.getElementById("reel5").className ="reel-top";
	replaceImages(reelInfo);
}

var spinClick = function() {
 	if (spinClickable === true) {
 		document.getElementById("reel1-16").style.visibility = "visible";
		document.getElementById("reel2-18").style.visibility = "visible";
		document.getElementById("reel3-16").style.visibility = "visible";
		document.getElementById("reel4-18").style.visibility = "visible";
		document.getElementById("reel5-16").style.visibility = "visible";

		document.getElementById("reel1-4").style.visibility = "visible";
		document.getElementById("reel2-2").style.visibility = "visible";
		document.getElementById("reel3-2").style.visibility = "visible";
		document.getElementById("reel4-2").style.visibility = "visible";
		document.getElementById("reel5-4").style.visibility = "visible";
 		spin();
 		spinClickable = false;
 	}
}	