export const mBoard = [];

export function initBoard(boardWidth, boardHeight){
    if(mBoard.length == boardWidth * boardHeight){
        mBoard.fill(0);
        return;
    }
    while(mBoard.length < boardWidth * boardHeight){
        mBoard.push(0);
    }
}

export function setBoardPosition(x, y, value, boardWidth){
    mBoard[y * boardWidth + x] = value;
}

export function getBoardPosition(x, y, boardWidth){
    return (mBoard.at(y * boardWidth + x) == 1);
}

export function drawBoard(context, pieceSize, boardWidth, boardHeight){
    context.fillStyle = "green";

    for(let x = 0; x < boardWidth; ++x){
        for(let y = 0; y < boardHeight; ++y){
            if(getBoardPosition(x, y, boardWidth)){
                context.fillRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);
            }
        }
    }
}