const aiBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const aiSpaces = document.querySelectorAll('.ai-board-space input');

const space0 = document.querySelector('#space-0');
const space1 = document.querySelector('#space-1');
const space2 = document.querySelector('#space-2');
const space3 = document.querySelector('#space-3');
const space4 = document.querySelector('#space-4');
const space5 = document.querySelector('#space-5');
const space6 = document.querySelector('#space-6');
const space7 = document.querySelector('#space-7');
const space8 = document.querySelector('#space-8');

aiSpaces.forEach(space => {
    space.addEventListener('click', () => {
        const parent = space.parentElement;
        parent.classList.remove('o-move');
        parent.classList.remove('x-move');

        switch (space.value) {
            case '0': {
                space.value = 1;
                space.checked = true
                parent.classList.add('o')
                break
            }
            case '1': {
                space.value = 2;
                parent.classList.add('x')
                space.checked = true
                parent.classList.remove('o')
                break
            }
            case '2': {
                space.value = 0;
                space.checked = false
                parent.classList.remove('x')
                break
            }
        }
        //console.log(`${space0.checked} ${space1.checked} ${space2.checked}\n${space3.checked} ${space4.checked} ${space5.checked}\n${space6.checked} ${space7.checked} ${space8.checked}`)
        //console.log(`${space0.value} ${space1.value} ${space2.value}\n${space3.value} ${space4.value} ${space5.value}\n${space6.value} ${space7.value} ${space8.value}`)
    })
});

let url = window.location.href.split('?');
let urlData = [];
let dataObject = {}
let shape;
let answer

if (url[1]) { getUrlData() };

function getUrlData() {
    url = url[1].split('&');
    url.forEach(data => { urlData.push(data.split('#')); });
    url.forEach(data => {
        data = data.split('=');
        dataObject[data[0]] = data[1];
    });
    dataObject.shape = dataObject.shape[0]
    shape = dataObject.shape;
    delete dataObject.shape
    for (i in aiBoard) { aiBoard[i] = parseInt(dataObject[i]) || 0 };

    answer = runAI(shape, aiBoard);

    if (answer == -1) {
        alert('No valid moves');
    }
    else if (shape == 1) {
        aiSpaces[answer].value = 1;
        aiSpaces[answer].checked = true
        aiSpaces[answer].parentElement.classList.add('o-move');
    }
    else if (shape == 2) {
        aiSpaces[answer].value = 2;
        aiSpaces[answer].checked = true
        aiSpaces[answer].parentElement.classList.add('x-move');
    }

    for (i in aiSpaces) {
        if (aiBoard[i] == 1) {
            aiSpaces[i].value = 1;
            aiSpaces[i].checked = true
            aiSpaces[i].parentElement.classList.add('o')
        }
        else if (aiBoard[i] == 2) {
            aiSpaces[i].value = 2;
            aiSpaces[i].checked = true
            aiSpaces[i].parentElement.classList.add('x')
        }
    }
}

function runAI(o, b) {
    let block = false;
    let move;
    let x;
    if (o == 1) x = 2;
    else x = 1;


    console.log(`${b[0]} ${b[1]} ${b[2]}\n${b[3]} ${b[4]} ${b[5]}\n${b[6]} ${b[7]} ${b[8]}`)


    // Win
    //row 0
    if (b[0] == o && b[1] == o && b[2] == 0) {
        return 2;
    }

    if (b[0] == o && b[2] == o && b[1] == 0) {
        return 1;
    }

    if (b[1] == o && b[2] == o && b[0] == 0) {
        return 0;
    }

    //row 1
    if (b[3] == o && b[4] == o && b[5] == 0) {
        return 5;
    }

    if (b[3] == o && b[5] == o && b[4] == 0) {
        return 4;
    }

    if (b[4] == o && b[5] == o && b[3] == 0) {
        return 3;
    }

    //row 2
    if (b[6] == o && b[7] == o && b[8] == 0) {
        return 8;
    }

    if (b[6] == o && b[8] == o && b[7] == 0) {
        return 7;
    }

    if (b[7] == o && b[8] == o && b[6] == 0) {
        return 6;
    }

    //col 0
    if (b[0] == o && b[3] == o && b[6] == 0) {
        return 6;
    }

    if (b[0] == o && b[6] == o && b[3] == 0) {
        return 3;
    }

    if (b[3] == o && b[6] == o && b[0] == 0) {
        return 0;
    }

    //col 1
    if (b[1] == o && b[4] == o && b[7] == 0) {
        return 7;
    }

    if (b[1] == o && b[7] == o && b[4] == 0) {
        return 4;
    }

    if (b[4] == o && b[7] == o && b[1] == 0) {
        return 1;
    }

    //col 2
    if (b[2] == o && b[5] == o && b[8] == 0) {
        return 8;
    }

    if (b[2] == o && b[8] == o && b[5] == 0) {
        return 5;
    }

    if (b[5] == o && b[8] == o && b[2] == 0) {
        return 2;
    }

    //diag 45
    if (b[0] == o && b[4] == o && b[8] == 0) {
        return 8;
    }

    if (b[0] == o && b[8] == o && b[4] == 0) {
        return 4;
    }

    if (b[4] == o && b[8] == o && b[0] == 0) {
        return 0;
    }

    //diag -45
    if (b[2] == o && b[4] == o && b[6] == 0) {
        return 6;
    }

    if (b[2] == o && b[6] == o && b[4] == 0) {
        return 4;
    }

    if (b[4] == o && b[6] == o && b[2] == 0) {
        return 2;
    }

    //Block
    //row 0
    if (b[0] == x && b[1] == x && b[2] == 0) {
        return 2;
    }

    if (b[0] == x && b[2] == x && b[1] == 0) {
        return 1;
    }

    if (b[1] == x && b[2] == x && b[0] == 0) {
        return 0;
    }

    //row 1
    if (b[3] == x && b[4] == x && b[5] == 0) {
        return 5;
    }

    if (b[3] == x && b[5] == x && b[4] == 0) {
        return 4;
    }

    if (b[4] == x && b[5] == x && b[3] == 0) {
        return 3;
    }

    //row 2
    if (b[6] == x && b[7] == x && b[8] == 0) {
        return 8;
    }

    if (b[6] == x && b[8] == x && b[7] == 0) {
        return 7;
    }

    if (b[7] == x && b[8] == x && b[6] == 0) {
        return 6;
    }

    //col 0
    if (b[0] == x && b[3] == x && b[6] == 0) {
        return 6;
    }

    if (b[0] == x && b[6] == x && b[3] == 0) {
        return 3;
    }

    if (b[3] == x && b[6] == x && b[0] == 0) {
        return 0;
    }

    //col 1
    if (b[1] == x && b[4] == x && b[7] == 0) {
        return 7;
    }

    if (b[1] == x && b[7] == x && b[4] == 0) {
        return 4;
    }

    if (b[4] == x && b[7] == x && b[1] == 0) {
        return 1;
    }

    //col 2
    if (b[2] == x && b[5] == x && b[8] == 0) {
        return 8;
    }

    if (b[2] == x && b[8] == x && b[5] == 0) {
        return 5;
    }

    if (b[5] == x && b[8] == x && b[2] == 0) {
        return 2;
    }

    //diag 45
    if (b[0] == x && b[4] == x && b[8] == 0) {
        return 8;
    }

    if (b[0] == x && b[8] == x && b[4] == 0) {
        return 4;
    }

    if (b[4] == x && b[8] == x && b[0] == 0) {
        return 0;
    }

    //diag -45
    if (b[2] == x && b[4] == x && b[6] == 0) {
        return 6;
    }

    if (b[2] == x && b[6] == x && b[4] == 0) {
        return 4;
    }

    if (b[4] == x && b[6] == x && b[2] == 0) {
        return 2;
    }

    // Fork
    //corners
    //[-][o][o]  
    //[o][_][_]  
    //[o][_][_]  
    if (b[0] == 0 && ((b[1] == 0 && b[2] == o) || (b[1] == o && b[2] == 0)) && ((b[3] == 0 && b[6] == o) || (b[3] == o && b[6] == 0))) {
        return 0;
    }

    //[_][_][o]
    //[_][_][o]
    //[o][o][-]    
    if (b[8] == 0 && ((b[5] == 0 && b[2] == o) || (b[5] == o && b[2] == 0)) && ((b[7] == 0 && b[6] == o) || (b[7] == o && b[6] == 0))) {
        return 8;
    }

    //[o][o][-] 
    //[_][_][o] 
    //[_][_][o]     
    if (b[2] == 0 && ((b[0] == o && b[1] == 0) || (b[0] == 0 && b[1] == o)) && ((b[5] == o && b[8] == 0) || (b[5] == 0 && b[8] == o))) {
        return 2;
    }

    //[o][_][_]
    //[o][_][_]    
    //[-][o][o]
    if (b[6] == 0 && ((b[0] == o && b[3] == 0) || (b[0] == 0 && b[3] == o)) && ((b[7] == o && b[8] == 0) || (b[7] == 0 && b[8] == o))) {
        return 6;
    }

    //edges
    // [_][o][_]
    // [_][o][_]
    // [o][-][o]
    if (b[7] == 0 && ((b[1] == o && b[4] == 0) || (b[1] == 0 && b[4] == o)) && ((b[6] == 0 && b[8] == o) || (b[6] == o && b[8] == 0))) {
        return 7;
    }

    // [o][_][_]
    // [-][o][o]
    // [o][_][_]
    if (b[3] == 0 && ((b[0] == o && b[6] == 0) || (b[0] == 0 && b[6] == o)) && ((b[4] == 0 && b[5] == o) || (b[4] == o && b[5] == 0))) {
        return 3;
    }

    // [o][-][o]
    // [_][o][_]
    // [_][o][_]
    if (b[1] == 0 && ((b[0] == o && b[2] == 0) || (b[0] == 0 && b[2] == o)) && ((b[4] == 0 && b[7] == o) || (b[4] == o && b[7] == 0))) {
        return 1;
    }

    // [_][_][o]
    // [o][o][-]
    // [_][_][o]
    if (b[5] == 0 && ((b[2] == o && b[8] == 0) || (b[2] == 0 && b[8] == o)) && ((b[3] == 0 && b[4] == o) || (b[3] == o && b[4] == 0))) {
        return 5;
    }

    //center
    //[o][_][o]
    //[_][-][_]
    //[o][_][o]
    if (b[4] == 0 && ((b[0] == o && b[2] == o && b[6] == 0 && b[8] == 0) || (b[0] == o && b[2] == 0 && b[6] == o && b[8] == 0) || (b[0] == 0 && b[2] == 0 && b[6] == o && b[8] == o) || (b[0] == 0 && b[2] == o && b[6] == 0 && b[8] == o))) {
        return 4;
    }


    // Block Forks
    //corners
    //[-][x][x]
    //[x][_][_]
    //[x][_][_]
    if (b[0] == 0 && ((b[1] == 0 && b[2] == x) || (b[1] == x && b[2] == 0)) && ((b[3] == 0 && b[6] == x) || (b[3] == x && b[6] == 0))) {
        block = true;
        move = 0;
    }

    //[_][_][x]
    //[_][_][x]
    //[x][x][-]
    else if (b[8] == 0 && ((b[5] == 0 && b[2] == x) || (b[5] == x && b[2] == 0)) && ((b[7] == 0 && b[6] == x) || (b[7] == x && b[6] == 0))) {
        block = true;
        move = 8;
    }

    //[x][x][-] 
    //[_][_][x] 
    //[_][_][x]     
    else if (b[2] == 0 && ((b[0] == x && b[1] == 0) || (b[0] == 0 && b[1] == x)) && ((b[5] == x && b[8] == 0) || (b[5] == 0 && b[8] == x))) {
        block = true;
        move = 2;
    }

    //[x][_][_]
    //[x][_][_]    
    //[-][x][x]
    else if (b[6] == 0 && ((b[0] == x && b[3] == 0) || (b[0] == 0 && b[3] == x)) && ((b[7] == x && b[8] == 0) || (b[7] == 0 && b[8] == x))) {
        block = true;
        move = 6;
    }

    //edges
    // [_][x][_]
    // [_][x][_]
    // [x][-][x]
    else if (b[7] == 0 && ((b[1] == x && b[4] == 0) || (b[1] == 0 && b[4] == x)) && ((b[6] == 0 && b[8] == x) || (b[6] == x && b[8] == 0))) {
        block = true;
        move = 7;
    }

    // [x][_][_]
    // [-][x][x]
    // [x][_][_]
    else if (b[3] == 0 && ((b[0] == x && b[6] == 0) || (b[0] == 0 && b[6] == x)) && ((b[4] == 0 && b[5] == x) || (b[4] == x && b[5] == 0))) {
        block = true;
        move = 3;
    }

    // [x][-][x]
    // [_][x][_]
    // [_][x][_]
    else if (b[1] == 0 && ((b[0] == x && b[2] == 0) || (b[0] == 0 && b[2] == x)) && ((b[4] == 0 && b[7] == x) || (b[4] == x && b[7] == 0))) {
        block = true;
        move = 1;
    }

    // [_][_][x]
    // [x][x][-]
    // [_][_][x]
    else if (b[5] == 0 && ((b[2] == x && b[8] == 0) || (b[2] == 0 && b[8] == x)) && ((b[3] == 0 && b[4] == x) || (b[3] == x && b[4] == 0))) {
        block = true;
        move = 5;
    }

    //center
    //[x][_][x]
    //[_][-][_]
    //[x][_][x]
    else if (b[4] == 0 && ((b[0] == x && b[2] == x && b[6] == 0 && b[8] == 0) || (b[0] == x && b[2] == 0 && b[6] == x && b[8] == 0) || (b[0] == 0 && b[2] == 0 && b[6] == x && b[8] == x) || (b[0] == 0 && b[2] == x && b[6] == 0 && b[8] == x))) {
        block = true;
        move = 4;
    }

    // make two-in-a-row if there is a risk of being forked
    if (block) {
        //corners
        if (b[0] == 0 && ((b[1] == o && b[2] == 0 && b[2] != move) || (b[2] == o && b[1] == 0 && b[1] != move)) || ((b[3] == o && b[6] == 0 && b[6] != move) || (b[6] == o && b[3] == 0 && b[3] != move)) || ((b[4] == o && b[8] == 0 && b[8] != move) || (b[8] == o && b[4] == 0 && b[4] != move))) {
            return 0;
        }

        if (b[2] == 0 && ((b[1] == o && b[0] == 0 && b[0] != move) || (b[0] == o && b[1] == 0 && b[1] != move)) || ((b[4] == o && b[6] == 0 && b[6] != move) || (b[6] == o && b[4] == 0 && b[4] != move)) || ((b[5] == o && b[8] == 0 && b[8] != move) || (b[8] == o && b[5] == 0 && b[5] != move))) {
            return 2;
        }

        if (b[8] == 0 && ((b[5] == o && b[2] == 0 && b[2] != move) || (b[2] == o && b[5] == 0 && b[5] != move)) || ((b[4] == o && b[0] == 0 && b[0] != move) || (b[0] == o && b[4] == 0 && b[4] != move)) || ((b[7] == o && b[6] == 0 && b[6] != move) || (b[6] == o && b[7] == 0 && b[7] != move))) {
            return 8;
        }

        if (b[6] == 0 && ((b[3] == o && b[6] == 0 && b[6] != move) || (b[6] == o && b[3] == 0 && b[3] != move)) || ((b[4] == o && b[2] == 0 && b[2] != move) || (b[2] == o && b[4] == 0 && b[4] != move)) || ((b[7] == o && b[8] == 0 && b[8] != move) || (b[8] == o && b[7] == 0 && b[7] != move))) {
            return 6;
        }

        //edges
        if (b[1] == 0 && ((b[0] == o && b[2] == 0 && b[2] != move) || (b[2] == o && b[0] == 0 && b[0] != move)) || ((b[4] == o && b[7] == 0 && b[7] != move) || (b[7] == o && b[4] == 0 && b[4] != move))) {
            return 1;
        }

        if (b[3] == 0 && ((b[0] == o && b[6] == 0 && b[6] != move) || (b[6] == o && b[0] == 0 && b[0] != move)) || ((b[4] == o && b[5] == 0 && b[5] != move) || (b[5] == o && b[4] == 0 && b[4] != move))) {
            return 3;
        }

        if (b[7] == 0 && ((b[6] == o && b[8] == 0 && b[8] != move) || (b[8] == o && b[6] == 0 && b[6] != move)) || ((b[4] == o && b[1] == 0 && b[1] != move) || (b[1] == o && b[4] == 0 && b[4] != move))) {
            return 7;
        }

        if (b[5] == 0 && ((b[8] == o && b[2] == 0 && b[2] != move) || (b[2] == o && b[8] == 0 && b[8] != move)) || ((b[4] == o && b[3] == 0 && b[3] != move) || (b[3] == o && b[4] == 0 && b[4] != move))) {
            return 5;
        }

        //center
        if (b[4] == 0 && ((b[0] == o && b[8] == 0 && b[8] != move) || (b[8] == o && b[0] == 0 && b[0] != move)) || ((b[1] == o && b[7] == 0 && b[7] != move) || (b[7] == o && b[1] == 0 && b[1] != move)) || ((b[2] == o && b[6] == 0 && b[6] != move) || (b[6] == o && b[2] == 0 && b[2] != move)) || ((b[3] == o && b[5] == 0 && b[5] != move) || (b[5] == o && b[3] == 0 && b[3] != move))) {
            return 4;
        }

        return move;
    }

    //Play Center
    if (b[4] == 0) {
        return 4;
    }

    // Play Opposite Corner
    if (b[0] == x && b[8] == 0) {
        return 8;
    }

    if (b[2] == x && b[6] == 0) {
        return 6;
    }

    if (b[6] == x && b[2] == 0) {
        return 2;
    }

    if (b[8] == x && b[0] == 0) {
        return 0;
    }

    // Play Empty Corner
    if (b[0] == 0) {
        return 0;
    }

    if (b[2] == 0) {
        return 2;
    }

    if (b[6] == 0) {
        return 6;
    }

    if (b[8] == 0) {
        return 8;
    }

    // Play Empty Side
    if (b[1] == 0) {
        return 1;
    }

    if (b[3] == 0) {
        return 3;
    }

    if (b[5] == 0) {
        return 5;
    }

    if (b[7] == 0) {
        return 7;
    }

    // [0][1][2]
    // [3][4][5]
    // [6][7][8]
    return -1;
}