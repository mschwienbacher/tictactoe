let fields = [];
let gameOver = false;
let currentShape = "cross";
let winner;

function fillShape(id) {  
    if(!fields[id] && !gameOver) {
        if(currentShape == "cross") {
            currentShape = "circle";
            document.getElementById("player-1").classList.add("player-inactive");
            document.getElementById("player-2").classList.remove("player-inactive");
        } else {
            currentShape = "cross";
            document.getElementById("player-2").classList.add("player-inactive");
            document.getElementById("player-1").classList.remove("player-inactive");
        }

        fields[id] = currentShape;
        draw();
        checkForWin();
    }
}

function fill(filler) {
    for(let i = 0; i < fields.length; i++) {
        if(fields[i] == filler) {
            document.getElementById(`${filler}-` + i).classList.remove("d-none");
        }
        if(fields[i] == filler) {
            document.getElementById(`${filler}-` + i).classList.remove("d-none");
        }
    }
}

function draw() {
    fill("circle");
    fill("cross");
}

function drawHorizontalLines() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById("line-1").style.transform = "scaleX(1.0)";
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById("line-2").style.transform = "scaleX(1.0)";
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById("line-3").style.transform = "scaleX(1.0)";
    }
}

function drawVeritcalLines() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById("line-4").style.transform = "rotate(90deg) scaleX(1.0)";
    }
    
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById("line-5").style.transform = "rotate(90deg) scaleX(1.0)";
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById("line-6").style.transform = "rotate(90deg) scaleX(1.0)";
    }
}

function drawSlopeLines() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById("line-7").style.transform = "rotate(45deg) scaleX(1.2)";
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById("line-8").style.transform = "rotate(-45deg) scaleX(1.2)";
    }
}

function checkForWin() {
    drawHorizontalLines();
    drawVeritcalLines();
    drawSlopeLines();
    checkDraw();
    overlay();
}

function overlay() {
    if(winner) {
        gameOver = true;
        setTimeout(function(){
            document.getElementById("game-is-over").classList.remove("d-none");
            if(winner == "circle") {
                document.getElementById("thewinner").innerHTML = '<strong class="p1">PLAYER 1</strong> is the WINNER!';
            } else {
                document.getElementById("thewinner").innerHTML = '<strong class="p2">PLAYER 2</strong> is the WINNER!';
            }
            
            document.getElementById("restart-button").classList.remove("d-none");
        }, 2000);
    }
}

function checkDraw() {
    let nonEmptyValues = fields.filter(function (value) {
        return value !== undefined && value !== null;
    });
    if (nonEmptyValues.length === 9) {
        setTimeout(function(){
            document.getElementById("game-is-over").classList.remove("d-none");
            document.getElementById("thewinner").innerHTML = '<strong class="nb">DRAW!</strong> NO ONE is the winner!';
        }, 2000);
    }
}
