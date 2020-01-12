'use strict';

// Select the elements
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('.date');
const timeElement = document.querySelector('.time');
const list = document.querySelector('.list');
const input = document.querySelector('.add-item__input');
const inputButton = document.querySelector('.add-item__button');

// Variables
let LIST = [];
let id = 0;

// Attributes vallues
const CHECK = 'assets/svg/check-circle.svg';
const UNCHECK = 'assets/svg/circle.svg';
const LINE_THROUGH = 'item__text_line-through';

// Get item from localstorage
let data = localStorage.getItem('TODO');

// Check if data isn't empty
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
} else {
	LIST = [];
	id = 0;
}

// Load item to the user interface
function loadList(array) {
	array.forEach(function(item) {
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

// Show todays date
const optionsTime = {hour: 'numeric', minute: 'numeric', second: 'numeric'};
const optionsDate = {weekday: 'long', month:'short', day: 'numeric'};

setInterval(() => {
	const todayTime = new Date();
	const todayDate = new Date();
	timeElement.innerHTML = todayTime.toLocaleString('RUS', optionsTime);
	dateElement.innerHTML = todayDate.toLocaleDateString('en', optionsDate);
}, 1000);

// Add to do function
function addToDo(toDo, id, done, trash) {

	if (trash) { return;}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : '';

	const item = `<li class="item">
									<button class="item__button button-toggle" data-job="complete" id= "${id}">
										<img width="30px" src="${DONE}" alt="toggle">
									</button>
									<p class="item__text ${LINE}">${toDo}</p>
									<button class="item__button button-remove" data-job="remove" id= "${id}">
										<img width="23px" src="assets/svg/trash.svg" alt="remove" >
									</button>
								</li>`;
	const position = 'beforeend';

	list.insertAdjacentHTML(position, item);
}

function inputItem() {
	const toDo = input.value;

	//if input value isn't empty
	if(toDo) {
		addToDo(toDo, id, false, false);

		LIST.push({
			name: toDo,
			id: id,
			done: false,
			trash: false,
		});

		// Add item from localstorage
		localStorage.setItem('TODO', JSON.stringify(LIST));
		id++;
	}

	input.value = '';
}


// Add an item to the list user the enter key
document.addEventListener('keyup', function(e) {
	if (e.keyCode == 13) {
		inputItem();
	}
});

// Add an item to the list user the button
inputButton.addEventListener('click', function() {
	inputItem();
});

// Remove to do
function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}

// Complete to do
function completeToDo(element) {
	const elementImg = element.querySelector('img');
	elementImg.src = LIST[element.id].done ? UNCHECK : CHECK;
	element.parentNode.querySelector('.item__text').classList.toggle(LINE_THROUGH);

	LIST[element.id].done = !LIST[element.id].done;
}

list.addEventListener('click', function(e){
	const element = e.target;

	if(element.classList.contains('button-remove')){
		removeToDo(element);
	}else if(element.classList.contains('button-toggle')){
		completeToDo(element);
	}

	localStorage.setItem('TODO', JSON.stringify(LIST));
});

//refresh localstorage and all tasks
clear.addEventListener('click', function() {
	list.innerHTML = '';
	localStorage.clear();
});