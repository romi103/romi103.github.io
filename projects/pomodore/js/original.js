

window.onload = function() {
			var height = $(window).height();
			$("body").css("min-height", height);

	
			
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
			
			var mainTimerMinuts = document.getElementById("timerMinuts");
			var mainTimerSecunds = document.getElementById("timerSeconds");
			mainTimerMinuts.innerHTML = timerSession.innerHTML;
			mainTimerSecunds.innerHTML;
			
			var stage  = document.getElementById("stage");
			
			var timerToggle = false;
			
			//controls function 	
			
				
				
			
			
			function ammendControlsValue(e) {
				
				var target = e.target;
				var textBreak = timerBreak.innerHTML;
				var textSession = timerSession.innerHTML;
				
				if (controlsEnabled) {
				
					if (target == breakLenPlus) {
						textBreak++;
						timerBreak.innerHTML = textBreak;		
						} else if (target == sessionLenPlus){
							textSession++;
							timerSession.innerHTML = textSession;
						}
					if (target == breakLenMinus ){
						if (textBreak == 0){
								timerBreak.innerHTML = 0;
							} else {
								textBreak--;
								timerBreak.innerHTML = textBreak;
							}
					}
					if (target == sessionLenMinus ){
						if (textSession == 0){
								timerSession.innerHTML = 0;
							} else {
								textSession--;
								timerSession.innerHTML = textSession;
								
							}
					}
				mainTimerMinuts.innerHTML = textSession;					
			}
			}
			
			
			// timer constractor
			
			
				var interval;	
			
			function timer(e) {
				
}
			
		
			function timerCountdown(e){
				
				
				if (!timerToggle){
					timerToggle = true;
					controlsEnabled = false;
					
					stage.innerHTML = "Session!";
					
					
					
					var setMinutes = mainTimerMinuts.innerHTML;
					var setSeconds = mainTimerSecunds.innerHTML;
			
					if (setSeconds == 00) {
						setSeconds = 60;
						setMinutes -= 1;
					}
					
					interval = window.setInterval(function () {
					setSeconds = setSeconds - 1;
					
				
					
					if (setSeconds < 10){
						setSeconds = "0" + setSeconds;
					}
					
					if (setSeconds == 00 && setMinutes == 0) {
						
						window.clearInterval(interval);
						mainTimerMinuts.innerHTML = 0;
						mainTimerSecunds.innerHTML = 00;
						
						
						} 
						
					mainTimerMinuts.innerHTML = setMinutes;
					mainTimerSecunds.innerHTML = setSeconds;
					
				}, 1000);
			
			
				} else {
					timerToggle = false;
					controlsEnabled = true;
					window.clearInterval(interval);
					
					
				}
			}
				
				
				

			
		for(var i = 0; i < controls.length; i++){
					
			controls[i].addEventListener("click", ammendControlsValue);
			
		
		}
		
		document.getElementsByClassName("clock")[0].addEventListener("click", timerCountdown);
		
		
}



	
	
	


