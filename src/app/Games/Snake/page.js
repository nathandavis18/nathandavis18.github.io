"use client";
import {createRef, useEffect, useState} from 'react';

const pieceSize = 20;
const boardCols = 30;
const boardRows = 30;

var context, board;

var snake = [];
var apple = {};
var speed = {};

var gameOver = true;

function setupGame(){
    snake = [];
    apple = {x: boardCols / 2 + 2, y: boardRows / 2 - 1};
    speed = {x: 1, y: 0};

    var startingX = (boardCols / 2 - 5);
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
    if(snake.length){
        snake[0] = {x: snake[0].x + speed.x, y: snake[0].y + speed.y};
    }
}

function isDead(){
    if(snake[0].x < 0 || snake[0].x >= boardCols || snake[0].y < 0 || snake[0].y >= boardRows){
        alert("Game Over!");
        return true;
    }
    for(let i = 1; i < snake.length; ++i){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            alert("Game Over!");
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
    }
}

function changeDirection(e){
    if(gameOver) {
        if(e.code == "Space") {
            gameOver = false;
            setupGame();
        }
        return;
    }

    if(e.code == "ArrowUp" && speed.y != 1 && snake[0].x != snake[1].x){
        speed.x = 0; speed.y = -1;
    }
    else if(e.code == "ArrowDown" && speed.y != -1 && snake[0].x != snake[1].x){
        speed.x = 0; speed.y = 1;
    }
    else if(e.code == "ArrowLeft" && speed.x != 1 && snake[0].y != snake[1].y){
        speed.x = -1; speed.y = 0;
    }
    else if(e.code == "ArrowRight" && speed.x != -1 && snake[0].y != snake[1].y){
        speed.x = 1; speed.y = 0;
    }
}

function gameLoop(){
    if(gameOver){
        return;
    }

    moveSnake();
    gameOver = isDead();
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

    useEffect(() => {
        if(boardRef.current === null){
            throw new Error("Board is not used");
        }
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
        <div className="place-items-center grid grid-cols-1">
            <br /> <br />
            <canvas className="col-span-1" ref={boardRef} />
            <div className="col-span-1 text-center">
                <p>
                    <br />
                    Press Space to Start! If you lose, press Space to restart.
                    <br />
                    Controls: Arrow Keys for movement.
                </p>
            </div> 
        </div>
    );
}