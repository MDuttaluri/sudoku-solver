
/* [
     [
         "5",
         "3",
         "",
         "",
         "7",
         "",
         "",
         "",
         ""
     ],
     [
         "6",
         "",
         "",
         "1",
         "9",
         "5",
         "",
         "",
         ""
     ],
     [
         "",
         "9",
         "8",
         "",
         "",
         "",
         "",
         "6",
         ""
     ],
     [
         "8",
         "",
         "",
         "",
         "6",
         "",
         "",
         "",
         "3"
     ],
     [
         "4",
         "",
         "",
         "8",
         "",
         "3",
         "",
         "",
         "1"
     ],
     [
         "7",
         "",
         "",
         "",
         "2",
         "",
         "",
         "",
         "6"
     ],
     [
         "",
         "6",
         "",
         "",
         "",
         "",
         "2",
         "8",
         ""
     ],
     [
         "",
         "",
         "",
         "4",
         "1",
         "9",
         "",
         "",
         "5"
     ],
     [
         "",
         "",
         "",
         "",
         "8",
         "",
         "",
         "7",
         "9"
     ]
 ]*/



export function solveSudoku(board) {
    console.log(board);
    let l = board.length
    let finalGrid = []
    let reachedFinal = false
    let startPrint = false
    let needToFill = 0
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] == "")
                needToFill += 1
        }
    }
    function printGrid() {
        for (var i = 0; i < 9; i++) {
            let x = []
            for (var j = 0; j < 9; j++)
                x.push(board[i][j])
            finalGrid.push(x)
        }
    }
    function isOk(i, j) {
        //console.log("is ok : ",i,j);
        for (let idx = 0; idx < board[i].length; idx++) {
            if (idx != j && board[i][idx] == board[i][j])
                return false
        }
       // console.log("Row test passed ");
        for (let idx = 0; idx < 9; idx++) {
            if (idx != i && board[idx][j] == board[i][j])
                return false
        }
        //console.log("Col test passed ");

        let items = new Set()
        let gridI = i - (i % 3)
        let gridJ = j - (j % 3)
        //console.log(gridI,gridJ);
        for (let a = gridI; a < gridI + 3; a++) {
            for (let b = gridJ; b < gridJ + 3; b++) {
                //console.log(items);
                if (board[a][b] === "")
                    continue
                //console.log("contains chk : ",items.has(board[a][b]));
                if (!items.has(board[a][b]))
                    items.add(board[a][b] + "")
                else
                {
                   // console.log("WTFFFF contains chk : ",items.has(board[a][b]));
                    return false
                }
            }
        }
        return true
    }
    function driver(i, j, needToDo) {
        //console.log(i, j,needToDo);
        if (reachedFinal == true)
            return true

        if (needToDo == 0) {

            reachedFinal = true
            printGrid()
            return true
        }
        if (board[i][j] !== "") {
            if (i + 1 < l)
                return driver(i + 1, j, needToDo)
            else if (j + 1 < l)
                return driver(0, j + 1, needToDo)
        }
        let picked = false
        for (let pick = 1; pick < 10; pick++) {
            //console.log("looking to pick : ",pick);
            if (reachedFinal)
                return true

            board[i][j] = pick + ""
            if (isOk(i, j)) {
                picked = true
                if (i === 8 && j === 8) {
                    printGrid()
                    return true
                }

                if (i + 1 < l) {
                    if (!driver(i + 1, j, needToDo - 1)) {
                        board[i][j] = ""
                        picked = false
                        continue
                    }
                    break
                }
                else if (j + 1 < l) {
                    if (!driver(0, j + 1, needToDo - 1)) {
                        board[i][j] = ""
                        picked = false
                        continue
                    }
                    break
                }
            }
            else{
               // console.log("failed");
            }
        }
        if (!picked) {
            board[i][j] = ""
            return false
        }



    }
    reachedFinal = false
    driver(0, 0, needToFill)
    return finalGrid

}