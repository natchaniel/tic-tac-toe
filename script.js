const joinDiv  = document.getElementById('joinDiv');
const game     = document.getElementById('game');
const header   = document.getElementById('header');
const messages = document.getElementById('messages');

const colsrows = [
	document.querySelectorAll('.one'),	 // row 1
	document.querySelectorAll('.two'),	 // row 2
	document.querySelectorAll('.three'), // row 3
	document.querySelectorAll('.a'),  // column 1
	document.querySelectorAll('.b'),  // column 2
	document.querySelectorAll('.c'),  // column 3
];
const diagonals = [
	[ // top left to bottom right
		document.querySelector('.a.one'), 
		document.querySelector('.b.two'), 
		document.querySelector('.c.three'),
	],
	[ // bottom left to top right
		document.querySelector('.c.one'), 
		document.querySelector('.b.two'), 
		document.querySelector('.a.three'),
	],
];

let username = 'nobody'
let currentTurn = 'none'
let turns = 0
let winner = 'nobody'

function toggleDisplay() {
	joinDiv.classList.toggle('hidden');
	game.classList.toggle('hidden');
}
function swapTurns() {
	switch(currentTurn) {
		case 'X':
			currentTurn = 'O';
			break;
		case 'O':
			currentTurn = 'X';
			break;
	}
	turns++;
}
function newMessage(type, txt, clear) {
	const msg = document.createElement('li');
	msg.textContent = txt;
	switch(type) {
		case 'server':
			msg.classList.add('servermsg');
			break;
		case 'user':
			msg.classList.add('usermsg');
			break;
		case 'other':
			msg.classList.add('othermsg');
			break;
	}
	if (clear) { messages.textContent = '' };
	messages.appendChild(msg);
};

document.querySelector('#singleplayerForm').addEventListener('submit', e => {
	e.preventDefault();
	toggleDisplay();

	if (currentTurn === 'none') { currentTurn = 'X' }
	turns++;
	newMessage('server', `Playing offline. ${currentTurn}'s turn`, true);
	newMessage('server', `Turn ${turns}`, false);
});

document.querySelectorAll('div#gameBoard button').forEach(btn => {
	btn.addEventListener('click', () => {
		if ( btn.textContent === '' ) {
			btn.textContent = currentTurn;
			swapTurns();
			newMessage('server', `${currentTurn}'s turn`, true);
			newMessage('server', `Turn ${turns}`, false);
			checkForWinner();
		};
	});
});
function checkForWinner() {
	colsrows.forEach(btns => {
		let Xs = 0;
		let Os = 0;
		btns.forEach(btn => {
			if ( btn.innerHTML === 'X' ) { Xs++ };
			if ( btn.innerHTML === 'O' ) { Os++ };
		});
		if ( Xs === 3 || Os === 3 ) {
			if ( Xs === 3 ) { winner = 'X' } else { winner = 'O' }
			console.log(`Congrats, ${winner}! You won!`)
			document.querySelectorAll('button.game').forEach(e => {
				e.disabled = true;
			});
			return 0;
		}
	});
	diagonals.forEach(btnArray => {
		let Xs = 0;
		let Os = 0;
		btnArray.forEach(btn => {
			if ( btn.innerHTML === 'X' ) { Xs++ };
			if ( btn.innerHTML === 'O' ) { Os++ };
		});
		if ( Xs === 3 || Os === 3 ) {
			if ( Xs === 3 ) { winner = 'X' } else { winner = 'O' }
			console.log(`Congrats, ${winner}! You won!`)
			document.querySelectorAll('button.game').forEach(e => {
				e.disabled = true;
			});
			return 0;
		}
	});
	
	if ( turns === 10 & winner === 'nobody' ) {
		console.log('no winner...')
		document.querySelectorAll('button.game').forEach(e => {
			e.disabled = true;
		});
		return 0;
	}
}