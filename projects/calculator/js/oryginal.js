$(document).ready(function(){
	
	var buttons = document.getElementsByClassName("but");
	var screen = document.getElementsByClassName('screen');
	screen = screen[0];
	var digit = document.getElementsByClassName("digits");
	var operators = document.getElementsByClassName("ops");

	var operator ="";	
	var number  = "";
	var newNumber = "";

	//fixixng number to specified deciaml point
	function fix(fixNumber){
		var div = Math.pow(10,4);
		fixNumber = Math.round(fixNumber * div) / div;
		return fixNumber;
	}

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
		var realOperator = button;
			
		if (button == "AC") {
			operator ="";	
		
			 number  = "";
			newNumber = "";
			screen.innerHTML = "0";
		}
		
		if (button == "CA") {
			operator ="";	
			if (number) {
				newNumber = "";
			} else {
				number = "";
			}
			screen.innerHTML = "0";	
		}
		
		if (newNumber && number && button != operator){
			
			button = operator;
		}
		
		if (button == "equals" && newNumber && number ) {
			if (operator) {
				tempOperator = button;
				button = operator;
			}
		}
		
		//operator = button;
		if(number) {
				operator = button;
			}
		
		switch (button) {
			
			case "+":
			
			if (number && newNumber) {
				operator = button;
				screen.innerHTML = "";
				var result = parseFloat(number) + parseFloat(newNumber);
				result = fix(result);
				screen.innerHTML = result;
				number = result;
				newNumber = "";
				operator = realOperator;
			}
			break;
			
			case "-":
					
			if (number && newNumber) {
				operator = button;
				screen.innerHTML = "";
				var result = parseFloat(number) - parseFloat(newNumber);
				result = fix(result);
				screen.innerHTML = result;
				number = result;
				newNumber = "";
				operator = realOperator;
			}
			break;
			
			case "multi":
			
			if (number && newNumber) {
				operator = button;
				screen.innerHTML = "";
				var result = parseFloat(number) * parseFloat(newNumber);
				result = fix(result);
				screen.innerHTML = result;
				number = result;
				
				newNumber = "";
				operator = realOperator;				
			}
			break;
		
			case "/":
			
			if (number && newNumber) {
				operator = button;
				screen.innerHTML = "";
				var result = parseFloat(number) / parseFloat(newNumber);
				result = fix(result);
				screen.innerHTML = result;
				number = result;
				newNumber = "";
				operator = realOperator;
			}
			break;
			case "per":
				if (number) {
					operator = button;
					screen.innerHTML = "";
					var result = parseFloat(number) /100;
					screen.innerHTML = result;
					number = result;
					newNumber = "";
					operator = realOperator;
				}
				if (newNumber) {
					operator = button;
					screen.innerHTML = "";
					var result = parseFloat(newNumber) /100;
					screen.innerHTML = result;
					number = result;
					
					newNumber = "";
					operator = realOperator;
				}	
			break;
		}
	}
	//event handlers attached
	var digitLength = digit.length;
	var operatorsLength = operators.length;
		
	if (document.addEventListener) { 
		for(var i = 0; i < operatorsLength; i++){
		operators[i].addEventListener('click', operation);
		}
	} else if(document.attachEvent) {
		for(var i = 0; i < operatorsLength; i++){
		operators[i].attachEvent('conlick', operation);
		}
	}
			
	if (document.addEventListener) { 
		for(var i = 0; i < digitLength; i++){
		digit[i].addEventListener('click', basic);
		}
	} else if(document.attachEvent) {
		for(var i = 0; i < digitLength; i++){
		digit[i].attachEvent('onclick', basic);
		}
	}
	
	//for(var i = 0; i < digitLength; i++){
	//digit[i].addEventListener('click', basic);
	//}
});
