import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './SBoardStyles.scss';

function SudokuBoard() {
    const [boardSize, setBoardSize] = useState(9)
    const [cells, setCells] = useState<any[]>([])
    useEffect(() => {
        let cells: any[] = []
        let ele = 0
        for (let i = 0; i < boardSize; i++) {
            let x: any[] = []
            for (let j = 0; j < 9; j++) {
                x.push(ele)
                ele++
            }
            cells.push(x)
        }
        setCells(cells)
        console.log(cells);

    }, [])

    function updateArray(newVal:any,index:any[]){ 
        cells[index[0][1]] = newVal
        setCells([...cells])
    }

    function getGrid(cells:any[],idx:number){
      
        // single grid
       
        //console.log("ARRAY");
        //console.log(cells);
        
        
        return <div className="sboard__subgrid">
        <div className="sboard__row">
            <input type="text" value={cells[0][ 0]} onChange={(e) => { }} className="sboard__cell"></input>
            <input type="text" value={cells[0][ 1]} onChange={(e) => { }} className="sboard__cell"></input>
            <input type="text" value={cells[0][ 2]} onChange={(e) => { }} className="sboard__cell"></input>

        </div>
        <div className="sboard__row">
            <input type="text" value={cells[ 1][ 0]} onChange={(e) => { }} className="sboard__cell"></input>
            <input type="text" value={cells[ 1][ 1]} onChange={(e) => { }} className="sboard__cell"></input>
            <input type="text" value={cells[ 1][ 2]} onChange={(e) => { }} className="sboard__cell"></input>

        </div>
        <div className="sboard__row">
            <input type="text" value={cells[ 2][ 0]} onChange={(e) => { }} className="sboard__cell"></input>
            <input type="text" value={cells[ 2][ 1]} onChange={(e) => { }} className="sboard__cell"></input>
            <input type="text" value={cells[ 2][ 2]} onChange={(e) => { }} className="sboard__cell"></input>

        </div>
      
    </div>
    }

    function getGrids() {
        // all grids

        let grids: any[] = []
        let i = 0
        while (i < 9) {
            let offset = 0
            let temp : any[] = []
            while (offset < 9) {
                let lol : any [] = [[],[],[]]
                let j = offset
                while (j < offset + 3) {
                    let row = i;
                    while (row < i + 3) {
                        lol[row-i].push(cells[row][j])
                        row += 1
                    }
                    j += 1
                }
                temp.push(lol)
                offset += 3
            }
            grids.push(temp)
            i += 3
        }
        console.log(grids);
        let elements : any[] = []

        for(let i =0 ;i<grids.length;i++){
            elements.push(<>
                    {
                        grids[i].map((ele:any,idx:any,arr:any[])=>{
                            return getGrid(arr[idx],idx)
                        })
                    }
            </>)
        }

        
        return elements;
    }
    return (
        <div className="centerDiv__outer--grid" style={{ gap: "15px" }}>
            <div className="sboard">

                {
                    cells.length > 0 &&


                    getGrids()




                }
            </div>
            <button>Solve</button>
        </div>
    )
}

export default SudokuBoard
