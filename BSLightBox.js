/*
Light box has two modes: Fit and Resize
Fit display will make the image fit to the size of the screen.
Resize image will make the image display at 100% with the ability to resize.

Place "bsLightBox" into the class of any image to use this

Built with HTML5 in mind
*/
(function(){
document.body.onclick = OpenLightBox;

var storedImgSize;
var currentSize = 0;
var bsLightBoxCheckImgs = document.getElementsByTagName("IMG");
var bsLightBoxTotalImgs = 0;
var bsLightBoxImgArray = [];
var current = 0;
	
if(document.getElementById("AboutBSLightBox")){
	document.getElementById("AboutBSLightBox").className = "important";
	document.getElementById("AboutBSLightBox").innerHTML = "Click images for lightbox";
}

function OpenLightBox(){
	if(event.target.className.indexOf("bsLightBox") === -1 || document.getElementById("LightBox")){
		return;
	}
	
	document.body.setAttribute("style", "overflow: hidden");
	
	var shade = document.createElement("DIV");
	shade.setAttribute("id", "LightBox");
	shade.setAttribute("style", "background-color: #000000; height: 100%; position: fixed; top: 0; vertical-align: middle; width: 100%");
	
	var topControls = document.createElement("DIV");
	topControls.setAttribute("style", "background-color: #ffffff; margin-bottom: 10px; padding: 5px 0; text-align: center");
	topControls.setAttribute("style", "background-color: #ffffff; margin-bottom: 10px; padding: 5px 0; position: fixed; text-align: center; width: 100%");
	
	var imgDiv = document.createElement("DIV");
	imgDiv.setAttribute("id", "LightBoxImgDiv");
	var img = document.createElement("IMG");
	imgDiv.appendChild(img);
	img.setAttribute("id", "LightBoxImg");
	img.setAttribute("src", event.target.src);
	img.setAttribute("style", "background-color: #ffffff; display: block; margin: 0 auto");
	
	var fitSpan = document.createElement("Span");
	fitSpan.setAttribute("style", "margin: 0 10px; padding: 5px");
	fitSpan.style.fontSize = "25px";
	var fitLabel = document.createElement("LABEL");
	fitSpan.appendChild(fitLabel);
	var fitText = document.createTextNode("Fit Screen");
	fitLabel.appendChild(fitText);
	var fit = document.createElement("INPUT");
	fit.setAttribute("type", "radio");
	fit.setAttribute("id", "LightBoxFit");
	fit.setAttribute("name", "mode");
	fit.setAttribute("value", "Fit Screen");
	fit.setAttribute("checked", "true");
	fit.setAttribute("style", "margin: 0 5px");
	fitLabel.appendChild(fit);
	topControls.appendChild(fitSpan);
	fitSpan.onclick = ModeSelect;
	
	var resizeSpan = document.createElement("SPAN");
	resizeSpan.setAttribute("style", "margin: 0 10px; padding: 5px");
	resizeSpan.style.fontSize = "25px";
	var resizeLabel = document.createElement("LABEL");
	resizeSpan.appendChild(resizeLabel);
	var resizeText = document.createTextNode("Resize%");
	resizeLabel.appendChild(resizeText);
	var resize = document.createElement("INPUT");
	resize.setAttribute("type", "radio");
	resize.setAttribute("id", "LightBoxResize");
	resize.setAttribute("name", "mode");
	resize.setAttribute("value", "Resize");
	resize.setAttribute("style", "margin: 0 5px");
	resizeLabel.appendChild(resize);
	var resizeAmount = document.createElement("INPUT");
	resizeAmount.setAttribute("type", "text");
	resizeAmount.setAttribute("id", "LightBoxResizeAmount");
	resizeAmount.setAttribute("value", "100");
	resizeAmount.setAttribute("style", "font-size: 16px; height: 20px; width: 50px");
	resizeSpan.appendChild(resizeAmount);
	resizeAmount.onkeyup = ModeSelect;
	topControls.appendChild(resizeSpan);
	resizeSpan.onclick = ModeSelect;
	
	var closeBtn = document.createElement("BUTTON");
	closeBtn.setAttribute("style", "margin: 0 5px");
	closeBtn.style.fontSize = "17px"; 
	closeBtn.setAttribute("class", "submitBtn");
	var closeBtnText = document.createTextNode("Close");
	closeBtn.appendChild(closeBtnText);
	topControls.appendChild(closeBtn);
	closeBtn.onclick = CloseLightBox;
	
	var bottomControls = document.createElement("DIV");
	bottomControls.setAttribute("id", "LightBoxBottom");
	bottomControls.setAttribute("style", "background-color: #ffffff; bottom: 0; padding: 5px 0; position: fixed; text-align: center; width: 100%");
	
	var prevSpan = document.createElement("SPAN");
	prevSpan.setAttribute("style", "cursor: default; margin: 0 10px; padding: 5px");
	prevSpan.style.fontSize = "25px";
	prevSpan.setAttribute("id", "LightBoxPrev");
	var prev = document.createTextNode("< PREV");
	prevSpan.appendChild(prev);
	bottomControls.appendChild(prevSpan);
	prevSpan.onclick = ChangeImage;
	
	if(bsLightBoxTotalImgs === 0){
		for(var i = j = 0; i < bsLightBoxCheckImgs.length; i++){
			if(bsLightBoxCheckImgs[i].className.indexOf("bsLightBox") !== -1){
				bsLightBoxImgArray[j] = bsLightBoxCheckImgs[i].src;
				bsLightBoxCheckImgs[i].className = bsLightBoxCheckImgs[i].className.replace("bsLightBox", "bsLightBox" + j++);
				bsLightBoxTotalImgs += 1;
			}
		}
	}
	
	var amountSpan = document.createElement("Span");
	amountSpan.setAttribute("style", "margin: 0 10px; padding: 5px");
	amountSpan.style.fontSize = "25px";
	amountSpan.setAttribute("id", "LightBoxAmount");
	var amount = document.createTextNode("Image 1 of ");
	amountSpan.appendChild(amount);
	amountSpan.innerHTML += bsLightBoxTotalImgs; 
	bottomControls.appendChild(amountSpan);
	
	var nextSpan = document.createElement("Span");
	nextSpan.setAttribute("style", "cursor: default; margin: 0 10px; padding: 5px");
	nextSpan.style.fontSize = "25px";
	nextSpan.setAttribute("id", "LightBoxNext");
	var next = document.createTextNode("NEXT >");
	nextSpan.appendChild(next);
	bottomControls.appendChild(nextSpan);
	nextSpan.onclick = ChangeImage;
	
	shade.appendChild(topControls);
	shade.appendChild(imgDiv);
	shade.appendChild(bottomControls);
	document.body.appendChild(shade);
	
	imgDivHeight = shade.clientHeight - topControls.clientHeight - bottomControls.clientHeight - 10;
	imgDiv.style.height = imgDivHeight + "px";
	imgDiv.style.marginTop = topControls.clientHeight + 10 + "px";
	
	storedImgSize = document.getElementById("LightBoxImg").width;
	ModeSelect();
}

function ModeSelect(){
	img = document.getElementById("LightBoxImg");
	imgDiv = document.getElementById("LightBoxImgDiv");
	bottom = document.getElementById("LightBoxBottom");
	resizeAmount = document.getElementById("LightBoxResizeAmount");
	
	var classes = event.target.className.split(" ");
	
	for(var i = 0; i < classes.length; i++){
		if(classes[i].indexOf("bsLightBox") !== -1){
			classes = classes[i].replace("bsLightBox", "");
			current = parseInt(classes, 10);
		}
	}
	
	document.getElementById("LightBoxAmount").innerHTML = "Image " +
		(current + 1) + " of " + bsLightBoxTotalImgs; 
	
	if(img.width > img.height && document.getElementById("LightBoxFit").checked){
		img.style.width = "100%";
		img.style.height = "auto";
		currentSize = "";
		
		while(img.clientHeight > imgDiv.clientHeight){
			img.style.width = (img.width - 100) + "px";
		}
	}
	
	else if(document.getElementById("LightBoxResize").checked){
		var newSize = ((storedImgSize*resizeAmount.value)/100);
		
		if(newSize + "px" === currentSize){
			return;
		}
	
		currentSize = img.style.width = newSize + "px";
		img.style.height = "auto";
		imgDiv.style.overflow = "auto";
	}
	
	else{
		img.style.height = "99%";
		img.style.width = "auto";
		currentSize = "";
		
		while(img.clientWidth > imgDiv.clientWidth - 50){
			img.style.height = (img.height - 100) + "px";
		}
	}
}

function ChangeImage(){
	img = document.getElementById("LightBoxImg");
	
	if(event.target.id === "LightBoxPrev"){
		bsLightBoxImgArray[--current];
		
		if(current < 0){
			current = bsLightBoxTotalImgs - 1;
		}
	}
	
	else{
		bsLightBoxImgArray[++current];
		
		if(current > bsLightBoxTotalImgs - 1){
			current = 0;
		}
	}
		
	img.src = bsLightBoxImgArray[current];
	
	document.getElementById("LightBoxAmount").innerHTML = "Image " +
	(current + 1) + " of " + bsLightBoxTotalImgs; 
	
	storedImgSize = img.width;
	ModeSelect();
}

function CloseLightBox(box){
	document.body.removeChild(document.getElementById("LightBox"));
	document.body.setAttribute("style", "overflow: auto");
}
})();