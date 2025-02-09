"use client";
import {createRef, useEffect, useState, useRef} from 'react';
import {Moves} from './moves';
import {State, getBlock, drawPiece, getPieceData} from './pieceState';
import { tryRotate } from './rotate';
import { getBoardPosition, setBoardPosition, drawBoard, initBoard } from './board';

let pieceSize = 30;
const boardWidth = 10;
const boardHeight = 20;
var clearedLines = 0;

const fps = 60.0;
const mFramesPerDrop = [
    48, 43, 38, 33, 28, 23, 18, 13, 8, 6,
    5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 1
];

var gameIntervalId;

var context, board;
var level, setLevel;
var swipeStartX, swipeEndX, actualStartX, actualStartY;
var swipeStartTime;
var swipeStartY, swipeEndY;
var gameOver, setGameOver;
var canMove, setCanMove;

var mState;

function newPiece(){
    let p = getBlock();
    mState = new State(boardWidth, p);
}

function updateLevel(){
    let l = Math.floor(clearedLines / 10);
    if(l > 29) l = 29;

    setLevel(l);
}

function isFullRow(y){
    for(let x = 0; x < boardWidth; ++x){
        if(!getBoardPosition(x, y, boardWidth)) return false;
    }
    return true;
}

function clearLines(){
    let currentLinesCleared = 0;
    let yClearLevel = 0;

    for(let y = 0; y < boardHeight; ++y){
        if(isFullRow(y)){
            for(let x = 0; x < boardWidth; ++x){
                setBoardPosition(x, y, 0, boardWidth);
            }
            ++currentLinesCleared;
            yClearLevel = y;
        }
    }

    clearedLines += currentLinesCleared;
    while(currentLinesCleared > 0){
        for(let y = yClearLevel; y > 0; --y){
            for(let x = 0; x < boardWidth; ++x){
                setBoardPosition(x, y, getBoardPosition(x, y - 1, boardWidth), boardWidth);
            }
        }
        --currentLinesCleared;
    }
}

function hasCollided(){
    for(let x = 0; x < mState.piece.width; ++x){
        for(let y = 0; y < mState.piece.width; ++y){
            if(getPieceData(mState.piece, x, y, mState.rotation)){
                const bX = mState.xOffset + x;
                const bY = mState.yOffset + y + 1;

                if(getBoardPosition(bX, bY, boardWidth) || bY == boardHeight){
                    if(bY < 0 || (getBoardPosition(bX, bY - 1, boardWidth) && bY - 1 == 0)) {
                        setGameOver(true);
                        return -1;
                    }
                    return 1;
                }
            }
        }
    }
    return 0;
}

function updateBoard(){
    for(let x = 0; x < mState.piece.width; ++x){
        for(let y = 0; y < mState.piece.width; ++y){
            if(getPieceData(mState.piece, x, y, mState.rotation)){
                const bX = mState.xOffset + x;
                const bY = mState.yOffset + y;

                if(bY >= 0) setBoardPosition(bX, bY, 1, boardWidth);
                else setGameOver(true);
            }
        }
    }
}

function getBottom(){
    let checkAmount;
    let finalAmount = boardHeight;

    for(let x = 0; x < mState.piece.width; ++x){
        for(let y = 0; y < mState.piece.width; ++y){
            if(getPieceData(mState.piece, x, y, mState.rotation)){
                checkAmount = 0;
                let bX = mState.xOffset + x;
                let bY = mState.yOffset + y + 1;
                while(!getBoardPosition(bX, bY, boardWidth) && bY < boardHeight){
                    ++checkAmount;
                    ++bY;
                }
                if(checkAmount < finalAmount){
                    finalAmount = checkAmount;
                }
            }
        }
    }
    return finalAmount;

}

function ghostPiece(){
    if(mState == null) return;

    let y = getBottom() + mState.yOffset;
    drawPiece(context, pieceSize, mState.piece, mState.rotation, mState.xOffset, y, true);
}

function movePiece(move){
    if(gameOver){
        return;
    }

    if(!canMove) return;
    setCanMove(false);
    switch(move){
        case Moves.Left:
            --mState.xOffset;
            return;
        case Moves.Right:
            ++mState.xOffset;
            return;
        case Moves.Down:
            clearInterval(gameIntervalId);
            gameLoop(true);
            ++mState.yOffset;
            gameIntervalId = setInterval(gameLoop, nextTick(level) * 1000);
            return;
        case Moves.Drop:
            mState.yOffset += getBottom();
            clearInterval(gameIntervalId);
            gameLoop(true);
            gameIntervalId = setInterval(gameLoop, nextTick(level) * 1000);
            return;
        default:
            return;
    }
}

function isValidMove(move){
    for(let x = 0; x < mState.piece.width; ++x){
        for(let y = 0; y < mState.piece.width; ++y){
            if(getPieceData(mState.piece, x, y, mState.rotation)){
                const bX = mState.xOffset + x;
                const bY = mState.yOffset + y;

                if((bX <= 0 || getBoardPosition(bX - 1, bY, boardWidth)) && move == Moves.Left) return false;
                if((bX >= boardWidth - 1 || getBoardPosition(bX + 1, bY, boardWidth)) && move == Moves.Right) return false;
            }
        }
    }
    movePiece(move);
}

const keyboardInput = (e) => {
    switch(e.code){
        case "ArrowLeft":
            isValidMove(Moves.Left);
            return;
        case "ArrowRight":
            isValidMove(Moves.Right);
            return;
        case "ArrowUp":
        case "KeyX":
            tryRotate(Moves.Rotate, mState, boardWidth, boardHeight);
            return;
        case "KeyZ":
            tryRotate(Moves.RotateBack, mState, boardWidth, boardHeight);
            return;
        case "ArrowDown":
            movePiece(Moves.Down);
            return;
        case "Space":
            movePiece(Moves.Drop);
            return;
        default:
            return;
    }
}
const minSwipeDistance = 15;
const hardDropSwipeDistance = 15;

const onTouchStart = (e) => {
    if(gameOver) return;
    e.preventDefault();

    swipeEndX.current = null;
    swipeEndY.current = null;
    
    swipeStartX.current = e.targetTouches[0].clientX;
    swipeStartY.current = e.targetTouches[0].clientY;
    actualStartX.current = swipeStartX.current;
    actualStartY.current = swipeStartY.current;
    swipeStartTime.current = new Date();
}

const onTouchMove = (e) => {
    if(gameOver || actualStartX.current == null || actualStartY.current == null) return;

    e.preventDefault();

    swipeEndX.current = e.targetTouches[0].clientX;
    swipeEndY.current = e.targetTouches[0].clientY;

    const distanceX = swipeEndX.current != null ? swipeEndX.current - swipeStartX.current : 0;
    const distanceY = swipeEndY.current != null ? swipeEndY.current - swipeStartY.current : 0;
    const totalDistanceY = swipeEndY.current != null ? swipeEndY.current - actualStartY.current : 0;

    if(Math.abs(distanceX) < minSwipeDistance && Math.abs(distanceY) < minSwipeDistance) return;

    swipeStartX.current = swipeEndX.current;
    swipeStartY.current = swipeEndY.current;

    if(Math.abs(distanceX) > Math.abs(distanceY)){
        if(Math.abs(distanceX) >= minSwipeDistance && distanceX > 0){
            isValidMove(Moves.Right);
        }
        else if(Math.abs(distanceX) >= minSwipeDistance && distanceX < 0){
            isValidMove(Moves.Left);
        }
    }
    else {
        if(distanceY >= minSwipeDistance){
            let timeSinceSwipe = swipeStartTime.current != null ? Math.floor(new Date().getTime() - swipeStartTime.current.getTime()) : 1000;
            if(totalDistanceY >= hardDropSwipeDistance && timeSinceSwipe <= 35){
                movePiece(Moves.Drop);
            }
            else{
                movePiece(Moves.Down);
            }
        }
    }
}


const onTouchEnd = (e) => {
    if(gameOver) return;

    if((!actualStartX.current || !actualStartY.current)) return; //No touch was made
    const distanceX = swipeEndX.current != null ? actualStartX.current - swipeEndX.current : 0;
    const distanceY = swipeEndY.current != null ? actualStartY.current - swipeEndY.current : 0;

    if(Math.abs(distanceX) < minSwipeDistance && Math.abs(distanceY) < minSwipeDistance){
        if(swipeStartX.current < Math.floor(window.innerWidth / 2)){ //Touched left side of screen
            tryRotate(Moves.RotateBack, mState, boardWidth, boardHeight);
        }
        else if(swipeStartX.current >= Math.floor(window.innerWidth / 2)){
            tryRotate(Moves.Rotate, mState, boardWidth, boardHeight);
        }
    }

    actualStartX.current = null;
    actualStartY.current = null;
    swipeStartTime.current = null;
}

function startButton(){
    clearInterval(gameIntervalId);
    initBoard(boardWidth, boardHeight);
    setLevel(0);
    if(mState == null) newPiece();
    gameIntervalId = setInterval(gameLoop, nextTick(level) * 1000);
    setGameOver(false);
    return;
}

function gameLoop(moved = false){
    if(gameOver) return;

    let lost = hasCollided();
    if(lost != 0) {
        actualStartX.current = null; actualStartY.current = null;
        updateBoard();
        clearLines();
        updateLevel();
        if(lost == 1) newPiece();
        else{
            mState = null;
        }
    }
    else if(!moved) {
        ++mState.yOffset;
    }
}

function drawGame(){
    context.fillStyle = "gray";
    context.fillRect(0, 0, board.width, board.height);

    drawBoard(context, pieceSize, boardWidth, boardHeight);

    context.strokeStyle = "white";
    context.lineWidth = 1;

    for(let i = 1; i < boardHeight; ++i){
        context.beginPath();
        context.moveTo(0, i * pieceSize);
        context.lineTo(boardWidth * pieceSize, i * pieceSize);
        context.stroke();
    }
    for(let i = 1; i < boardWidth; ++i){
        context.beginPath();
        context.moveTo(i * pieceSize, 0);
        context.lineTo(i * pieceSize, boardHeight * pieceSize);
        context.stroke();
    }
    if(mState != null) drawPiece(context, pieceSize, mState.piece, mState.rotation, mState.xOffset, mState.yOffset);
    ghostPiece();
    
}

const nextTick = (curLevel) => {
    return (mFramesPerDrop[curLevel] / fps);
}

export default function Tetris(){
    const boardRef = createRef(null);
    const boardContext = createRef(null);

    [level, setLevel] = useState(0);
    swipeStartX = useRef(null);
    swipeEndX = useRef(null);
    swipeStartY = useRef(null);
    swipeEndY = useRef(null);
    actualStartX = useRef(null);
    actualStartY = useRef(null);
    swipeStartTime = useRef(null);
    [gameOver, setGameOver] = useState(true);
    [canMove, setCanMove] = useState(true);

    useEffect(() => {
        if(boardRef.current === null){
            throw new Error("Board is not used");
        }
        
        if(window.width < 450){
            pieceSize = 25;
        }

        board = boardRef.current;
        board.height = boardHeight * pieceSize;
        board.width = boardWidth * pieceSize;
        boardContext.current = board.getContext("2d");
        
        newPiece();

        if(boardContext.current){
            context = boardContext.current;
            window.onkeydown = (e) => keyboardInput(e);
            window.onkeyup = () => setCanMove(true);

            const drawIntervalId = setInterval(drawGame, 5);
            const moveIntervalId = setInterval(() => {setCanMove(true)}, 50);
            return () => {
                clearInterval(moveIntervalId);
                clearInterval(drawIntervalId);
            };
        }

    }, []);

    return(
        <div className="place-items-center justify-center">
            <br className="hidden md:block" />
            <br />
            <div className="block lg:flex">
                <div className="lg:flex-1" />
                <div className="relative place-items-center text-center md:mx-10" style={{height: (boardHeight * pieceSize) + 'px', width: (boardWidth * pieceSize) + 'px'}} ref={() => {gameOver == false || pieceSize == 25 ? null : null}}>
                    <canvas className={"absolute snakeCanvas" + (gameOver == true ? " opacity-20 bg-gray-500" : "")} ref={boardRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchCancel={(e) => e.preventDefault()}/>
                    <button className={(gameOver == true ? "absolute " : "hidden ") + "text-center w-full h-full top-0 left-0"} type="button" onClick={startButton}>Click to start!</button>
                </div>
                
                <div className="place-items-center lg:place-items-start lg:h-full lg:flex-1 lg:w-96">
                    <div className="text-center lg:text-start lg:mx-auto text-xl font-semibold">
                        <p className="mt-10 lg:mt-36">Current Level: {level + 1}</p>
                        <p className="mt-5 lg:mt-10">Lines Cleared: {clearedLines}</p>
                        <p className="mt-5 lg:mt-10">Next Level in: {10 - (clearedLines % 10)} lines</p> <br className="md:hidden" />
                    </div>
                </div>
            </div>
            <div className="text-center text-xl font-medium hidden md:block">
                <p>
                    <br />
                    Left/Right: Arrow Key Left/Right<br />
                    Soft Drop: Arrow Key Down<br />
                    Rotate Clockwise: Arrow Key Up or X<br />
                    Rotate Counter-clockwise: Z<br />
                    Hard Drop: Space
                </p>
            </div>
        </div>
    );
}