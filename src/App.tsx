import React from 'react';
import './App.scss';
import SudokuBoard from './Components/SudokuBoard';

function App() {
  return (
    <div className="centerDiv__outer--grid">
      <h1>Classic Sudoku Solver</h1>
      <SudokuBoard />
    </div>
  );
}

export default App;
