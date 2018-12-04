console.log(
    "Thanks for visiting this site!  I hope you like what I've made.  If you have "
    +"any questions for me please feel free to reach out.  I also want to give credit" 
    +"to Chris Dermody @ https://github.com/Chippd/.  It's true that no idea is new, "
    +"only a reframing of old ones."
);

// Listen for card click, assign "expanded" class
let items = document.getElementsByClassName('carousel-item');
let expandedIndex;
// loop over each item, add click listener
for (let i = 0, length1 = items.length; i < length1; i++) {

	items[i].addEventListener("click", function(el) {
		// need to know if card clicked has any cards previous to it with "expanded" class
		let expandedIndex;
		let clickedIndex = i;
		for (let index = 0, length1 = items.length; index < length1; index++) {
			if (items[index].classList.value.match(/selected/)) {
				expandedIndex = index
			}
		}
		// close all other items that may be open
		removeClass(items, "selected");
		toggleExpanded(items[i]);
		scrollToCard(items[i], expandedIndex, clickedIndex);
	})
}

function copyEmail(event){
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val("trpotter72@ku.edu").select();
    document.execCommand("copy");
    $temp.remove();
    $('#notify').css({
    	display: "block",
    	left:  event.pageX + 20,
    	top:   event.pageY
    });
    $(document).bind('mousemove', function(e){
        $('#notify').css({
    		display: "block",
    		left:  e.pageX + 20,
    		top:   e.pageY
        });
    });
    setTimeout(function(){
    	$('#notify').fadeOut(2500, function(){
    		$(document).unbind('mousemove');
    	});
    }, 2000);
}

function scrollToCard(card, expandedIndex, clickedIndex) {
	// Centers card in screen
	let adjustment = 0;
	if(clickedIndex === expandedIndex){
		adjustment = 0;
	} else if (clickedIndex > expandedIndex) {
		adjustment = 200;
	} else {
		adjustment = -200;
	}
	let left = card.offsetLeft;
	let elementWidth = card.offsetWidth;
	let container = document.getElementsByClassName('container')[0]
	let screenwidth = container.offsetWidth;
	let target = left - (adjustment) - (screenwidth - elementWidth) / 2;
	document.getElementById("carousel").scrollTo({
		left: target,
		behavior: "smooth"
	});
}

function removeClass(els, className) {
	for (let i = 0, length1 = els.length; i < length1; i++) {
		els[i]
		if (els[i].classList)
			els[i].classList.remove(className);
		else
			els[i].className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
}

function toggleExpanded(el) {
	let className = "selected";
	if (el.classList) {
		el.classList.toggle(className);
	} else {
		var classes = el.className.split(' ');
		var existingIndex = classes.indexOf(className);
		if (existingIndex >= 0)
			classes.splice(existingIndex, 1);
		else
			classes.push(className);
		el.className = classes.join(' ');
	}
}

function onLoaded() {
	// pick first card
	let firstCard = document.getElementsByClassName("carousel-item")[0];
	toggleExpanded(firstCard);
	setTimeout(function() {
		scrollToCard(firstCard);
	}, 400)
}

function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(onLoaded);
