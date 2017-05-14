window.onload = function() {
			var height = $(window).height() - $("footer").height();
			$("section").css("min-height", height);
			
			//animaation of the info box
			var $infoButton = $(".infoButton");
			var $infoButtonIcon = $(".infoButton > i");
			var $infoBox = $(".info");

			$infoButton.on('click', function(){
			
				if ( $infoBox.is( ":hidden" ) ){
					$infoBox.slideDown(1000);
					$infoButtonIcon.removeClass("fa fa-angle-double-down");
					$infoButtonIcon.addClass("fa fa fa-angle-double-up");
				} else {
					$infoBox.slideUp(1000);
					$infoButtonIcon.removeClass("fa fa fa-angle-double-up");
					$infoButtonIcon.addClass("fa fa-angle-double-down");
				}
			
			});

			$(".hide1").click(function (e){
			e.preventDefault;
			$infoBox.slideUp(1000);
				$infoButtonIcon.removeClass("fa fa fa-angle-double-up");
				$infoButtonIcon.addClass("fa fa-angle-double-down");
			});
			//variables for the timer
			var controlsEnabled = true;
			// +/- buttons 
			var controls = document.querySelectorAll("span.switch");
			
			var breakLenPlus = controls[0];
			var breakLenMinus = controls[1];
			
			var sessionLenPlus = controls[2];
			var sessionLenMinus = controls[3];
			//control idicators
			var timerBreak = document.getElementById("timerBreak");
			var timerSession = document.getElementById("timerSession");
			//timer
			var mainTimerMinuts = document.getElementById("timerMinuts");
			var mainTimerSeconds = document.getElementById("timerSeconds");
			mainTimerMinuts.innerHTML = timerSession.innerHTML;
			var stage  = document.getElementById("stage");
			var timerToggle = false;	
			//controls 	
			
			var audio = document.createElement('audio');
			audio.src = 'Bike Horn-SoundBible.com-602544869.mp3';
			
			function ammendControlsValue(e) {
				
				var target = e.target;
				var textBreak = timerBreak.innerHTML;
				var textSession = timerSession.innerHTML;
				
				if (controlsEnabled) {
				
					if (target == breakLenPlus ) {
						textBreak++;
						timerBreak.innerHTML = textBreak;
						if(stage.innerHTML == "Break") {
								mainTimerMinuts.innerHTML = textBreak;
								mainTimerSeconds.innerHTML = "00";
								}
						}  
						
					if (target == sessionLenPlus ){
						textSession++;
						timerSession.innerHTML = textSession;
						if (stage.innerHTML == "Session"){
								mainTimerMinuts.innerHTML = textSession;
								mainTimerSeconds.innerHTML = "00";
						}
					}
					if (target == breakLenMinus ){
						if (textBreak == 1){
								timerBreak.innerHTML = 1;
							} else {
								textBreak--;
								timerBreak.innerHTML = textBreak;
							}
							
							if(stage.innerHTML == "Break") {
								mainTimerMinuts.innerHTML = textBreak;
								mainTimerSeconds.innerHTML = "00";
							}
					}
					if (target == sessionLenMinus ){
						if (textSession == 1){
								timerSession.innerHTML = 1;
							} else {
								textSession--;
								timerSession.innerHTML = textSession;
							}
							if (stage.innerHTML == "Session"){
									mainTimerMinuts.innerHTML = textSession;
									mainTimerSeconds.innerHTML = "00";
						}
					}		
				}
			}
			//progress bar function
			function progressIndicator(start, min, sec) {
				sec = parseInt(sec);
				var setTime = start * 60;
				var remainingTime = min * 60 + sec;
				var per = (remainingTime / setTime) * 100;
				document.getElementById("progress").style.height = per + "%";
			}
			
			// timer function
			var interval;	
			function timer(e) {
					var setMinutes = mainTimerMinuts.innerHTML;
					var setSeconds = mainTimerSeconds.innerHTML;
			
					if (setSeconds == 00) {
						setSeconds = 60;
						setMinutes -= 1;
					}
					interval = window.setInterval(function () {
					setSeconds = setSeconds - 1;
					
						if (setSeconds == 00 && setMinutes > 0) {
							setMinutes -= 1;
							setSeconds = 60;
						}
					
						
						if (setSeconds < 10){
							setSeconds = "0" + setSeconds;
						}
						if (setSeconds == 00 && setMinutes < 1) {
							
							window.clearInterval(interval);
							audio.play();
							if (stage.innerHTML == "Session"){
								stage.innerHTML = "Break";
								mainTimerMinuts.innerHTML = timerBreak.innerHTML;
								
							} else if (stage.innerHTML == "Break"){
								stage.innerHTML = "Session";
								mainTimerMinuts.innerHTML = timerSession.innerHTML;
							}
							mainTimerSeconds.innerHTML = 00;				
							timer();											
						} 
							
						mainTimerMinuts.innerHTML = setMinutes;
						mainTimerSeconds.innerHTML = setSeconds;
						
						if (stage.innerHTML == "Session") {
							progressIndicator(timerSession.innerHTML, setMinutes, setSeconds);
						} 
						
						if (stage.innerHTML == "Break"){
							progressIndicator(timerBreak.innerHTML, setMinutes, setSeconds);
						}
						
					}, 1000);
			}
			
			function timerCountdown(e){
				if (!timerToggle){
					timerToggle = true;
					controlsEnabled = false;
					timer();
				} else {
					timerToggle = false;
					controlsEnabled = true;
					window.clearInterval(interval);
				}
			}
		//adding event handlers
		for(var i = 0; i < controls.length; i++){
					
			controls[i].addEventListener("click", ammendControlsValue);
		}

		document.getElementsByClassName("clock")[0].addEventListener("click", timerCountdown);	
		
		
}



	
	
	


