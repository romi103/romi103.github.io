$(document).ready(function(){
	
	var buttons = document.getElementsByClassName("but");
	
	var screen = document.getElementsByClassName('screen');
	screen = screen[0];
	
	var digit = document.getElementsByClassName("digits");
	var operators = document.getElementsByClassName("ops");
	
	
var operator ="";	
var number  = "";
var newNumber = "";


	function basic(e){
		var target = e.target;
		var button = target.value;
			
			
			if(operator) {
				newNumber = newNumber + button;
				screen.innerHTML =  newNumber;
				
			} else {
				number = number + button;
				screen.innerHTML =  number;
			
			}
	}
	
	function operation(e) {
		
		var target = e.target;
		var button = target.value;
		var tempOperator = "";
		
		
		
		if (button == "equals" && newNumber && number ) {
			if (operator == "+") {
				
				button = operator;
			}
			
			if (operator == "-") {
				
				button = operator;
			}
		}
		
	
		
		
		switch (button) {
			case "+":
			
			operator = button;
			
			
			if(number) {
				operator = button;
			}
			
			
				if (number && newNumber) {
				screen.innerHTML = "";
				var result = parseFloat(number) + parseFloat(newNumber);
				screen.innerHTML = result;
				number = result;
				
				newNumber = "";
				
			}
			break;
			
			case "-":
			
			operator = button;
			
			
			if(number) {
				operator = button;
			}
			if (number && newNumber) {
				screen.innerHTML = "";
				var result = parseFloat(number) - parseFloat(newNumber);
				screen.innerHTML = result;
				number = result;
				
				newNumber = "";
				
			}
			break;
			
		}
	}
		
		
	
	var digitLength = digit.length;
	var operatorsLength = operators.length;
	
	for(var i = 0; i < operatorsLength; i++){
	operators[i].addEventListener('click', operation);
	}
	
	for(var i = 0; i < digitLength; i++){
	digit[i].addEventListener('click', basic);
	}
});
