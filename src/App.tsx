import React from 'react';
import './App.scss';
import SudokuBoard from './Components/SudokuBoard';
import { createContext } from 'react'
import { useContext } from 'react'
import { useState } from 'react';
import Alert from './Components/Alert/Alert';

interface AlertContextType{
  alertMessage:string,
  setAlertMessage:any

}


export const AlertContext = createContext<AlertContextType>({alertMessage:"",setAlertMessage:null})

export function useAlert(){
    return useContext(AlertContext)
}

function App() {
  const [alertMessage, setAlertMessage] = useState("")
  return (
    <div className="centerDiv__outer--grid">
      <div className="respGrid">
      <h1>Classic Sudoku Solver</h1>
      <p>This is a classic 9x9 sudoku puzzle solver. Enter the data in the provided cells and proceed by clicking "Solve" to find a solution.<br/>Accepted inputs are from the range of 1-9.</p>
      </div>
      <AlertContext.Provider value={{alertMessage,setAlertMessage}}>
        <SudokuBoard />
        <Alert/>
      </AlertContext.Provider>
    
    </div>
  );
}

export default App;
