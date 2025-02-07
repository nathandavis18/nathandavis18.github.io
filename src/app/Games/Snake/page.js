"use client";
import {createRef, useEffect, useState, useRef} from 'react';

const pieceSize = 20;
var boardCols = 30;
var boardRows = 30;

const Moves = Object.freeze({
    Left: Symbol("left"),
    Right: Symbol("right"),
    Up: Symbol("up"),
    Down: Symbol("down")
});

var context, board;
var score, setScore;
var highScore, setHighScore;
var swipeStartX, swipeEndX;
var swipeStartY, swipeEndY;
var gameOver, setGameOver;

var mSetItem;

var snake = [];
var apple = {};
var direction = {};


function setupGame(){
    snake = [];
    apple = {x: boardCols / 2 + 2, y: boardRows / 2 - 1};
    direction = {x: 1, y: 0};
    setScore(0);

    var startingX = boardCols / 2 - 5;
    var startingY = boardRows / 2 - 1; 
    snake.push({x: startingX, y: startingY});
    snake.push({x: snake[0].x - 1, y: startingY});
    snake.push({x: snake[1].x - 1, y: startingY});

    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    context.strokeStyle = "gray";
    context.lineWidth = 1;

    for(let i = 1; i < boardRows; ++i){
        context.beginPath();
        context.moveTo(0, i * pieceSize);
        context.lineTo(boardCols * pieceSize, i * pieceSize);
        context.stroke();
    }
    for(let i = 1; i < boardCols; ++i){
        context.beginPath();
        context.moveTo(i * pieceSize, 0);
        context.lineTo(i * pieceSize, boardRows * pieceSize);
        context.stroke();
    }

    for(let i = 0; i < snake.length; ++i){
        context.fillStyle = "white";
        context.fillRect(snake[i].x * pieceSize, snake[i].y * pieceSize, pieceSize, pieceSize);
        
        context.strokeStyle = "blue";
        context.lineWidth = 1;
        context.beginPath();
        context.rect(snake[i].x * pieceSize, snake[i].y * pieceSize, pieceSize, pieceSize);
        context.stroke();
    }

    context.fillStyle = "red";
    context.fillRect(apple.x * pieceSize, apple.y * pieceSize, pieceSize, pieceSize);
}

function moveSnake(){
    for(let i = snake.length - 1; i > 0; --i){
        snake[i] = snake[i - 1];
    }
    snake[0] = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
}

function isDead(){
    if(snake[0].x < 0 || snake[0].x >= boardCols || snake[0].y < 0 || snake[0].y >= boardRows){
        alert("Game Over!");
        if(score > highScore) {
            setHighScore(score);
            mSetItem('LOCAL_HIGH_SCORE', score);
        }
        return true;
    }
    for(let i = 1; i < snake.length; ++i){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            alert("Game Over!");
            if(score > highScore) {
                setHighScore(score);
                mSetItem('LOCAL_HIGH_SCORE', score);
            }
            return true;
        }
    }
    return false;
}

function spawnApple(){
    apple.x = Math.floor(Math.random() * boardCols);
    apple.y = Math.floor(Math.random() * boardRows);

    for(let i = 0; i < snake.length; ++i){
        if(apple.x == snake[i].x && apple.y == snake[i].y) spawnApple();
    }
}

function collectedApple(){
    if(snake[0].x == apple.x && snake[0].y == apple.y){
        snake.push({x: apple.x, y: apple.y});
        spawnApple();
        setScore(score + 1);
    }
}

function setDirection(move){
    if(move == Moves.Up && direction.y != 1 && snake[0].x != snake[1].x){
        direction.x = 0; direction.y = -1;
    }
    else if(move == Moves.Down && direction.y != -1 && snake[0].x != snake[1].x){
        direction.x = 0; direction.y = 1;
    }
    else if(move == Moves.Left && direction.x != 1 && snake[0].y != snake[1].y){
        direction.x = -1; direction.y = 0;
    }
    else if(move == Moves.Right && direction.x != -1 && snake[0].y != snake[1].y){
        direction.x = 1; direction.y = 0;
    }
}

function changeDirection(e){
    if(gameOver) {
        if(e.code == "Space") {
            setGameOver(false);
            setupGame();
        }
        return;
    }

    if(e.code == "ArrowUp"){
        setDirection(Moves.Up);
    }
    else if(e.code == "ArrowDown"){
        setDirection(Moves.Down);
    }
    else if(e.code == "ArrowLeft"){
        setDirection(Moves.Left);
    }
    else if(e.code == "ArrowRight"){
        setDirection(Moves.Right);
    }
}

const startButton = () => {
    if(!gameOver) return;

    setupGame();
    setGameOver(false);
}

const onTouchStart = (e) => {
    if(gameOver) return;

    e.preventDefault();

    swipeEndX.current = null;
    swipeEndY.current = null;
    
    swipeStartX.current = e.targetTouches[0].clientX;
    swipeStartY.current = e.targetTouches[0].clientY;
}

const onTouchMove = (e) => {
    if(gameOver) return;

    e.preventDefault();

    swipeEndX.current = e.targetTouches[0].clientX;
    swipeEndY.current = e.targetTouches[0].clientY;
}

const minSwipeDistance = 50;

const onTouchEnd = (e) => {
    if(gameOver) return;

    e.preventDefault();

    if((!swipeStartX.current || !swipeEndX.current) && (!swipeStartY.current || !swipeEndY.current)) return; //No swipe was made
    const distanceX = swipeStartX.current - swipeEndX.current;
    const distanceY = swipeStartY.current - swipeEndY.current;

    if(!(Math.abs(distanceX) >= minSwipeDistance || Math.abs(distanceY) >= minSwipeDistance)) return;

    if(Math.abs(distanceX) > Math.abs(distanceY)){
        if(distanceX > minSwipeDistance){
            setDirection(Moves.Left);
        }
        else{
            setDirection(Moves.Right);
        }
    }
    else{
        if(distanceY > minSwipeDistance){
            setDirection(Moves.Up);
        }
        else{
            setDirection(Moves.Down);
        }
    }
}

function gameLoop(){
    if(gameOver){
        return;
    }

    moveSnake();
    setGameOver(isDead());
    collectedApple();
    
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    context.strokeStyle = "gray";
    context.lineWidth = 1;

    for(let i = 1; i < boardRows; ++i){
        context.beginPath();
        context.moveTo(0, i * pieceSize);
        context.lineTo(boardCols * pieceSize, i * pieceSize);
        context.stroke();
    }
    for(let i = 1; i < boardCols; ++i){
        context.beginPath();
        context.moveTo(i * pieceSize, 0);
        context.lineTo(i * pieceSize, boardRows * pieceSize);
        context.stroke();
    }

    for(let i = 0; i < snake.length; ++i){
        context.fillStyle = "white";
        context.fillRect(snake[i].x * pieceSize, snake[i].y * pieceSize, pieceSize, pieceSize);
        context.strokeStyle = "blue";
        context.lineWidth = 1;

        context.beginPath();
        context.rect(snake[i].x * pieceSize, snake[i].y * pieceSize, pieceSize, pieceSize);
        context.stroke();
    }

    context.fillStyle = "red";
    context.fillRect(apple.x * pieceSize, apple.y * pieceSize, pieceSize, pieceSize);
}

export default function Snake(){
    const boardRef = createRef(null);
    const boardContext = createRef(null);

    [score, setScore] = useState(0);
    [highScore, setHighScore] = useState(0);
    swipeStartX = useRef(null);
    swipeEndX = useRef(null);
    swipeStartY = useRef(null);
    swipeEndY = useRef(null);
    [gameOver, setGameOver] = useState(true);

    useEffect(() => {
        while(screen.width < boardCols * pieceSize){
            --boardCols;
        }
        while(screen.height < boardRows * pieceSize){
            --boardRows;
        }

        if(boardRef.current === null){
            throw new Error("Board is not used");
        }
        var t = localStorage.getItem('LOCAL_HIGH_SCORE');
        if(t){
            setHighScore(t);
        }

        mSetItem = localStorage.setItem.bind(localStorage);

        board = boardRef.current;
        board.height = boardRows * pieceSize;
        board.width = boardCols * pieceSize;
        boardContext.current = board.getContext("2d");

        if(boardContext.current){
            context = boardContext.current;
            window.onkeydown = (e) => changeDirection(e);
            setupGame();

            const intervalId = setInterval(gameLoop, 100)
            return () => clearInterval(intervalId);
        }
    }, []);

    return(
        <div className="place-items-center justify-center">
            <br className="hidden md:block" />
            <br />
            <div className="block lg:flex">
                <div className="lg:flex-1" />
                <div className="relative place-items-center text-center md:mx-5" style={{height: (boardRows * pieceSize) + 'px', width: (boardCols * pieceSize) + 'px'}} ref={() => {gameOver == false ? null : null}}>
                    <canvas className={"absolute md:static snakeCanvas" + (gameOver == true ? " opacity-20 bg-gray-500 md:opacity-100 md:bg-zinc-900" : "")} ref={boardRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchMove={onTouchMove} onTouchCancel={(e) => e.preventDefault()}/>
                    <button className={(gameOver == true ? "absolute " : "hidden ") + "text-center w-full h-full top-0 left-0 md:hidden"} type="button" onClick={startButton}>Click to start!</button>
                </div>
                
                <div className="place-items-center lg:place-items-start lg:h-full lg:flex-1 lg:w-96">
                    <div className="text-center lg:text-start lg:mx-auto text-xl font-semibold">
                        <p className="mt-10 lg:mt-36">Your High Score: {highScore}</p>
                        <p className="mt-5 lg:mt-10">Current Score: {score}</p>
                    </div>
                </div>
            </div>
            <div className="text-center text-xl font-medium hidden md:block">
                <p>
                    <br />
                    Press Space to Start! If you lose, press Space to restart.
                    <br />
                    Controls: Arrow Keys for movement.
                </p>
            </div>
            <br /> <br />
        </div>
    );
}