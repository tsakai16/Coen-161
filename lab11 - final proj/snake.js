/* 
	snake.js

	This file contains a JS implementation for the snake. It is 
	done using DOM manipulation and time out events to animate
	the snake.

	-----------------------------------------------------------

	This is an immediately invoked function expression or IIFE
	it's useful when writing external scripts to avoid polluting 
	the global namespace. That way, any variables you declare 
	don't conflict with any variables declared by any other
	scripts on the page. This works because inside the function 
	expression, you have your own, isolated scope. When the script
	is loaded into the page, the function is immediately invoked
	by the () operator after it, running your script in the page!

	NOTE: Because JS let's you access outer scopes, you still
	have access to the window and the document inside your 
	IIFE.
*/
//global
var speed = 100;
(function(){
	"use strict"; //removed for delete?

	// variable declarations for the game
	var food = null,
	SNAKE_LENGTH = 3,
	SNAKE_SPACING = 2,
	playArea = null,
	areaStyle = null,
	direction = 'down', // can be 'down', 'up', 'left', 'right'
	id;
	//var speed = 100; //multiplier, is this global or need to move?

	// attach this event to the window so that we can play the game without clicking a specific element first
	window.addEventListener("keydown", function(event) {
		
		if (event.defaultPrevented) {
			return; // do nothing if the event was already handled
		}

		switch (event.key) {

			// Part 1
			// Add in the missing cases, the alert message below can help identify what values to check for
			case 'ArrowDown':
				direction = 'down';
				break;
			
			case 'ArrowUp':
				direction = 'up';
				break;

			case 'ArrowLeft':
				direction = 'left';
				break;
				
			case 'ArrowRight':
				direction = 'right';
				break;

			default:
				// alert("The " + event.key + " was pressed"); 
				return; // use 'return' instead of 'break' so that other key handlers can run for keys we don't support
		
		}


		event.preventDefault(); // cancels the event so it doesn't get handled twice

	}, true); // use capture to prevent any other arrow keydown handlers from getting executed

	// part - the html element that is displayed as this segment of the snake
	// compStyle - the most recent styles of the element, we use this to get the latest top & left values
	function SnakePart(part) {
		this.part = part;
		this.compStyle = getComputedStyle(part);
	}

	// snakeParts - an list of SnakeParts that make up the snake
	// snakeLength - the number of parts that make up the snake
	function Snake(length) {
		this.snakeParts = [];
		this.snakeLength = length;
	}

	// PART 2
	// checks to see if the head of the snake has collided with the food
	Snake.prototype.isFoodEaten = function () {
		var head = this.snakeParts[0];
		//return 	false;
		return parseInt(head.compStyle.top) == parseInt(food.compStyle.top) &&
		parseInt(head.compStyle.left) == parseInt(food.compStyle.left);
	};
	/*
	Snake.prototype.isSnakeEaten = function () {
		var head = this.snakeParts[0];
		var bodyPart;
		//return 	false;
		for (let i = 3; i < this.snakeParts.length; i ++){
			bodyPart = this.SnakeParts[i];
			if(parseInt(head.compStyle.top) == parseInt(bodyPart.compStyle.top) &&
			parseInt(head.compStyle.left) == parseInt(bodyPart.compStyle.left)) return true;
	
		}
		return false;
	};
	*/

	Snake.prototype.initSnake = function () {
		this.snakeParts.push(new SnakePart(document.getElementById("snake")));
		// get the element and styles for the play area
		playArea = document.getElementById("play-area");
		areaStyle = getComputedStyle(playArea);

		// create additional snake parts to make the whole snake
		for (var i = 1; i < this.snakeLength; i++) {
			var snakePart = this.snakeParts[0].part.cloneNode();
			snakePart.id = this.snakeParts[0].part.id + i;
			playArea.appendChild(snakePart);
			var newPart = new SnakePart(snakePart);
			newPart.part.style.top = parseInt(newPart.compStyle.top) - ((parseInt(newPart.compStyle.height) + SNAKE_SPACING) * i)  + "px";
			this.snakeParts.push(newPart);
		}

	//	Init food, just a clone of a snakePart with new styles
		// var foodPart = this.snakeParts[0].part.cloneNode();
		// foodPart.id = this.snakeParts[0].part.id + i;
		// console.log(i, this.snakeLength);
		// foodPart.style.borderRadius = SNAKE_SPACING + "px";
		// foodPart.style.backgroundColor = "green";
		// playArea.appendChild(foodPart);
		// food = new SnakePart(foodPart);
		// var foodHeight = parseInt(food.compStyle.height) + SNAKE_SPACING;
		// var foodWidth = parseInt(food.compStyle.width) + SNAKE_SPACING;
		// // randomly place the food
		// food.part.style.top = Math.round(Math.random() * (parseInt(areaStyle.height) - foodHeight) / foodHeight) * foodHeight + 2 + "px";
		// food.part.style.left = Math.round(Math.random() * (parseInt(areaStyle.width) - foodWidth) / foodWidth) * foodWidth + 2 + "px";
		
	};
	Snake.prototype.initFood = function() {
		var i = this.snakeLength;
		var foodPart = this.snakeParts[0].part.cloneNode();
		foodPart.id = this.snakeParts[0].part.id + i;
		foodPart.style.borderRadius = SNAKE_SPACING + "px";
		foodPart.style.backgroundColor = "green";
		playArea = document.getElementById("play-area");
		areaStyle = getComputedStyle(playArea);
		playArea.appendChild(foodPart);
		food = new SnakePart(foodPart);
		var foodHeight = parseInt(food.compStyle.height) + SNAKE_SPACING;
		var foodWidth = parseInt(food.compStyle.width) + SNAKE_SPACING;
		// randomly place the food
		food.part.style.top = Math.round(Math.random() * (parseInt(areaStyle.height) - foodHeight) / foodHeight) * foodHeight + 2 + "px";
		food.part.style.left = Math.round(Math.random() * (parseInt(areaStyle.width) - foodWidth) / foodWidth) * foodWidth + 2 + "px";
	};

	// this function moves the snake in the play area by changing its 'left' and 'top' properties.
	// It also checks that the snake is within the play area and ends the game if it ever goes past 
	// the game boundary
	Snake.prototype.redrawSnake = function () {
		var tail = this.snakeParts.pop();
		var newTop = parseInt(this.snakeParts[0].compStyle.top);
		var newLeft = parseInt(this.snakeParts[0].compStyle.left);
		//some multiplication here?
		switch (direction) {
			case "left":
				newLeft = newLeft - (parseInt(tail.compStyle.width) + SNAKE_SPACING);
				break;
			case "up":
				newTop = newTop - (parseInt(tail.compStyle.height) + SNAKE_SPACING);
				break;
			case "right":
				newLeft = newLeft + (parseInt(tail.compStyle.width) + SNAKE_SPACING);
				break;
			case "down":
				newTop = newTop + (parseInt(tail.compStyle.height) + SNAKE_SPACING);
				break;
		}

		this.snakeParts.unshift(tail);

		tail.part.style.top = newTop + "px";
		tail.part.style.left = newLeft + "px";

		if (this.isFoodEaten()) {
			//make snake longer
			var snakePart = this.snakeParts[0].part.cloneNode();
			snakePart.id = this.snakeParts[0].part.id + this.snakeLength;
			playArea.appendChild(snakePart);
			var newPart = new SnakePart(snakePart);
			newPart.part.style.top = parseInt(newPart.compStyle.top) - ((parseInt(newPart.compStyle.height) + SNAKE_SPACING) * this.snakeLength)  + "px";
			this.snakeParts.push(newPart);

			//NOTE
			//for some reason when i use these 3 lines below instead of the 3 lines above, the food doesn't move but it gets rid of the floating pixel
			// this.snakeParts.push(new SnakePart(snakePart))
			// snakeParts[snake.Length].part.style.top = parseInt(newPart.compStyle.top) - ((parseInt(newPart.compStyle.height) + SNAKE_SPACING) * this.snakeLength)  + "px";
			// this.snakeLength++;
			//why don't I need to change snakeLength?
			//remove old food

			//create new food part
			//this.initFood();
			//^ this doesn't work because it will leave old food pixels on the screen
			//note: the old pixels left by the line of code above aren't able to be collided with so it's just cosmetic


			var foodHeight = (parseInt(food.compStyle.height) + SNAKE_SPACING);
			var foodWidth = (parseInt(food.compStyle.width) + SNAKE_SPACING);
			food.part.style.top = Math.round(Math.random() * (parseInt(areaStyle.height) - foodHeight) / foodHeight) * foodHeight + 2 + "px";
			food.part.style.left = Math.round(Math.random() * (parseInt(areaStyle.width) - foodWidth) / foodWidth) * foodWidth + 2 + "px";
			//increase speed


			speed = speed / 2 /* 1.3 */;
			clearInterval(id);
			var snakeSpeed = this;
			id = setInterval(function() {
				snakeSpeed.redrawSnake();
			//console.log(speed);
			}, speed);
			//makes the game super hard

			// playArea.style.borderColor = 'green';
			// setTimeout(function() {
			// 	alert("You Win!");
			// 	clearInterval(id);
			// }, 5);
			// return;
			
		// foodPart = this.snakeParts[0].part.cloneNode();
		// foodPart.id = this.snakeParts[0].part.id + i;
		// foodPart.style.borderRadius = SNAKE_SPACING + "px";
		// foodPart.style.backgroundColor = "green";
		// playArea.appendChild(foodPart);
		// food = new SnakePart(foodPart);
		// foodHeight = parseInt(food.compStyle.height) + SNAKE_SPACING;
		// foodWidth = parseInt(food.compStyle.width) + SNAKE_SPACING;
		// // randomly place the food
		// food.part.style.top = Math.round(Math.random() * (parseInt(areaStyle.height) - foodHeight) / foodHeight) * foodHeight + 2 + "px";
		// food.part.style.left = Math.round(Math.random() * (parseInt(areaStyle.width) - foodWidth) / foodWidth) * foodWidth + 2 + "px";
		}

		if ((parseInt(tail.compStyle.top) < SNAKE_SPACING	||	parseInt(tail.compStyle.bottom) < SNAKE_SPACING ||
			parseInt(tail.compStyle.left) < SNAKE_SPACING	||	parseInt(tail.compStyle.right) < SNAKE_SPACING) /* || this.isSnakeEaten  */) {
			playArea.style.borderColor = 'red';
			setTimeout(function() {
				alert("Game Over");
				clearInterval(id);
			}, 5);
			$(document).on({
				keydown: function(){
					location.reload(true);
				},
				click: function(){
					location.reload(true);
				}
	
			});
		}

	};

	document.addEventListener("DOMContentLoaded", function() {
		var snake = new Snake(SNAKE_LENGTH);
		snake.initSnake();
		snake.initFood();
		id = setInterval(function() {
			snake.redrawSnake();
			//console.log(speed);
		}, 100); //this can be changed to a higher interval to set a slower original speed
		// this can be used to test, especially if you have no way to end the game i.e. your boundary checks aren't working
		// setTimeout(function() { clearInterval(id); }, 7000);
	});

})();