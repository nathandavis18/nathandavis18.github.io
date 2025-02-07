import {Moves} from './moves';
import {State, getPieceData} from './pieceState';
import { getBoardPosition } from './board';

function validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight){
    for(let x = 0; x < pieceState.piece.width; ++x){
        for(let y = 0; y < pieceState.piece.width; ++y){
            if(getPieceData(pieceState.piece, x, y, nextRotation)){
                let bX = pieceState.xOffset + x + xMovement;
                let bY = pieceState.yOffset + y + yMovement;
                if(getBoardPosition(bX, bY) || bX < 0 || bX >= boardWidth || bY >= boardHeight) return false;
            }
        }
    }
    return true;
}

function rotatePiece(pieceState, xMovement, yMovement, newRotation){
    pieceState.rotation = newRotation;
    pieceState.xOffset += xMovement;
    pieceState.yOffset += yMovement;
}

//Goes through a series of tests to rotate the piece
export function tryRotate(move, pieceState, boardWidth, boardHeight){
    let rotationToAdd = (move == Moves.Rotate) ? 1 : -1;
    let nextRotation = pieceState.rotation;
    if(pieceState.rotation + rotationToAdd < 0) nextRotation = 3;
    else{
        nextRotation = (pieceState.rotation + rotationToAdd) % 4;
    }

    const oPieceWidth = 2, iPieceWidth = 4;
    let xMovement = 0, yMovement = 0;
    if(pieceState.piece.width == oPieceWidth) return; //O piece can't rotate
    
    //Test 1 for every piece
    if(validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
        return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
    }

    if(move == Moves.Rotate){
        if(pieceState.piece.width == iPieceWidth){ //I Piece has a unique rotation system
            //Test 2
            if(nextRotation == 1){
                xMovement = -2;
                yMovement = 0;
            }
            else if(nextRotation == 2){
                xMovement = -1;
                yMovement = 0;
            }
            else if(nextRotation == 3){
                xMovement = 2;
                yMovement = 0;
            }
            else{
                xMovement = 1;
                yMovement = 0;
            }
            if(validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            }
    
            if (nextRotation == 1)
                {
                    xMovement = 1;
                    yMovement = 0;
                }
                else if (nextRotation == 2)
                {
                    xMovement = 2;
                    yMovement = 0;
                }
                else if (nextRotation == 3)
                {
                    xMovement = -1;
                    yMovement = 0;
                }
                else
                {
                    xMovement = -2;
                    yMovement = 0;
                }
                if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
                {
                    return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
                }
                //End Test 3
        
                //Test 4 for I Piece:
                if (nextRotation == 1)
                {
                    xMovement = -2;
                    yMovement = 1;
                }
                else if (nextRotation == 2)
                {
                    xMovement = -1;
                    yMovement = -2;
                }
                else if (nextRotation == 3)
                {
                    xMovement = 2;
                    yMovement = -1;
                }
                else
                {
                    xMovement = 1;
                    yMovement = 2;
                }
                if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
                {
                    return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
                }
                //End Test 4
        
                //Test 5 for I Piece:
                if (nextRotation == 1)
                {
                    xMovement = 1;
                    yMovement = -2;
                }
                else if (nextRotation == 2)
                {
                    xMovement = 2;
                    yMovement = 1;
                }
                else if (nextRotation == 3)
                {
                    xMovement = -1;
                    yMovement = 2;
                }
                else
                {
                    xMovement = -2;
                    yMovement = -1;
                }
                if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
                {
                    return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
                }
                //End Test 5
        }
        else {    
            //Test 2 for non-I Piece
            if (nextRotation == 0 || nextRotation == 1)
            {
                xMovement = -1;
                yMovement = 0;
            }
            else
            {
                xMovement = 1;
                yMovement = 0;
            }
    
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
            {
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            }
            //End Test 2
    
            //Test 3 for non-I Piece
            if (nextRotation == 1)
            {
                xMovement = -1;
                yMovement = -1;
            }
            else if (nextRotation == 2)
            {
                xMovement = 1;
                yMovement = 1;
            }
            else if (nextRotation == 3)
            {
                xMovement = 1;
                yMovement = -1;
            }
            else
            {
                xMovement = -1;
                yMovement = 1;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
            {
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            }
            //End Test 3
            
            //Test 4 for non-I Piece
            if (nextRotation == 1 || nextRotation == 3)
            {
                xMovement = 0;
                yMovement = 2;
            }
            else
            {
                xMovement = 0;
                yMovement = -2;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
            {
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            }
            //End Test 4
            
            //Test 5 for non-I Piece
            if (nextRotation == 1)
            {
                xMovement = -1;
                yMovement = 2;
            }
            else if (nextRotation == 2)
            {
                xMovement = 1;
                yMovement = -2;
            }
            else if (nextRotation == 3)
            {
                xMovement = 1;
                yMovement = 2;
            }
            else
            {
                xMovement = -1;
                yMovement = -2;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight))
            {
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            }
            //End Test 5
        }
    }
    else{
        if(pieceState.piece.width == iPieceWidth){
            //Test 2
            if(nextRotation == 0){
                xMovement = 2;
                yMovement = 0;
            }
            else if(nextRotation == 1){
                xMovement = -1;
                yMovement = 0;
            }
            else if(nextRotation == 2){
                xMovement = -2;
                yMovement = 0;
            }
            else{
                xMovement = -1;
                yMovement = 0;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //Test 2 End

            //Test 3
            if(nextRotation == 0){
                xMovement = -1;
                yMovement = 0;
            }
            else if(nextRotation == 1){
                xMovement = -2;
                yMovement = 0;
            }
            else if(nextRotation == 2){
                xMovement = 1;
                yMovement = 0;
            }
            else{
                xMovement = 2;
                yMovement = 0;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //End Test 3

            //Test 4
            if(nextRotation == 0){
                xMovement = 2;
                yMovement = -1;
            }
            else if(nextRotation == 1){
                xMovement = -1;
                yMovement = -2;
            }
            else if(nextRotation == 2){
                xMovement = -2;
                yMovement = 1;
            }
            else{
                xMovement = -1;
                yMovement = -2;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //End Test 4

            //Test 5
            if(nextRotation == 0){
                xMovement = -1;
                yMovement = 2;
            }
            else if(nextRotation == 1){
                xMovement = -2;
                yMovement = -1;
            }
            else if(nextRotation == 2){
                xMovement = 1;
                yMovement = -2;
            }
            else{
                xMovement = 2;
                yMovement = 1;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //End Test 5
        }
        else{ //Other block types
            //Test 2
            if(nextRotation == 0){
                xMovement = 1;
                yMovement = 0;
            }
            else if(nextRotation == 1){
                xMovement = -1;
                yMovement = 0;
            }
            else if(nextRotation == 2){
                xMovement = -1;
                yMovement = 0;
            }
            else{
                xMovement = 1;
                yMovement = 0;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //End Test 2

            //Test 3
            if(nextRotation == 0){
                xMovement = 1;
                yMovement = 1;
            }
            else if(nextRotation == 1){
                xMovement = -1;
                yMovement = -1;
            }
            else if(nextRotation == 2){
                xMovement = -1;
                yMovement = 1;
            }
            else{
                xMovement = 1;
                yMovement = -1;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //End Test 3

            //Test 4
            if(nextRotation == 0){
                xMovement = 0;
                yMovement = -2;
            }
            else if(nextRotation == 1){
                xMovement = 0;
                yMovement = 2;
            }
            else if(nextRotation == 2){
                xMovement = 0;
                yMovement = -2;
            }
            else{
                xMovement = 0;
                yMovement = 2;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            } //End Test 4

            //Test 5
            if(nextRotation == 0){
                xMovement = 1;
                yMovement = -2;
            }
            else if(nextRotation == 1){
                xMovement = -1;
                yMovement = 2;
            }
            else if(nextRotation == 2){
                xMovement = -1;
                yMovement = -2;
            }
            else{
                xMovement = 1;
                yMovement = 2;
            }
            if (validRotateStatus(pieceState, nextRotation, xMovement, yMovement, boardWidth, boardHeight)){
                return rotatePiece(pieceState, xMovement, yMovement, nextRotation);
            }
        }
    }
}