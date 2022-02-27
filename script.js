const joinDiv  = document.getElementById('joinDiv');
const game     = document.getElementById('game');
const header   = document.getElementById('header');
const messages = document.getElementById('messages');

let username = 'nobody'
let currentTurn = 'none'

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
});

document.querySelectorAll('div#gameBoard button').forEach(btn => {
	btn.addEventListener('click', () => {
		if ( btn.textContent === '' ) {
			btn.textContent = currentTurn;
			swapTurns();
			newMessage('server', `${currentTurn}'s turn`, true);
		};
	});
});