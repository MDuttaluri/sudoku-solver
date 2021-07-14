import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './SBoardStyles.scss';
import { solveSudoku } from './Solver';

function SudokuBoard() {
    const [boardSize, setBoardSize] = useState(9)
    const [cells, setCells] = useState<any[]>([])
    const [init, setInit] = useState(true)
    useEffect(() => {
        if (init) {
            let cells: any[] = []
            let ele = 0
            for (let i = 0; i < boardSize; i++) {
                let x: any[] = []
                for (let j = 0; j < 9; j++) {
                    x.push("")
                    ele++
                }
                cells.push(x)
            }
            setCells(cells)


            console.log(cells);
            setInit(false)
        }

    }, [])




    function updateArray(newVal: any, index: any[]) {
        cells[index[0]][index[1]] = newVal

        //alert(cells[index[0][1]])
        setCells([...cells])
    }

    function getIndex(idx: number) {
        let res = [0, 0]
        res[0] = Math.floor(idx / 9)
        res[1] = idx % 9
        return res
    }
    function blurCheck(val: any) {
        let x = parseInt(val)
        if (x === NaN || parseInt(val) > 9 || parseInt(val) < 1) {
            alert("Invalid input. Values should be in range 1-9.");
        }

    }


    function getGrid(cells: any[], startIdx: number) {

        // single grid

        //console.log("ARRAY");
        //console.log(cells);


        return <div className="sboard__subgrid">
            <div className="sboard__row">
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx)} value={cells[0][0]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx)) }} className="sboard__cell"></input>
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx + 1)} value={cells[0][1]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 1)) }} className="sboard__cell"></input>
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} value={cells[0][2]} id={"input" + (startIdx + 2)} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 2)) }} className="sboard__cell"></input>

            </div>
            <div className="sboard__row">
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx + 9)} value={cells[1][0]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 9)) }} className="sboard__cell"></input>
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx + 10)} value={cells[1][1]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 10)) }} className="sboard__cell"></input>
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx + 11)} value={cells[1][2]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 11)) }} className="sboard__cell"></input>

            </div>
            <div className="sboard__row">
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx + 18)} value={cells[2][0]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 18)) }} className="sboard__cell"></input>
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} id={"input" + (startIdx + 19)} value={cells[2][1]} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 19)) }} className="sboard__cell"></input>
                <input type="text" onBlur={(e) => { blurCheck(e.target.value)}} value={cells[2][2]} id={"input" + (startIdx + 20)} onChange={(e) => { updateArray(e.target.value, getIndex(startIdx + 20)) }} className="sboard__cell"></input>

            </div>

        </div>
    }

    function getGrids() {
        // all grids

        let grids: any[] = []
        let i = 0
        while (i < 9) {
            let offset = 0
            let temp: any[] = []
            while (offset < 9) {
                let lol: any[] = [[], [], []]
                let j = offset
                while (j < offset + 3) {
                    let row = i;
                    while (row < i + 3) {
                        lol[row - i].push(cells[row][j])
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
        let elements: any[] = []
        let startIdx = 0
        for (let i = 0; i < grids.length; i++) {
            elements.push(<>
                {
                    grids[i].map((ele: any, idx: any, arr: any[]) => {
                        let prevIdx = startIdx
                        if (startIdx == 6) {
                            startIdx = 27
                        } else if (startIdx == 33) {
                            startIdx = 54
                        } else {
                            startIdx += 3
                        }
                        return getGrid(arr[idx], prevIdx)
                        // this index should be related to i and idx
                        // (3**i) * (3 * idx)
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
            <button onClick={()=>{
                setCells([...solveSudoku(cells)]);
            }}>Solve</button>
        </div>
    )
}

export default SudokuBoard
