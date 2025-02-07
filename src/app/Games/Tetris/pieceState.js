const oBlock = [
    1, 1,
    1, 1
];
const sBlock = [
    0, 1, 1,
    1, 1, 0,
    0, 0, 0
];
const zBlock = [
    1, 1, 0,
    0, 1, 1,
    0, 0, 0
];
const lBlock = [
    0, 0, 1,
    1, 1, 1,
    0, 0, 0
];
const jBlock = [
    1, 0, 0,
    1, 1, 1,
    0, 0, 0
];
const tBlock = [
    0, 1, 0,
    1, 1, 1,
    0, 0, 0
];
const iBlock = [
    0, 0, 0, 0,
    1, 1, 1, 1,
    0, 0, 0, 0,
    0, 0, 0, 0
];

const allBlocks = [
    {data: oBlock, width: 2},
    {data: sBlock, width: 3},
    {data: zBlock, width: 3},
    {data: lBlock, width: 3},
    {data: jBlock, width: 3},
    {data: tBlock, width: 3},
    {data: iBlock, width: 4}
];


export function getBlock(){
    let randNum = Math.floor(Math.random() * allBlocks.length);
    console.log(randNum);
    return allBlocks[randNum];
}

export class State{
    piece;
    rotation = 0;
    xOffset = 0;
    yOffset = 0;
    
    constructor(boardWidth, p) {
        this.piece = p;
        this.rotation = 0;
        this.xOffset = Math.floor(boardWidth / 2) - Math.floor(p.width / 2);
        this.yOffset = -1;
    }
};

export function getPieceData(piece, x, y, rotation){
    switch(rotation){
        case 0:
            return piece.data[y * piece.width + x];
        case 1:
            return piece.data[(piece.width - x - 1) * piece.width + y];
        case 2:
            return piece.data[(piece.width - y - 1) * piece.width + (piece.width - x - 1)];
        case 3:
            return piece.data[(piece.width * x) + (piece.width - y - 1)];
        default:
            return 0;
    }
}

export function drawPiece(context, pieceSize, piece, rotation, xOffset, yOffset, ghostPiece = false){
    context.fillStyle = "red";
    if(!ghostPiece) context.strokeStyle = "white";
    else context.strokeStyle= "red";
    context.lineWidth = 1;

    for(let x = 0; x < piece.width; ++x){
        for(let y = 0; y < piece.width; ++y){
            if(getPieceData(piece, x, y, rotation)){
                if(!ghostPiece) context.fillRect((x + xOffset) * pieceSize, (y + yOffset) * pieceSize, pieceSize, pieceSize);
                else{
                    context.fillStyle = "rgba(226, 151, 151, 0.3)";
                    context.fillRect((x + xOffset) * pieceSize, (y + yOffset) * pieceSize, pieceSize, pieceSize);
                }

                context.beginPath();
                context.rect((x + xOffset) * pieceSize, (y + yOffset) * pieceSize, pieceSize, pieceSize);
                context.stroke();
            }
        }
    }
}