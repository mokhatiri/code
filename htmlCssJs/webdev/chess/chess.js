const pieces = [
    ['rdt1', 'ndt1', 'bdt1', 'qdt', 'kdt', 'bdt2', 'ndt2', 'rdt2'], // 1st row: Black pieces
    ['pdt1', 'pdt2', 'pdt3', 'pdt4', 'pdt5', 'pdt6', 'pdt7', 'pdt8'], // 2nd row: Black pawns
    [0, 0, 0, 0, 0, 0, 0, 0], // 3rd row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0], // 4th row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0], // 5th row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0],  // 6th row: Empty
    ['plt1', 'plt2', 'plt3', 'plt4', 'plt5', 'plt6', 'plt7', 'plt8'], // 7nd row: White pawns
    ['rlt1', 'nlt1', 'blt1', 'qlt', 'klt', 'blt2', 'nlt2', 'rlt2'], // 8th row: White pieces
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
            if (isValidMove(x + direction, y, isBlack) && !pieces[x + direction][y]) {
                possibleMoves.push([x + direction, y]);
            }
            if (isValidMove(x + direction, y - 1, isBlack) && pieces[x + direction][y - 1]) {
                possibleMoves.push([x + direction, y - 1]);
            }
            if (isValidMove(x + direction, y + 1, isBlack) && pieces[x + direction][y + 1]) {
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

    if (exists(x,y)){}
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
    console.log("success: " + current);
    if (current == 0) return;
    if (current[1] == 'd' && turn == 0 || current[1] == 'l' && turn == 1){
        console.log("not your turn");
        return;
    }

    currentPiece = current;
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
        console.log("move : "+ a);
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

    console.log(possMoves);
}