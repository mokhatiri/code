// main variables
let pieces = [
    ['rd', 'nd', 'bd', 'qd', 'kd', 'bd', 'nd', 'rd'],
    ['pd', 'pd', 'pd', 'pd', 'pd', 'pd', 'pd', 'pd'],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ['pl', 'pl', 'pl', 'pl', 'pl', 'pl', 'pl', 'pl'],
    ['rl', 'nl', 'bl', 'ql', 'kl', 'bl', 'nl', 'rl'],
    // 0 = empty
];
let casteling = [true, true, true, true];
let turn = 0; // 0 = white, 1 = black
let enpassant = false;
let enpassantCords = [];

// main functions

// if the pieceNaming is black return true
function isBlackPiece(pieceName) {
    return pieceName && pieceName[1] === 'd';
};

// if the position is valid for the given color return true
function isValidMove(x, y, isBlack) {
    check = (x >= 0 && x < 8 && y >= 0 && y < 8 && (!pieces[x][y] || isBlackPiece(pieces[x][y]) !== isBlack));
    // Check if a position is within board bounds and optionally if it's occupied
    return check;
};

// check all the possible moves for the given piece at x,y coords
function Allpossmoves(x, y) {
    const piece = pieces[x][y];
    if (!piece) {
        return [];
    }

    const QueenSideCastling = [casteling[0],casteling[1]];
    const KingSideCastling = [casteling[2],casteling[3]];
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
            if(QueenSideCastling[isBlack ? 1:0]){
                if(pieces[x][y-1] == 0 && pieces[x][y-2] == 0 && pieces[x][y-2] == 0){
                    possibleMoves.push([x,y-2]);
                }
            };
            if(KingSideCastling[isBlack ? 1:0]){
                if(pieces[x][y+1] == 0 && pieces[x][y+2] == 0){
                    possibleMoves.push([x,y+2]);
                }
            };

        break;

        default:
    }


    return possibleMoves;
};

// check if the piece is black
function isKing(piece) {
    return piece[0] === 'k';
};

// check if the current board is in check
function isCheckAll(){
    let check = false;

    // suppose we move x1,y1 to x,y
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i].length; j++) {
            if (pieces[i][j] && ((isBlackPiece(pieces[i][j]) ? 1 : 0) !== turn)) {
                // Check each move of the opposing pieces to see if they can take the king.
                let possibleMoves = Allpossmoves(i, j);
                for (let move of possibleMoves) {
                    if (isKing(pieces[move[0]][move[1]])) {
                        check = true;
                        break;
                    }
                }
            }
            if (check) break;
        }
        if (check) break;
    }

    return check;
};

// check if the board after moving x1,y1 to x,y will be in check
function isCheck(x, y, x1, y1) {
    // suppose we move x1,y1 to x,y
    // this also takes the possibility of taking a 0 into account

    // Save the initial pieces at the source and target positions
    let pastTarget = pieces[x][y];
    let pastSource = pieces[x1][y1];

    // Move the piece to the new position
    pieces[x][y] = pieces[x1][y1];
    pieces[x1][y1] = 0;

    // check if the board after the change is in check
    let check = isCheckAll();

    // Restore the pieces to their original positions
    pieces[x][y] = pastTarget;
    pieces[x1][y1] = pastSource;

    return check;
};

// check if the current board is in checkmate
function isCheckMate() {

    // Find all pieces of the opposing player
    // Check if there's any move by the opposing player that is not a check
    for (let i = 0; i < pieces.length; i++) {
        for (let j = 0; j < pieces[i].length; j++) {
            if (pieces[i][j] && pieces[i][j][1] == (!turn ? 'l' : 'd')) {
                let possibleMoves = Allpossmoves(i, j);
                for (let move of possibleMoves) {
                    if (!isCheck(move[0], move[1], i, j)) {
                        return [false, isCheckAll()];
                    }
                }
            }
        }
    }

    // if it's a check, it's a checkmate so basically [true, true]
    // if it's not a check, it's a stalemate so basically [true, false]
    return [true , isCheckAll()];
};

// finds possible moves for the piece at position x,y
function possmoves(x, y) {
    const piece = pieces[x][y];
    if (!piece) {
        return [];
    }

    const QueenSideCastling = [casteling[1],casteling[0]];
    const KingSideCastling = [casteling[3],casteling[2]];
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
                if(!isCheck(x+direction,y,x,y)) possibleMoves.push([x + direction, y]);
            }
        
            // Two-square forward move (only on the first move)
            if (x === startRow && !pieces[x + direction][y] && !pieces[x + (2 * direction)][y]) {
                if(!isCheck(x + (2* direction),y,x,y)) possibleMoves.push([x + (2 * direction), y]);
            }
        
            // Diagonal captures (one square diagonally)
            // and en passant
            if (isValidMove(x + direction, y - 1, isBlack) && (pieces[x + direction][y - 1] || ( enpassant && enpassantCords[0] == x && enpassantCords[1] == y-1) )) {
                if(!isCheck(x + direction,y-1,x,y)) possibleMoves.push([x + direction, y - 1]);
            }
            if (isValidMove(x + direction, y + 1, isBlack) && (pieces[x + direction][y + 1] || ( enpassant && enpassantCords[0] == x && enpassantCords[1] == y+1))) {
                if(!isCheck(x+direction,y+1,x,y)) possibleMoves.push([x + direction, y + 1]);
            }
            break;
    

        case 'r': // Rook
            for (let i = x + 1; i < 8 && isValidMove(i, y, isBlack); i++) {
                if(!isCheck(i,y,x,y)) possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let i = x - 1; i >= 0 && isValidMove(i, y, isBlack); i--) {
                if(!isCheck(i,y,x,y)) possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let j = y + 1; j < 8 && isValidMove(x, j, isBlack); j++) {
                if(!isCheck(x,j,x,y)) possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }
            for (let j = y - 1; j >= 0 && isValidMove(x, j, isBlack); j--) {
                if(!isCheck(x,j,x,y)) possibleMoves.push([x, j]);
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
                    if(!isCheck(i,j,x,y)) possibleMoves.push([i, j]);
                }
            });
            break;

        case 'b': // Bishop
            // Top-right diagonal
            for (let i = 1; i < 8; i++) {
                if (x + i < 8 && y + i < 8) { // Check bounds
                    if (isValidMove(x + i, y + i, isBlack)) {
                        if(!isCheck(x+i,y+i,x,y)) possibleMoves.push([x + i, y + i]);
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
                        if(!isCheck(x-i,y-i,x,y)) possibleMoves.push([x - i, y - i]);
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
                        if(!isCheck(x+i,y-i,x,y)) possibleMoves.push([x + i, y - i]);
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
                        if(!isCheck(x-i,y+i,x,y)) possibleMoves.push([x - i, y + i]);
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
                if(!isCheck(i,y,x,y)) possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let i = x - 1; i >= 0 && isValidMove(i, y, isBlack); i--) {
                if(!isCheck(i,y,x,y)) possibleMoves.push([i, y]);
                if (pieces[i][y]) break;
            }
            for (let j = y + 1; j < 8 && isValidMove(x, j, isBlack); j++) {
                if(!isCheck(x,j,x,y)) possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }
            for (let j = y - 1; j >= 0 && isValidMove(x, j, isBlack); j--) {
                if(!isCheck(x,j,x,y)) possibleMoves.push([x, j]);
                if (pieces[x][j]) break;
            }

            // Top-right diagonal
            for (let i = 1; i < 8; i++) {
                if (x + i < 8 && y + i < 8) { // Check bounds
                    if (isValidMove(x + i, y + i, isBlack)) {
                        if(!isCheck(x+i,y+i,x,y)) possibleMoves.push([x + i, y + i]);
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
                        if(!isCheck(x-i,y-i,x,y)) possibleMoves.push([x - i, y - i]);
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
                        if(!isCheck(x+i,y-i,x,y)) possibleMoves.push([x + i, y - i]);
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
                        if(!isCheck(x-i,y+i,x,y))possibleMoves.push([x - i, y + i]);
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
                    if(!isCheck(i,j,x,y)) possibleMoves.push([i, j]);
                }
            });

            if(QueenSideCastling[isBlack ? 1:0]){
                if(pieces[x][y-1] == 0 && pieces[x][y-2] == 0 && !isCheckAll(turn) && pieces[x][y-2] == 0 && !isCheck(x,y-1,x,y) && !isCheck(x,y-2,x,y) && !isCheck(x,y-3,x,y)){
                    possibleMoves.push([x,y-2]);
                }
            };
            if(KingSideCastling[isBlack ? 1:0]){
                if(pieces[x][y+1] == 0 && pieces[x][y+2] == 0 && !isCheckAll(turn) && !isCheck(x,y+1,x,y) && !isCheck(x,y+2,x,y)){
                    possibleMoves.push([x,y+2]);
                }
            };

            break;

        default:
    }

    return possibleMoves;
};
 
// checks if the move is possible x1,y1 -> x,y
function isposs(x,y,x1,y1){
    if(!pieces[x1][y1]) return false;
    return possmoves(x1,y1).some((move) => move[0] === x && move[1] === y);
};

// this function takes a piece and moves it to the given x,y
// this is a general move function doesn't take into account any of the given constraints
function Gmove(x,y,x1,y1){
    pieces[x][y] = pieces[x1][y1];
    pieces[x1][y1] = 0;
};

// checks if the move is a promotion from the position x1,y1 
function isPawnPromotion(x,y,x1,y1){
    if(pieces[x1][y1][0] == 'p'){
        if((x1 == 1 && x == 0) || (x1 == 6 && x == 7)){
            return true;
        }
    }
    return false;
};

// checks if the move is a casteling from the position x1,y1
// this supposes the move is valid as the only way a king is moving two spaces is if he is casteling
function isCasteling(x,y,x1,y1){
    return (pieces[x1][y1][0] == 'k' && (y1-y == 2 || y1-y == -2));
};

// this will check if enpassant is possible in the next move
function isEnPassantPossible(x,y,x1,y1){
    if(pieces[x1][y1][0] == 'p'){
        return (x1 - x == 2 || x1 - x == -2);
    }
    return false;
};

// this will determine if the move is an enpassant
// the pawn moved diagonaly and the space is empty
function isEnPassant(x,y,x1,y1){
    return (enpassant && pieces[x1][y1][0] == 'p' && pieces[x][y] == 0 && (x1-x == 1 || x1-x == -1) && (y1-y == 1 || y1-y == -1));
};

// this will notice the player about the promotion and determines the piece to turn to
function  promotionNotice(){
    return  prompt("what piece do you want to promote to? (q,r,b,n)");
};

// this function returns the casteling rights to the correct value after a supposed move
function CastelingRights(x1,y1){

    if(pieces[x1][y1][0] == 'k'){
        if(y1 == 4){
            if(x1 == 0){
                casteling[0] = false;
                casteling[2] = false;
            }
            else if(x1 == 7){
                casteling[1] = false;
                casteling[3] = false;
            }
        }
    }
    else if(pieces[x1][y1][0] == 'r'){
        if(x1 == 0){
            if(y1 == 0){
                casteling[0] = false;
            }
            else if(y1 == 7){
                casteling[2] = false;
            }
        }
        else if(x1 == 7){
            if(y1 == 0){
                casteling[1] = false;
            }
            else if(y1 == 7){
                casteling[3] = false;
            }
        }
    }

};  

// this function moves the piece only if it's valid and takes into account the constraints
// let's take into account the possibility of casteling and en passant and pawn promotion
// this also changes the casteling rights and the enpassant rights
// and return true if a move was made
// the prompter will determine the way to chose the piece to promote to
function DoMove(x,y,x1,y1,promompter){
    if(isposs(x,y,x1,y1)){

        if(isPawnPromotion(x,y,x1,y1)){
            console.log("promotion in", x,y,x1,y1);
            console.log(promompter);
            const promote = promompter();
            pieces[x1][y1] = promote+pieces[x1][y1][1];
        }
        if(isCasteling(x,y,x1,y1)){
            // if the side is queen side
            if(y == 2){
                pieces[x][3] = pieces[x][0];
                pieces[x][0] = 0;
            }
            // this is the king side
            else if(y == 6){
                pieces[x][5] = pieces[x][7];
                pieces[x][7] = 0;
            }
        }
        if(isEnPassant(x,y,x1,y1)){
            pieces[enpassantCords[0]][enpassantCords[1]] = 0;
        }
                
        enpassant = isEnPassantPossible(x,y,x1,y1);
        if(enpassant) enpassantCords = [x,y];
        CastelingRights(x1,y1);

        Gmove(x,y,x1,y1);
        return true;
    }
    return false;
};



/*
this part will take care of the visuale part of the game
*/



// main visual variables
let visualBoard = [
    ['rdt1', 'ndt1', 'bdt1', 'qdt1', 'kdt', 'bdt2', 'ndt2', 'rdt2'], // 1st row: Black pieces
    ['pdt1', 'pdt2', 'pdt3', 'pdt4', 'pdt5', 'pdt6', 'pdt7', 'pdt8'], // 2nd row: Black pawns
    [0, 0, 0, 0, 0, 0, 0, 0], // 3rd row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0], // 4th row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0], // 5th row: Empty
    [0, 0, 0, 0, 0, 0, 0, 0],  // 6th row: Empty
    ['plt1', 'plt2', 'plt3', 'plt4', 'plt5', 'plt6', 'plt7', 'plt8'], // 7nd row: White pawns
    ['rlt1', 'nlt1', 'blt1', 'qlt1', 'klt', 'blt2', 'nlt2', 'rlt2'], // 8th row: White pieces
    // 0 = empty
    // naming : #1#2t#3 : #1 = type, #2 = color (d:dark,l:light), #3 = count(if exists)
];
let currCords = [0,0];
let invertedPiece = visualBoard[0][0];
let pastMoves = [];

// this functions shows visualy all the possible moves for a given piece
function showmove(x, y) {

    let invertedPiece = visualBoard[x][y];
    document.getElementById(invertedPiece).style.filter = "invert(45%)"; // Ensure currentPiece is a valid ID string
    pastMoves = possmoves(x, y);

    // for each possible move, set the corresponding square to opacity 0.3
    for (let a of pastMoves) {
        const moveSquare = document.getElementById("MT_" + a[0] + ',' + a[1]);
        if (moveSquare) {
            moveSquare.style.opacity = "0.3"; 
        }
        else {
            console.error("Element not found for " + "MT_" + a[0] + ',' + a[1]);
        }
    }
};

// this function will open the possibility for the player to use the tomove function
// set the Movesto div style to "diplay: block"
function openTomove(){
    const movesto = document.getElementById("movesTo");
    if (movesto) {  // Make sure the movesto element is found
        movesto.style.display = "block";
    }else {
        console.error("Element not found for movesTo");
    }
};

// this function will close the possibility for the player to use the tomove function
// set the Movesto div style to "diplay: none"
function closeTomove(){
    const movesto = document.getElementById("movesTo");
    if (movesto) {  // Make sure the movesto element is found
        movesto.style.display = "none";
    }else {
        console.error("Element not found for movesTo");
    }
};

// this function will reset the visual board back to normal state
function resetBoard(){    
    document.getElementById(invertedPiece).style.filter = "invert(0%)";

    for (let a of pastMoves){
        const moveSquare = document.getElementById("MT_" + a[0] + ',' + a[1]);
        if (moveSquare) {
            moveSquare.style.opacity = "0"; 
        }
        else {
            console.error("Element not found for " + "MT_" + a[0] + ',' + a[1]);
        }
    }   

    closeTomove();
};

// this function will check the compatibility of the current piece with the turn
function checkTurn(){
    curr = pieces[currCords[0]][currCords[1]];
    return (curr[1] == 'd' && turn == 1 || curr[1] == 'l' && turn == 0);
};

// this function shows all the possible moves for a given piece
// and resets the current piece value
function move(x,y){

    resetBoard();
    // set the current piece to the new piece
    currCords = [x,y];
    if (!checkTurn()) return;
    showmove(x,y);

    openTomove();
};

// update the colors for each player
function updateTurn(){

    const mode = document.getElementsByClassName("modeButton");
    if(turn == 0) {
        document.body.style.backgroundColor = "#d2d2d2";
        document.getElementById("title").style.color = "#0b0808";
        for (let element of mode) {
            element.style.backgroundColor = "#0b0808";
            element.style.color = "#d2d2d2";
        }
        document.getElementById("chess").style = " transform: rotate(0deg); transform-origin: center; box-shadow: 0px 0px 10px 10px rgba(193, 135, 10, 0.566);";
        const images = document.querySelectorAll(".imgs");
        images.forEach(img => {
            img.style.transform = "rotate(0deg)";  // Counter-rotate the images to face up
        });
    }
    else {
        document.body.style.backgroundColor = "#0b0808";
        for (let element of mode) {
            element.style.backgroundColor = "#d2d2d2";
            element.style.color = "#0b0808";
        }
        document.getElementById("title").style.color = "#d2d2d2";
        document.getElementById("chess").style = " transform: rotate(180deg); transform-origin: center; box-shadow: 0px 0px 15px 15px rgba(69, 3, 67, 0.570);";
        const images = document.querySelectorAll(".imgs");
        images.forEach(img => {
            img.style.transform = "rotate(180deg)";  // Counter-rotate the images to face up
        });
    }
};

// update the pieces placement
function updatePieces(){
    let pieceCount = {
        'l':{
            'p':0,
            'n':0,
            'b':0,
            'r':0,
            'q':0
        },
        'd':{
            'p':0,
            'n':0,
            'b':0,
            'r':0,
            'q':0
        }
    };

    // turn all the pieces to no diplay
    for(let x = 0; x < 8; x++) {
        for(let y = 0; y < 8; y++) {
            if(visualBoard[x][y]){
                img = document.getElementById(visualBoard[x][y]);
                img.style.display = "none";
            }
        }
    }

    // update the visual board
    let piece;
    for(let i = 0; i < pieces.length; i++) {
        for(let j = 0; j < pieces[i].length; j++) {

            if(pieces[i][j][0] == 'k') piece = pieces[i][j]+'t';
            else if(pieces[i][j]) piece = pieces[i][j]+'t'+(++pieceCount[pieces[i][j][1]][pieces[i][j][0]]);
            else piece = 0;

            visualBoard[i][j] = piece;

            if(visualBoard[i][j]){
                img = document.getElementById(piece);
                img.style.display = "block";
                img.style.filter = "invert(0%)";
                img.style.top = (i * 45) + "px";
                img.style.left = (j * 45) + "px";
            }       
        }
    }
    
};

// gives the score on a scale of 0 to 1
function getGameScore(eval) {
    const scale = 4000; // Adjust this based on the maximum evaluation range
    // Normalize eval to the range [0, 1]
    let score = (eval + scale) / (2 * scale);
    // Ensure the score stays within [0, 1]
    score = Math.max(0, Math.min(1, score));
    return score;
};

// this updates the players bar
function updatePlayerBar(playerValue, playerElement) {
    // Clamp player value to the range [-100, 100] and normalize to [0, 1]
    let normalizedValue = getGameScore(playerValue);

    const barFill = playerElement.querySelector('.bar-fill');
    // Set the background to a gradient that goes from black to white based on the normalized value
    barFill.style.background = `linear-gradient(to right, black ${(1- normalizedValue) * 100}%, white ${0}%)`;
};

// this function will update the score
function updateScore(){
    const playerBar = document.querySelector('.player-bar');
    updatePlayerBar(evaluate(), playerBar);
};

// update the check for each round
function updateCheck(){
    let checker = isCheckMate();

    // check for checkmate
    if(checker[0] && checker[1]) {
        document.getElementById(('k'+ (!turn ? 'l': 'd' ) +'t')).style.filter = "drop-shadow(0px 0px 22px #ff0000)";
        const gameOver = document.getElementById("gameOver");
        if (gameOver) {  // Make sure the gameOver element is found
            gameOver.style.display = "block";
        }else {
            console.error("Element not found for gameOver");
        }
        return;
    }

    // check for stalemate
    if(checker[0] && !checker[1]) {
        const gameOver = document.getElementById("Stalemate");
        if (gameOver) {  // Make sure the gameOver element is found
            gameOver.style.display = "block";
        }else {
            console.error("Element not found for gameOver");
        }
        return;
    }

    // check for check
    document.getElementById(('k'+ (turn ? 'l': 'd' ) +'t')).style.filter = "drop-shadow(0px 0px 22px #000000)";
    if(checker[1]) {
        console.log(('k'+ (!turn ? 'l': 'd' )+'t'));
        console.log("Check!");
        document.getElementById(('k'+ (!turn ? 'l': 'd' )+'t')).style.filter = "drop-shadow(0px 0px 22px #ff0000)";
    }
    else {
        document.getElementById(('k'+ (!turn ? 'l': 'd' )+'t')).style.filter = "drop-shadow(0px 0px 22px #000000)";
    }

};

// update the whole board
function updateBoard(){
    // reset the board first
    resetBoard();
    // first update the turn
    updateTurn();
    // then update the pieces
    updatePieces();
    updateCheck();
    updateScore();
};

// this function determines the person to move next
function nextMove(){
    if(AI && AI_COLOR == turn) {
        AImove();
    }
};

// the move to function
function moveTo(x,y,promotion = promotionNotice){
    if(DoMove(x,y,currCords[0],currCords[1],promotion)) turn = turn ? 0:1;
    updateBoard();
    nextMove();
};

// this is a reset function
function restart() {
    location.reload();      
};

// this is the change mode function
function changeMode() {
    const mode = document.getElementById("Mode");
    if (mode.textContent == "2 players") {
        mode.textContent = "AI"; 
        AI_COLOR = (prompt("Choose the players color (0 for white, 1 for black): ") == 1) ? 0 : 1;
        AI = true;
    }
    else {mode.textContent = "2 players"; AI = false;}

    if(AI && AI_COLOR == turn) {
        AImove();
    }
};


/*

this part is for the AI implementation
in this part i am going to make a minimax algorithm using alphabeta pruning and determine the possible best move
the score is max for white and min for black

*/



// AI variables
let AI = false;
let AI_COLOR = 0;
let AI_DEPTH = 4;

// AI functions

// AImove function
function AImove() {
    // save the currentpiece
    let board = JSON.parse(JSON.stringify(pieces));

    // since turn is 0 for white and 1 for black
    // maximizing player is white
    // minimizing player is black
    let bestMove = findBestMove(AI_DEPTH);
    let toX = bestMove[0];
    let toY = bestMove[1];
    let fromX = bestMove[2];
    let fromY = bestMove[3];
    let promotion = bestMove[4];

    console.log("*******AI*******");
    console.log("bestmove: " + bestMove);

    // incase no move is found
    // set it to a random move
    if(toX == 0 && toY == 0 && fromX == 0 && fromY == 0){
        let ranmove = randmove();
        console.log("randmove: " + ranmove);
        fromX = ranmove[0];
        fromY = ranmove[1];
        toX = ranmove[2];
        toY = ranmove[3];
        promotion = promotionNotice;
    }
    console.log("bestmove: " + bestMove);
    console.log("******************");

    if(toX == 0 && toY == 0 && fromX == 0 && fromY == 0){
        return;
    }
    move(fromX, fromY);
    moveTo(toX, toY,() => promotion);
};

// generates a random possible move
function  randmove() {
    console.log("********RMG********");
    let moves = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (pieces[i][j] != 0) {
                let piece = pieces[i][j];
                if (piece[1] == 'd' && turn == 1 || piece[1] == 'l' && turn == 0) {
                    console.log("piece:", piece);
                    let possMoves = possmoves(i, j);
                    for (let move of possMoves) {
                        moves.push([i, j, move[0], move[1]]);
                    }
                }
            }
        }
    }
    console.log("*****************");
    if (moves.length == 0) {
        return [0, 0, 0, 0];
    }
    return moves[Math.floor(Math.random() * moves.length)];
};

// determines the best move according to the minimax algorithm
function findBestMove(depth) {
    let bestMove = [0,0,0,0,false];
    let bestEval = (turn === 0) ? -Infinity : Infinity; // Initialize bestEval for white or black

    // Loop over all pieces of the current player
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (!pieces[i][j]) continue; // Skip empty squares

            // Check if it's the current player's piece
            if ((turn === 0 && pieces[i][j][1] === 'l') ||  // 'l' for white
                (turn === 1 && pieces[i][j][1] === 'd')) { // 'd' for black

                const possMoves = possmoves(i, j);  // Get possible moves for the piece
                for (let move of possMoves) {
                    const boardState = {
                        pieces: JSON.parse(JSON.stringify(pieces)),
                        casteling: [...casteling],
                        enpassant,
                        enpassantCords: [...enpassantCords],
                        turn
                    };

                    // Handle pawn promotion
                    if (isPawnPromotion(i, j, move[0], move[1])) {
                        for (let promotion of ['q', 'r', 'b', 'n']) {
                            DoMove(move[0], move[1], i, j, () => promotion);

                            // Call minimax function to evaluate the move
                            let eval = minimax(depth - 1, -Infinity, Infinity, turn === 1 ? true : false);
                            if ((turn === 0 && eval > bestEval) || (turn === 1 && eval < bestEval)) {
                                bestEval = eval;
                                bestMove = [move[0],move[1],i,j,promotion];
                            }

                            // Restore the board state after the move
                            pieces = JSON.parse(JSON.stringify(boardState.pieces));
                            casteling = [...boardState.casteling];
                            enpassant = boardState.enpassant;
                            enpassantCords = [...boardState.enpassantCords];
                            turn = boardState.turn;
                        }
                    } else {
                        // If it's not a pawn promotion, just do the move normally
                        DoMove(move[0], move[1], i, j, false);

                        // Call minimax function to evaluate the move
                        let eval = minimax(depth - 1, -Infinity, Infinity, turn === 1 ? true : false);
                        if ((turn === 0 && eval > bestEval) || (turn === 1 && eval < bestEval)) {
                            bestEval = eval;
                            bestMove = [move[0],move[1],i,j,false];
                        }

                        // Restore the board state after the move
                        pieces = JSON.parse(JSON.stringify(boardState.pieces));
                        casteling = [...boardState.casteling];
                        enpassant = boardState.enpassant;
                        enpassantCords = [...boardState.enpassantCords];
                        turn = boardState.turn;
                    }

                    if (bestMove && (turn === 0 && bestEval === Infinity || turn === 1 && bestEval === -Infinity)) {
                        // If we already found a checkmate situation, no need to continue exploring other moves
                        break;
                    }
                }
            }
        }
    }

    console.log("bestEval:", bestEval);
    return bestMove;
};

// the minimax algorithm implimentation
function minimax(depth, alpha, beta, maximizingPlayer) {
    if(isCheckMate()[0] || depth === 0) {    
        return evaluate();
    }
    let bestEval = (maximizingPlayer) ? -Infinity : Infinity;

    if (maximizingPlayer) {
        // let's determine the pieces of the player 'white'
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                // if no piece then continue
                if (!pieces[i][j]) continue;
                // if white piece then check it out since white is the maximizing player
                if (pieces[i][j][1] == 'l'){

                    // for every possible move of the piece
                    possMoves = possmoves(i, j);
                    for (let a of possMoves) {
                        // save the board
                        let board = JSON.parse(JSON.stringify(pieces));
                        let tempCasteling = [...casteling];
                        let tempEnpassant = enpassant;
                        let tempEnpassantCords = [...enpassantCords];
                        let tempTurn = turn;
                        
                        // move the piece and check the evaluation of the move
                        // incase it's a promotion
                        if (isPawnPromotion(a[0], a[1], i, j)) {
                            // check every possible promotion case
                            for(let choice of ['q', 'r', 'b', 'n']) {
                                DoMove(a[0], a[1], i, j, () => choice);
                                turn = 1 - turn;
                                let eval = minimax(depth - 1, alpha, beta, false);
                                bestEval = Math.max(bestEval, eval);
                                alpha = Math.max(alpha, eval);

                                // return the board to the original state
                                pieces = JSON.parse(JSON.stringify(board));
                                casteling = [...tempCasteling];
                                enpassant = tempEnpassant;
                                enpassantCords = [...tempEnpassantCords];
                                turn = tempTurn;

                                if (beta <= alpha) break;
                            }
                        }
                        // if not a promotion
                        else {
                            // just move the piece
                            // check the evaluation of the move
                            // if it's higher than the previous best evaluation then update the best evaluation
                            // if moving this piece has a higher evaluation then alpha update alpha
                            DoMove(a[0], a[1], i, j, false);
                            turn = 1 - turn;
                            let eval = minimax(depth - 1, alpha, beta, false);
                            bestEval = Math.max(bestEval, eval);
                            alpha = Math.max(alpha, eval);
                            
                            // return the board to the original state
                            pieces = JSON.parse(JSON.stringify(board));
                            casteling = [...tempCasteling];
                            enpassant = tempEnpassant;
                            enpassantCords = [...tempEnpassantCords];
                            turn = tempTurn;
                        }

                        // incase beta is less than or equal to alpha then check another piece
                        if (beta <= alpha) break;
                    }
                }
            }
        }
    }
    // incase we are not maximizing then we are minimizing
    else {
        // let's determine the pieces of the player 'black'
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                // if no piece then continue
                if (!pieces[i][j]) continue;
                // if black piece then check it out since black is the minimizing player
                if (pieces[i][j][1] == 'd'){

                    // for every possible move of the piece
                    possMoves = possmoves(i, j);
                    for (let a of possMoves) {
                        // save the board
                        let board = JSON.parse(JSON.stringify(pieces));
                        let tempCasteling = [...casteling];
                        let tempEnpassant = enpassant;
                        let tempEnpassantCords = [...enpassantCords];
                        let tempTurn = turn;
                        
                        // move the piece and check the evaluation of the move
                        // incase it's a promotion
                        if (isPawnPromotion(a[0], a[1], i, j)) {
                            // check every possible promotion case
                            for(let choice of ['q', 'r', 'b', 'n']) {
                                DoMove(a[0], a[1], i, j, () => choice);
                                turn = 1 - turn;
                                let eval = minimax(depth - 1, alpha, beta, true);
                                bestEval = Math.min(bestEval, eval);
                                beta = Math.min(beta, eval);

                                // return the board to the original state
                                pieces = JSON.parse(JSON.stringify(board));
                                casteling = [...tempCasteling];
                                enpassant = tempEnpassant;
                                enpassantCords = [...tempEnpassantCords];
                                turn = tempTurn;

                                if (beta <= alpha) break;
                            }
                        }
                        // if not a promotion
                        else {
                            // just move the piece
                            // check the evaluation of the move
                            // if it's lower than the previous best evaluation then update the min evaluation
                            // if moving this piece has a lower evaluation then beta update alpha
                            DoMove(a[0], a[1], i, j, false);
                            turn = 1 - turn;
                            let eval = minimax(depth - 1, alpha, beta, true);
                            bestEval = Math.min(bestEval, eval);
                            beta = Math.min(beta, eval);
                            
                            // return the board to the original state
                            pieces = JSON.parse(JSON.stringify(board));
                            casteling = [...tempCasteling];
                            enpassant = tempEnpassant;
                            enpassantCords = [...tempEnpassantCords];
                            turn = tempTurn;
                        }

                        // incase beta is less than or equal to alpha then check another piece
                        if (beta <= alpha) break;
                    }
                }
            }
        }
    }

    return bestEval;
};

function evaluate() {
    // Piece values for standard chess
    const pieceValues = {
        'p': 100,  // Pawn
        'n': 320,  // Knight
        'b': 330,  // Bishop
        'r': 500,  // Rook
        'q': 900,  // Queen
        'k': 20000 // King
    };

    // Positional tables for pawns (example, others can be added similarly)
    const positionTables = {
        'p': [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [5, 5, 5, 5, 5, 5, 5, 5],
            [1, 1, 2, 3, 3, 2, 1, 1],
            [0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [1, -1, -2, 0, 0, -2, -1, 1],
            [1, 2, 2, -2, -2, 2, 2, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ],
    };

    let score = 0;

    // Material and positional evaluation
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = pieces[i][j];
            if (cell) {
                const piece = cell[0]; // Piece type ('p', 'n', 'b', etc.)
                const side = cell[1]; // Side ('l' for white, 'd' for black)
                const value = pieceValues[piece] || 0;
                const positionValue = (positionTables[piece] || [])[i]?.[j] || 0;

                // Add value for White's pieces, subtract for Black's pieces
                if (side === 'l') {
                    score += value + positionValue;
                } else if (side === 'd') {
                    score -= value + positionValue;
                }
            }
        }
    }

    // Mobility bonus
    let whiteMobility = 0, blackMobility = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (pieces[i][j]) {
                const side = pieces[i][j][1];
                const moves = Allpossmoves(i, j);
                if (side === 'l') {
                    whiteMobility += moves.length;
                } else if (side === 'd') {
                    blackMobility += moves.length;
                }
            }
        }
    }
    score += (whiteMobility - blackMobility) * 10;

    // King safety
    if (isCheckAll() && turn === 0) score -= 50; // White king in check
    if (isCheckAll() && turn === 1) score += 50; // Black king in check

    // Checkmate/Stalemate bonuses or penalties
    const checkMateStatus = isCheckMate();
    if (checkMateStatus[0]) {
        if (checkMateStatus[1]) {
            // Checkmate: heavily favor the winning side
            score += turn === 0 ? -100000 : 100000;
        } else {
            // Stalemate: slightly penalize for losing winning potential
            score += turn === 0 ? -500 : 500;
        }
    }

    return score;
};

// Helper function to get the value of a piece
function getPieceValue(piece) {
    const pieceType = piece[0];  // e.g., 'p' for pawn, 'r' for rook, etc.
    
    const pieceValues = {
        'p': 1,  // Pawn value
        'n': 3,  // Knight value
        'b': 3,  // Bishop value
        'r': 5,  // Rook value
        'q': 9,  // Queen value
        'k': 0   // King value (not typically evaluated, but can be for king safety)
    };

    return pieceValues[pieceType] || 0;  // Return 0 if the piece is not recognized
};
