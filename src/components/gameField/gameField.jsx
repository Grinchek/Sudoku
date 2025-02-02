import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GameField = ({ difficulty }) => {
    const navigate = useNavigate();
    const SIZE = 6;
    const BLOCK_ROWS = 2;
    const BLOCK_COLS = 3;
    const MAX_ERRORS = 5;
    const GAME_TIME = 300;

    const createEmptyBoard = () => Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

    const isValidPlacement = (board, row, col, num) => {
        for (let i = 0; i < SIZE; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        const startRow = Math.floor(row / BLOCK_ROWS) * BLOCK_ROWS;
        const startCol = Math.floor(col / BLOCK_COLS) * BLOCK_COLS;
        for (let i = 0; i < BLOCK_ROWS; i++) {
            for (let j = 0; j < BLOCK_COLS; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    };

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

    const solveBoard = (board) => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (board[row][col] === 0) {
                    let numbers = shuffleArray([...Array(SIZE).keys()].map(n => n + 1));
                    for (let num of numbers) {
                        if (isValidPlacement(board, row, col, num)) {
                            board[row][col] = num;
                            if (solveBoard(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const generateSolvedBoard = () => {
        const board = createEmptyBoard();
        solveBoard(board);
        return board;
    };

    const removeNumbers = (board, difficulty) => {
        const newBoard = board.map(row => [...row]);
        let cellsToRemove = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 18 : 25;
        while (cellsToRemove > 0) {
            let row = Math.floor(Math.random() * SIZE);
            let col = Math.floor(Math.random() * SIZE);
            if (newBoard[row][col] !== 0) {
                newBoard[row][col] = 0;
                cellsToRemove--;
            }
        }
        return newBoard;
    };

    const [solvedBoard, setSolvedBoard] = useState(generateSolvedBoard());
    const [gameBoard, setGameBoard] = useState(removeNumbers(solvedBoard, difficulty));
    const [selectedCell, setSelectedCell] = useState(null);
    const [errors, setErrors] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);
    const [flashingCell, setFlashingCell] = useState(null);

    useEffect(() => {
        const newSolvedBoard = generateSolvedBoard();
        setSolvedBoard(newSolvedBoard);
        setGameBoard(removeNumbers(newSolvedBoard, difficulty));
        setErrors(0);
        setTimeLeft(GAME_TIME);
        setGameOver(false);
        setWin(false);
    }, [difficulty]);

    useEffect(() => {
        if (timeLeft <= 0 || errors >= MAX_ERRORS) {
            setGameOver(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, errors]);

    const checkWin = () => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (gameBoard[row][col] !== solvedBoard[row][col]) return false;
            }
        }
        return true;
    };

    const selectCell = (row, col) => {
        if (gameBoard[row][col] === 0) {
            setSelectedCell({ row, col });
        }
    };

    const enterNumber = (num) => {
        if (selectedCell) {
            const { row, col } = selectedCell;
            if (num === solvedBoard[row][col]) {
                const newBoard = gameBoard.map(row => [...row]);
                newBoard[row][col] = num;
                setGameBoard(newBoard);

                if (checkWin()) {
                    setWin(true);
                    setGameOver(true);
                }
            } else {
                setErrors(errors + 1);
                setFlashingCell({ row, col });
                setTimeout(() => setFlashingCell(null), 300);
            }
            setSelectedCell(null);
        }
    };

    return (
        <div className="container">
            <h3>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h3>
            <h3>Errors: {errors} / {MAX_ERRORS}</h3>
            <h3>Level {difficulty}</h3>

            {gameOver ? (
                <>
                    <h2>{win ? "You Win! 🎉" : "Game Over!"}</h2>
                    <button onClick={() => navigate('/')}>New game</button>
                </>
            ) : (
                <div>
                    <button onClick={() => navigate('/')}>New Game</button>
                    {gameBoard.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <button
                                    key={colIndex}
                                    className={`cell 
                                        ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'selected' : ''} 
                                        ${flashingCell?.row === rowIndex && flashingCell?.col === colIndex ? 'flash-error' : ''}
                                    `}
                                    onClick={() => selectCell(rowIndex, colIndex)}
                                    disabled={cell !== 0}
                                >
                                    {cell !== 0 ? cell : ''}
                                </button>
                            ))}
                        </div>
                    ))}
                    <h3>Pick a number</h3>
                    <div className="number-set">
                        <div className="row">
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <button className='cell' key={num} onClick={() => enterNumber(num)}>{num}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameField;