function calculate(){
	resetBackgroundColor();
	
	var legA = parseFloat(document.getElementById('legA').value);
	var legB = parseFloat(document.getElementById("legB").value);
	var hypC = parseFloat(document.getElementById('hypC').value);
	var angleV = parseFloat(document.getElementById('angleV').value);

	

	if(legA && legB){
		//window.alert("1");
		KnownLegs(legA, legB);

	}else if(legA && hypC ){
		//window.alert("2");
		KnownLegAndHypotenuse(legA, hypC);

	}else if(legA && angleV){
		//window.alert("3");
		KnownLegAAndAngleV(legA, angleV);
		
	}else if(legB && hypC){
		//window.alert("4");
		KnownLegAndHypotenuse(legB, hypC);
		
	}else if(legB && angleV){
		//window.alert("5");
		KnownLegBAndAngleV(legB, angleV);
		
	}else if(hypC && angleV){
		//window.alert("6");
		KnownHypotenuseAndAngleV(hypC, angleV);

	}else{
		return window.alert("Fyll inn to verdier");
	}

	//window.alert("7");
	calculateAngleV(parseFloat(document.getElementById("legB").value), 
					parseFloat(document.getElementById('hypC').value),
					parseFloat(document.getElementById('angleV').value));
}

function KnownLegs(legA, legB){
	var a = Math.pow(legA,2);
	var b = Math.pow(legB,2);

	var c = Math.sqrt(a+b)
	c = twoDecimals(c);
	document.getElementById("hypC").value = c;
	highlightBox("hypC");
}

function KnownLegAndHypotenuse(leg, hypotenuse){
	if(leg > hypotenuse){
		return window.alert("Hypotenus må være lengre en kateter!")
	}
	var a = Math.pow(leg,2);
	var c = Math.pow(hypotenuse,2);

	var temp = c - a;
	var b = Math.sqrt(temp);
	b = twoDecimals(b);


	if(document.getElementById('legA').value > 0){
		document.getElementById("legB").value = b;
		highlightBox("legB");
	}else{
		document.getElementById("legA").value = b;
		highlightBox("legA");
	}	
}

function KnownHypotenuseAndAngleV(hypotenuse, angleV){
	var opposite = Math.sin(degreeToRad(angleV)) * hypotenuse;
	opposite = twoDecimals(opposite);

	document.getElementById("legA").value = opposite;
	highlightBox("legA");

	KnownLegAndHypotenuse(opposite, hypotenuse);
}

function KnownLegBAndAngleV(leg, angleV){
	var legA = Math.tan(degreeToRad(angleV)) * leg;
	legA = twoDecimals(legA);

	document.getElementById("legA").value = legA;
	highlightBox("legA");

	KnownLegs(legA, leg);
}

function KnownLegAAndAngleV(leg, angleV){
	var hypC = leg / Math.sin(degreeToRad(angleV));
	hypC = twoDecimals(hypC);

	document.getElementById("hypC").value = hypC;
	highlightBox("hypC");

	KnownLegAndHypotenuse(leg, hypC);
}

function calculateAngleV(adjacent, hypotenuse, angle){
	if(angle){
		unHighlightBox("angleV");
		return;
	}
	var temp = adjacent/hypotenuse;
	var angle = Math.acos(temp) * 180/Math.PI;

	angle = roundDegrees(angle);
	document.getElementById("angleV").value = angle;
	highlightBox("angleV");
}

function twoDecimals(input){
	return Math.round(input *100) / 100;
}

function oneDecimal(input){
	return Math.round(input *10) / 10;
}

function roundDegrees(input){
	return Math.round(input * 10) / 10;
}

function resetBackgroundColor(){

	var numberInputFields = document.getElementsByClassName("ui-input-text");
	for(var i = 0; i < numberInputFields.length; i++){
  		numberInputFields[i].style.backgroundColor = "white", "!important";
	}
}

function degreeToRad(deg){
	return deg * Math.PI / 180;
}

function highlightBox(id){
	var numberInputFields = document.getElementsByClassName("ui-input-text");
	var numberElements = document.getElementsByClassName("numbah");
	for(var i = 0; i < numberElements.length; i++){
		if(numberElements[i].getAttribute('id') == id){
			numberInputFields[i].style.backgroundColor = "#6f3", "!important";
		}
	}
}

function unHighlightBox(id){
	var numberInputFields = document.getElementsByClassName("ui-input-text");
	var numberElements = document.getElementsByClassName("numbah");
	for(var i = 0; i < numberElements.length; i++){
		if(numberElements[i].getAttribute('id') == id){
			numberInputFields[i].style.backgroundColor = "#fff", "!important";
		}
	}
}

function emptyValues () {
	document.getElementById('legA').value = "";
	document.getElementById('legB').value = "";
	document.getElementById('hypC').value = "";
	document.getElementById('angleV').value = "";
	resetBackgroundColor();
}


var measuredAngle = 0;

var toCalculator =  false;
function handleOrientation(gamma, beta, alpha){
	//var gamma = twoDecimals(gamma);
	var beta = oneDecimal(beta);
	//var alpha = twoDecimals (alpha);




	if(measuredAngle - beta > 0.5 || measuredAngle - beta < -0.5 ){
		measuredAngle = beta;
	}
	

	//document.getElementById("doDirection").innerHTML = alpha;
	//document.getElementById("doTiltLR").innerHTML = gamma;
	document.getElementById("angle").innerHTML = measuredAngle  +"" +"&deg;";
	if(toCalculator){
		document.getElementById("angleV").value=(measuredAngle);
		toCalculator = false;
	}
}

$(function  () {
	$("[data-role='header'], [data-role='footer']").toolbar();


	//Toggles "hightlight" on the latest pressed button. all others are "dark"
	$(".footerButton").click(function(event){
		$("#footer").children("a").each(function(){
			$(this).css("border-bottom", "none");

			//if button clicked is event.target is the a href button itself
			if(event.target.id == this.id){
				$(event.target).css("border-bottom", "solid 8px #009de0");

			//if button clicked is event.target is of the image within (child) the a href button => change borders of parent
			}else if(event.target.parentElement.id == this.id){
				$(event.target.parentElement).css("border-bottom", "solid 8px #009de0");
			}
		});
	});


	//hides footer when input is in focus
	$(document).on("focus", "input, number", function(){
		$("#footer").hide();
	})

	//shows footer when input is blurred
	$(document).on("blur", "input, number", function(){
		$("#footer").show();
	})

	

	//listens for keyboard appearing/disappearing
	var initialScreenHeight = window.innerHeight;
	$( window ).resize(function() {
		if(window.innerHeight == initialScreenHeight){
  			$("input").each(function(){
  				this.blur();
  			})
  		}
  	});



  	$(document).on("swipeleft", "#pageOne, #pageTwo", function(event){
  		if(event.handled !== true){	//prevents event triggering more than once
  			var nextPage = $.mobile.activePage.next("[data-role='page']");

  			if(nextPage.length > 0){
  				$.mobile.changePage(nextPage, {transition: "slide", reverse: false}, true, true);
  				$("#calculatorBtn").css({"border-bottom" : "none"});
  				$("#angleToolBtn").css({"border-bottom" : "8px solid #009de0"});
  			}
  			event.handled = true;
  		}
  		return false;
  	});

  	$(document).on("swiperight", "#pageOne, #pageTwo", function(event){
  		if(event.handled !== true){	//prevents event triggering more than once
  			var prevPage = $(this).prev("[data-role='page']");

  			if(prevPage.length > 0){
  				$.mobile.changePage(prevPage, {transition: "slide", reverse: true}, true, true);
  				$("#calculatorBtn").css({"border-bottom" : "8px solid #009de0"});
  				$("#angleToolBtn").css({"border-bottom" : "none"});
  			}
  			event.handled = true;
  		}
  		return false;
  	});

  	//Checks if jQuery Mobile script is loaded
  	/*if($.mobile !== undefined){
  		window.alert("Mobile");
  	}else{
  		window.alert("Imobile");
  	}*/
});

window.onload = function(){
	document.getElementById("calculate").onclick = function(){calculate();};
	document.getElementById("empty").onclick = function(){emptyValues();};
	document.getElementById("measureAngle").onclick = function(){myMeasure();};

	document.addEventListener("touchmove", this._preventDefault, {passive: false});


	var measureData = [];
	var measure = false;
	var lastUpdate = 0;

	function myMeasure(){
		toCalculator = true;
	}
		
	
	if(window.DeviceOrientationEvent){
		//document.getElementById("angleMeasure").innerHTML = "Device Orientation";

		window.addEventListener("deviceorientation", function(eventData){

			var tiltLR = eventData.gamma;
			var tiltFB = eventData.beta;
			var dir = eventData.alpha;
			handleOrientation(tiltLR, tiltFB, dir);

		}, false);
	}else{
		document.getElementById("angleMeasure").innerHTML = "Not supported."
	}


	//Checks if jQuery script has loaded
	/*if (window.jQuery) {  
        // jQuery is loaded  
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }*/
};
