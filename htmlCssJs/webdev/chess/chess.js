const pieces = [
    ['rdt1', 'ndt1', 'bdt1', 'qdt1', 'kdt', 'bdt2', 'ndt2', 'rdt2'], // 1st row: Black pieces
    ['pdt1', 'pdt2', 'pdt3', 'pdt4', 'pdt5', 'pdt6', 'pdt7', 'pdt8'], // 2nd row: Black pawns
    [0, 0, 0, 0, 0, 0, 0, 0], // 3rd row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0], // 4th row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0], // 5th row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0],  // 6th row: Empty
    ['plt1', 'plt2', 'plt3', 'plt4', 'plt5', 'plt6', 'plt7', 'plt8'], // 7nd row: White pawns
    ['rlt1', 'nlt1', 'blt1', 'qlt1', 'klt', 'blt2', 'nlt2', 'rlt2'], // 8th row: White pieces
];
    // 0 = empty
    // naming : #1#2t#3 : #1 = type, #2 = color (d:dark,l:light), #3 = count(if exists)

function isBlackPiece(pieceName) {
    return pieceName && pieceName[1] === 'd';
}

// Check if a position is within board bounds and optionally if it's occupied
function isValidMove(x, y, isBlack) {
    return (
        x >= 0 && x < 8 && y >= 0 && y < 8 &&
        (!pieces[x][y] || isBlackPiece(pieces[x][y]) !== isBlack)
    );
}

function possmoves(x, y) {
    const piece = pieces[x][y];
    if (!piece) {
        console.log("No piece at this position.");
        return [];
    }

    const possibleMoves = [];
    const type = piece[0];
    const isBlack = isBlackPiece(piece);

    // Define move logic based on piece type
    switch (type) {
        case 'p': // Pawn
            const direction = isBlack ? 1 : -1;
            const startRow = isBlack ? 1 : 6; // Black pawns start at x = 1, white pawns start at x = 6
        
            // Normal one-square forward move
            if (isValidMove(x + direction, y, isBlack) && !pieces[x + direction][y]) {
                possibleMoves.push([x + direction, y]);
            }
        
            // Two-square forward move (only on the first move)
            if (x === startRow && !pieces[x + direction][y] && !pieces[x + (2 * direction)][y]) {
                console.log("Two-square forward move.");
                possibleMoves.push([x + (2 * direction), y]);
            }
        
            // Diagonal captures (one square diagonally)
            // and en passant
            if (isValidMove(x + direction, y - 1, isBlack) && (pieces[x + direction][y - 1] || ( enpassant && enpassantCords[0] == x && enpassantCords[1] == y-1) )) {
                possibleMoves.push([x + direction, y - 1]);
            }
            if (isValidMove(x + direction, y + 1, isBlack) && (pieces[x + direction][y + 1] || ( enpassant && enpassantCords[0] == x && enpassantCords[1] == y+1))) {
                possibleMoves.push([x + direction, y + 1]);
            }
            break;
    

        case 'r': // Rook
            for (let i = x + 1; i < 8 && isValidMove(i, y, isBlack); i++) {
                possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let i = x - 1; i >= 0 && isValidMove(i, y, isBlack); i--) {
                possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let j = y + 1; j < 8 && isValidMove(x, j, isBlack); j++) {
                possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }
            for (let j = y - 1; j >= 0 && isValidMove(x, j, isBlack); j--) {
                possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }
            break;

        case 'n': // Knight
            const knightMoves = [
                [x + 2, y + 1], [x + 2, y - 1], [x - 2, y + 1], [x - 2, y - 1],
                [x + 1, y + 2], [x + 1, y - 2], [x - 1, y + 2], [x - 1, y - 2]
            ];
            knightMoves.forEach(([i, j]) => {
                if (isValidMove(i, j, isBlack)) {
                    possibleMoves.push([i, j]);
                }
            });
            break;

            case 'b': // Bishop
            // Top-right diagonal
            for (let i = 1; i < 8; i++) {
                if (x + i < 8 && y + i < 8) { // Check bounds
                    if (isValidMove(x + i, y + i, isBlack)) {
                        possibleMoves.push([x + i, y + i]);
                        if (pieces[x + i][y + i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x + i][y + i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }
        
            // Bottom-left diagonal
            for (let i = 1; i < 8; i++) {
                if (x - i >= 0 && y - i >= 0) { // Check bounds
                    if (isValidMove(x - i, y - i, isBlack)) {
                        possibleMoves.push([x - i, y - i]);
                        if (pieces[x - i][y - i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x - i][y - i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }
        
            // Bottom-right diagonal
            for (let i = 1; i < 8; i++) {
                if (x + i < 8 && y - i >= 0) { // Check bounds
                    if (isValidMove(x + i, y - i, isBlack)) {
                        possibleMoves.push([x + i, y - i]);
                        if (pieces[x + i][y - i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x + i][y - i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }
        
            // Top-left diagonal
            for (let i = 1; i < 8; i++) {
                if (x - i >= 0 && y + i < 8) { // Check bounds
                    if (isValidMove(x - i, y + i, isBlack)) {
                        possibleMoves.push([x - i, y + i]);
                        if (pieces[x - i][y + i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x - i][y + i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }
            break;
        

        case 'q': // Queen

            // Rook moves (horizontal and vertical)
            for (let i = x + 1; i < 8 && isValidMove(i, y, isBlack); i++) {
                possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let i = x - 1; i >= 0 && isValidMove(i, y, isBlack); i--) {
                possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let j = y + 1; j < 8 && isValidMove(x, j, isBlack); j++) {
                possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }
            for (let j = y - 1; j >= 0 && isValidMove(x, j, isBlack); j--) {
                possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }

            // Top-right diagonal
            for (let i = 1; i < 8; i++) {
                if (x + i < 8 && y + i < 8) { // Check bounds
                    if (isValidMove(x + i, y + i, isBlack)) {
                        possibleMoves.push([x + i, y + i]);
                        if (pieces[x + i][y + i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x + i][y + i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }

            // Bottom-left diagonal
            for (let i = 1; i < 8; i++) {
                if (x - i >= 0 && y - i >= 0) { // Check bounds
                    if (isValidMove(x - i, y - i, isBlack)) {
                        possibleMoves.push([x - i, y - i]);
                        if (pieces[x - i][y - i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x - i][y - i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }

            // Bottom-right diagonal
            for (let i = 1; i < 8; i++) {
                if (x + i < 8 && y - i >= 0) { // Check bounds
                    if (isValidMove(x + i, y - i, isBlack)) {
                        possibleMoves.push([x + i, y - i]);
                        if (pieces[x + i][y - i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x + i][y - i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }

            // Top-left diagonal
            for (let i = 1; i < 8; i++) {
                if (x - i >= 0 && y + i < 8) { // Check bounds
                    if (isValidMove(x - i, y + i, isBlack)) {
                        possibleMoves.push([x - i, y + i]);
                        if (pieces[x - i][y + i]) {
                            // Stop if the piece is present. If it's an opponent piece, it's captured.
                            if (isBlackPiece(pieces[x - i][y + i]) !== isBlack) {
                                break; // Capture the piece, stop moving in this direction
                            }
                            break; // Stop if same color piece (can't capture)
                        }
                    } else {
                        break; // Stop if the move is invalid
                    }
                } else {
                    break; // Stop if out of bounds
                }
            }
            break;


        case 'k': // King
            const kingMoves = [
                [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1],
                [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]
            ];
            kingMoves.forEach(([i, j]) => {
                if (isValidMove(i, j, isBlack)) {
                    possibleMoves.push([i, j]);
                }
            });
            break;

        default:
            console.log("Piece type not recognized.");
    }

    return possibleMoves;
}
    
let currentPiece;
let currCords;
let enpassant = false;
let enpassantCords = [];

let count = {
    white: {
        p: 8,
        r: 2,
        n: 2,
        b: 2,
        q: 1
    },
    black: {
        p: 8,
        r: 2,
        n: 2,
        b: 2,
        q: 1
    }
};
let possMoves = [];
let turn = 0; // 0 = white, 1 = black

let exists = (x, y) => {
    return possMoves.some(
        (move) => move[0] === x && move[1] === y
      );    
}

let moveTo = (x, y) => {
    for (let a of possMoves) {
        console.log("move : "+ a);
        const moveSquare = document.getElementById("MT_" + a[0] + ',' + a[1]);
        if (moveSquare) {
            moveSquare.style.opacity = "0"; 
        }
        else {
            console.error("Element not found for " + "MT_" + a[0] + ',' + a[1]);
        }
    }

    if (exists(x,y)){
        let past = pieces[x][y];
        // need to check for the pawn promotion

        if(currentPiece[0] == 'p' && x == enpassantCords[0] + (isBlackPiece(currentPiece) ? 1 : -1) && y == enpassantCords[1]) {
            console.log("En passant captured");
            enpassant = false;
            past = pieces[enpassantCords[0]][enpassantCords[1]];
            pieces[enpassantCords[0]][enpassantCords[1]] = 0;
        }

        if (past) {
            if(past == ('k'+ (currentPiece[1] == 'd' ? 'l' : 'd') +'t')) {
                const gameOver = document.getElementById("gameOver");
                if (gameOver) {  // Make sure the gameOver element is found
                    gameOver.style.display = "block";
                }else {
                    console.error("Element not found for gameOver");
                }
                return;
            }

            count[currentPiece[1] == 'd' ? 'white' : 'black'][currentPiece[1]]--;
            
            console.log("Piece captured: " + past);
            const capturedPiece = document.getElementById(past);
            if (capturedPiece) {
                capturedPiece.style.display = "none";
            }
            else {
                console.error("Element not found for " + past);
            }
        }

        if (currentPiece[0] == 'p' && (x == 0 || x == 7)) {
            let next = prompt("Promote to: (q, r, b, n)");
            pieces[x][y] = next + currentPiece[1] + 't' + count[currentPiece[1] == 'l' ? 'white' : 'black'][currentPiece[0]];
            count[currentPiece[1] == 'l' ? 'white' : 'black'][currentPiece[1]]++;
            
            //make the pawn disappear
            const pawn = document.getElementById(currentPiece);
            if (pawn) {
                pawn.style.display = "none";
            }
            else {
                console.error("Element not found for " + currentPiece);
            }

            const newPiece = document.getElementById(pieces[x][y]);
            if (newPiece) {
                newPiece.style.display = "block";
            }
            else {
                console.error("Element not found for " + pieces[x][y]);
            }
    
        currentPiece = pieces[x][y];
        }
        else if(currentPiece[0] == 'p' && x == currCords[0] -2) {
            console.log("enpassant");
            enpassant = true;
            enpassantCords = [x, y];
            pieces[x][y] = currentPiece;
        }
        else if(currentPiece[0] == 'p' && x == currCords[0] +2) {
            console.log("enpassant");
            enpassant = true;
            enpassantCords = [x, y];
            pieces[x][y] = currentPiece;
        }            
        else{
            pieces[x][y] = currentPiece;
        }

        pieces[currCords[0]][currCords[1]] = 0;

        const img = document.getElementById(currentPiece);
        if (img) {  // Make sure the img element is found
            img.style.filter = "invert(0%)";
            img.style.top = (x * 45) + "px";
            img.style.left = (y * 45) + "px";
        }
        else {
            console.error("Element not found for " + currentPiece);
        }

        const movesto = document.getElementById("movesTo");
        if (movesto) {  // Make sure the movesto element is found
            movesto.style.display = "none";
        }else {
            console.error("Element not found for movesTo");
        }

        turn = (turn == 0 ? 1 : 0);
        if(turn == 0) {
            document.body.style.backgroundColor = "#d2d2d2";
            document.getElementById("title").style.color = "#0b0808";
            document.getElementById("chess").style = " transform: rotate(0deg); transform-origin: center; box-shadow: 0px 0px 10px 10px rgba(193, 135, 10, 0.566);";
            const images = document.querySelectorAll(".imgs");
            images.forEach(img => {
                img.style.transform = "rotate(0deg)";  // Counter-rotate the images to face up
            });
        }
        else {
            document.body.style.backgroundColor = "#0b0808";
            document.getElementById("title").style.color = "#d2d2d2";
            document.getElementById("chess").style = " transform: rotate(180deg); transform-origin: center; box-shadow: 0px 0px 15px 15px rgba(69, 3, 67, 0.570);";
            const images = document.querySelectorAll(".imgs");
            images.forEach(img => {
                img.style.transform = "rotate(180deg)";  // Counter-rotate the images to face up
            });
        }

    }
    else {
        console.log("Invalid move");
        move(x,y);
        return;
    }
}
      

let move = (x, y) => {
    // make the past move disappear
    // set the style of the img with id current piece to style = "filter: invert(0%)"
    // set the .chess .movesto style = "diplay: none"
    
    console.log("move: " + x + ", " + y);


    if (currentPiece) {
        console.log("currentPiece: " + currentPiece);
        const img = document.getElementById(currentPiece)
        if (img) {  // Make sure the img element is found
            img.style.filter = "invert(0%)";
        }
        else {
            console.error("Element not found for " + currentPiece);
        }
    };

    // set the .chess .movesto style = "diplay: none"
    const movesto = document.getElementById("movesTo");
    if (movesto) {  // Make sure the movesto element is found
        movesto.style.display = "none";
    }else {
        console.error("Element not found for movesTo");
    }

    let current = pieces[x][y];
    if (current == 0) return;
    if (current[1] == 'd' && turn == 0 || current[1] == 'l' && turn == 1){
        console.log("not your turn");
        return;
    }

    currentPiece = current;
    currCords = [x, y];
    showmove(x,y);
    // show possible moves for the current piece by changing the color of the squares to green with opacity 0.7
    // set the .chess .movesto style = "diplay: block"
    // set the style of the img with id current piece to style = "filter: invert(45%)"
};

let showmove = (x, y) => {
    const img = document.getElementById(currentPiece);
    img.style.filter = "invert(45%)"; // Ensure currentPiece is a valid ID string

    possMoves = possmoves(x, y);

    for (let a of possMoves) {
        const moveSquare = document.getElementById("MT_" + a[0] + ',' + a[1]);
        if (moveSquare) {
            moveSquare.style.opacity = "0.3"; 
        }
        else {
            console.error("Element not found for " + "MT_" + a[0] + ',' + a[1]);
        }
    }
    
    // set the .chess .movesto style = "diplay: block"
    const movesto = document.getElementById("movesTo");
    if (movesto) {  // Make sure the movesto element is found
        movesto.style.display = "block";
    }else {
        console.error("Element not found for movesTo");
    }
}