const start = document.querySelector('#start-game');
const styleUpdate = document.querySelector('#update-styles')
const winText = document.querySelector('#win-text');
const winner = document.querySelector('#winner');

const playerNames = document.querySelectorAll('.player-name input');
const player1Name = document.querySelector('#player-1-name input');
const player2Name = document.querySelector('#player-2-name input');
const playerColors = document.querySelectorAll('.player-color');
const player1Color = document.querySelector("#player-1-color");
const player2Color = document.querySelector("#player-2-color");
const playerShapes = document.querySelectorAll('.player-shape');
const player1Shape = document.querySelector("#player-1-shape");
const player2Shape = document.querySelector("#player-2-shape");

const player1Played = document.querySelector('#player-1-played');
const player2Played = document.querySelector('#player-2-played');
const player1Win = document.querySelector('#player-1-won');
const player2Win = document.querySelector('#player-2-won');
const player1Lost = document.querySelector('#player-1-lost');
const player2Lost = document.querySelector('#player-2-lost');
const player1Draw = document.querySelector('#player-1-draw');
const player2Draw = document.querySelector('#player-2-draw');

const inputs = [player1Name, player2Name, player1Color, player2Color, player1Shape, player2Shape, styleUpdate]
const spaces = document.querySelectorAll(".game-space");
const winLines = document.querySelectorAll('.win-line');
const players = [
    {
        color: undefined,
        text: undefined,
        bg: undefined,
        shape: undefined,
        name: undefined,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        gamesDrawed: 0
    },
    {
        color: undefined,
        text: undefined,
        bg: undefined,
        shape: undefined,
        name: undefined,
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        gamesDrawed: 0
    }
];

let turn = 0;
let winLine = winLines;
let spaceCounter = 0;
let board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];


spaces.forEach(space => {
    space.disabled = true;
    space["space"] = spaceCounter;
    spaceCounter++;
    space.addEventListener("click", () => { move(space) });
});

start.addEventListener('click', () => {

    // hide game over stuff
    winLines.forEach(line => { line.style.zIndex = '-1' });
    winText.style.display = "none";
    winText.classList.remove(`player-1`)
    winText.classList.remove(`player-2`)

    // hide the play button
    start.style.display = "none";

    // Lock out the input boxes and update personalizations
    setInputs(true);
    updateStyles();

    // clear board
    board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

    // reset spaces
    spaces.forEach(space => {
        space.disabled = false;
        space.innerHTML = '';
        space.classList.remove(`player-1`);
        space.classList.remove(`player-2`);
    })
})

styleUpdate.addEventListener('click', () => { updateStyles() })

function setInputs(state) {
    inputs.forEach(input => { input.disabled = state });
}

function updateStyles() {
    let check1 = JSON.parse(localStorage.getItem(player1Name.value)) || {}
    let check2 = JSON.parse(localStorage.getItem(player2Name.value)) || {}

    if (check1.name == player1Name.value) { players[0] = check1; }
    else { players[0].name = player1Name.value || 'Player 1'; }

    if (check2.name == player2Name.value) { players[1] = check2; }
    else { players[1].name = player2Name.value || 'Player 2'; }

    players[0].shape = player1Shape.value || 'O';
    players[1].shape = player2Shape.value || 'X';

    players[0].color = player1Color.value || '#7f7fff';
    players[1].color = player2Color.value || '#ff7f7f';
    if (players[0].color[0] != '#') players[0].color = `#${players[0].color}`;
    if (players[1].color[0] != '#') players[1].color = `#${players[1].color}`;
    players[0].bg = calcBackgroundColors(players[0].color);
    players[1].bg = calcBackgroundColors(players[1].color);
    players[0].text = calcTextColor(players[0].color);
    players[1].text = calcTextColor(players[1].color);

    root.style.setProperty('--player-1-shape', players[0].shape);
    root.style.setProperty('--player-2-shape', players[1].shape);
    root.style.setProperty('--player-1-color', players[0].color);
    root.style.setProperty('--player-2-color', players[1].color);
    root.style.setProperty('--player-1-bg', players[0].bg);
    root.style.setProperty('--player-2-bg', players[1].bg);
    root.style.setProperty('--player-1-text', players[0].text);
    root.style.setProperty('--player-2-text', players[1].text);

    updateCards()
}

function calcBackgroundColors(color) {
    let c = []

    // split the hex code in groups of 2 and convert it to dec
    c[0] = parseInt(color.slice(1, 3), 16);
    c[1] = parseInt(color.slice(3, 5), 16);
    c[2] = parseInt(color.slice(5, 7), 16);

    let i = 0
    c.forEach(val => {

        // lower value by 64. If the result is less than 0, set to 0
        val = val - 64;
        if (val < 0) val = 0;

        // convert the value to hex. If the result is 1 char long, prepend a 0
        val = val.toString(16);
        if (val.length == 1) val = `0${val}`;

        // store the value into the array
        c[i] = val;
        i++;
    });
    // return the array formatted as a hex code
    //console.log(`#${c[0]}${c[1]}${c[2]}`)
    return (`#${c[0]}${c[1]}${c[2]}`);
}

function calcTextColor(color) {
    let c = [];
    c[0] = parseInt(color.slice(1, 3), 16) * 1.25;
    c[1] = parseInt(color.slice(3, 5), 16) * 1.5;
    c[2] = parseInt(color.slice(5, 7), 16) * 0.75;

    c = c[0] + c[1] + c[2];

    if (c >= 573) {
        return '#000';
    }
    return '#fff';
}

function updateCards() {
    player1Played.textContent = `${players[0].gamesPlayed}`
    player1Win.textContent = `${players[0].gamesWon}`
    player1Lost.textContent = `${players[0].gamesLost}`
    player1Draw.textContent = `${players[0].gamesDrawed}`

    player2Played.textContent = `${players[1].gamesPlayed}`
    player2Win.textContent = `${players[1].gamesWon}`
    player2Lost.textContent = `${players[1].gamesLost}`
    player2Draw.textContent = `${players[1].gamesDrawed}`
}

function move(space) {
    space.disabled = true;
    space.textContent = players[turn].shape;
    space.classList.add(`player-${turn + 1}`);
    board[space.space] = turn;
    checkWin();
    turn++;
    if (turn == 2) turn = 0;
}

function checkWin() {
    let win = false;

    if (board[0] == turn && board[1] == turn && board[2] == turn) {
        win = true;
        winLine = document.querySelector('#row0')
    }

    else if (board[3] == turn && board[4] == turn && board[5] == turn) {
        win = true;
        winLine = document.querySelector('#row1')
    }

    else if (board[6] == turn && board[7] == turn && board[8] == turn) {
        win = true;
        winLine = document.querySelector('#row2')
    }

    else if (board[0] == turn && board[3] == turn && board[6] == turn) {
        win = true;
        winLine = document.querySelector('#col0')
    }

    else if (board[1] == turn && board[4] == turn && board[7] == turn) {
        win = true;
        winLine = document.querySelector('#col1')
    }

    else if (board[2] == turn && board[5] == turn && board[8] == turn) {
        win = true;
        winLine = document.querySelector('#col2')
    }

    else if (board[0] == turn && board[4] == turn && board[8] == turn) {
        win = true;
        winLine = document.querySelector('#diag45')
    }

    else if (board[2] == turn && board[4] == turn && board[6] == turn) {
        win = true;
        winLine = document.querySelector('#diag-45')
    }

    // Draw
    else if (board[0] != -1 && board[1] != -1 && board[2] != -1 && board[3] != -1 && board[4] != -1 && board[5] != -1 && board[6] != -1 && board[7] != -1 && board[8] != -1) {
        winner.textContent = `Both! (Or neither, if you are like that)`
        winText.style.color = 'var(--off-white)';
        winText.classList.remove(`player-1`);
        winText.classList.remove(`player-2`);
        winText.style.textShadow = 'none';
        endGame(-1);
    }

    if (win) {
        winLine.style.zIndex = "1";
        winText.style.color = players[turn].text;
        winText.classList.add(`player-${turn + 1}`)
        winner.textContent = `${players[turn].name}`
        winText.style.textShadow = '0 0 5px'
        endGame(turn);
    }
}

function endGame(type) {
    winText.style.display = "block";
    spaces.forEach(space => { space.disabled = true; });
    start.style.display = "block";
    start.textContent = "Play Again?";
    setInputs(false);
    updateStats(type);
}

function updateStats(type) {
    players[0].gamesPlayed++;
    players[1].gamesPlayed++;

    if (type == 0) {
        players[0].gamesWon++;
        players[1].gamesLost++;
    }
    else if (type == 1) {
        players[1].gamesWon++;
        players[0].gamesLost++;
    }
    else {
        players[0].gamesDrawed++;
        players[1].gamesDrawed++;
    }
    updateCards()

    if (players[0].name != 'Player 1') localStorage.setItem(players[0].name, JSON.stringify(players[0]));
    if (players[1].name != 'Player 2') localStorage.setItem(players[1].name, JSON.stringify(players[1]));

    //console.log(`P1:\nwins ${players[0].gamesWon}\nlosses ${players[0].gamesLost}\ndraws ${players[0].gamesDrawed}\nP2:\nwins ${players[1].gamesWon}\nlosses ${players[1].gamesLost}\ndraws ${players[1].gamesDrawed}`)
}
