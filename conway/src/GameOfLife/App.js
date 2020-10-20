import React from 'react';
import './GameOfLife.css';



/**
 * Game Of Life By John Conway
 * https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * 1. Render grid
 * 2. Spawn life on click
 * 3. Implement game logic
 */
export default class App extends React.Component {

    static field = {
        columnsAmount: 61,
        rowsAmount: 41,
    };
    static cellState = {
        ALIVE: true,
        DEAD: false,
    };

    // region Initialization

    constructor(props) {
        super(props);

        this.state = {
            cells: this.initializeCells(),
            isGameRunning: false,
        };

        setInterval(() => this.live(), 200)
    }

    initializeCells() {
        let cells = [];

        for (let columnIndex = 0; columnIndex < App.field.columnsAmount; columnIndex++) {
            cells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < App.field.rowsAmount; rowIndex++) {
                cells[columnIndex][rowIndex] = App.cellState.DEAD;
            }
        }

        return cells;
    }

    // endregion

    // region Game update logic

    live() {
        if (!this.state.isGameRunning) {
            return;
        }

        const newCells = [];

        for (let columnIndex = 0; columnIndex < App.field.columnsAmount; columnIndex++) {
            newCells[columnIndex] = [];
            for (let rowIndex = 0; rowIndex < App.field.rowsAmount; rowIndex++) {
                newCells[columnIndex][rowIndex] = this.computeNewCellState(columnIndex, rowIndex)
            }
        }

        this.setState({cells: newCells})
    }

    computeNewCellState(columnIndex, rowIndex) {
        const aliveNeighboursAmount = this.computeAliveNeighboursAmount(columnIndex, rowIndex);
        const currentCellState = this.state.cells[columnIndex][rowIndex];

        if (currentCellState === App.cellState.ALIVE) {
            if (aliveNeighboursAmount < 2) {
                return App.cellState.DEAD;
            } else if (aliveNeighboursAmount === 2 || aliveNeighboursAmount === 3) {
                return App.cellState.ALIVE;
            } else if (aliveNeighboursAmount > 3) {
                return App.cellState.DEAD;
            }
        } else {
            if (aliveNeighboursAmount === 3) {
                return App.cellState.ALIVE;
            }
        }

        return App.cellState.DEAD;
    }

    computeAliveNeighboursAmount(columnIndex, rowIndex) {
        let aliveNeighboursAmount = 0;

        const neighbourOffsets = [
            [-1, 0], // left
            [-1, 1], // top left
            [0, 1], // top
            [1, 1], // top right
            [1, 0], // right
            [1, -1], // bottom right
            [0, -1], // bottom
            [-1, -1], // bottom left
        ];

        for (const neighbourOffsetKey in neighbourOffsets) {
            const [xOffset, yOffset] = neighbourOffsets[neighbourOffsetKey];

            let newColumnOffset = columnIndex + xOffset;
            let newRowOffset = rowIndex + yOffset;

            // Check boundaries
            if (newColumnOffset < 0 || newColumnOffset > App.field.columnsAmount - 1) {
                continue;
            }
            if (newRowOffset < 0 || newRowOffset > App.field.rowsAmount - 1) {
                continue;
            }

            const neighbourState = this.state.cells[newColumnOffset][newRowOffset];
            if (neighbourState === App.cellState.ALIVE) {
                aliveNeighboursAmount++;
            }
        }

        return aliveNeighboursAmount;
    }

    // endregion

    // region User Interactions

    toggleCellState(columnIndex, rowIndex) {
        const newCellsState = this.state.cells;

        newCellsState[columnIndex][rowIndex] = !newCellsState[columnIndex][rowIndex];

        this.setState({state: newCellsState})
    }

    toggleIsGameRunning() {
        this.setState({isGameRunning: !this.state.isGameRunning})
    }

    // endregion

    // region Rendering

    renderCells() {
        return (
            <div className="App__cells">
                {this.state.cells.map((rows, columnIndex) => {
                    return this.renderColumn(rows, columnIndex)
                })}
            </div>
        );
    }

    renderColumn(rows, columnIndex) {
        return (
            <div className="App__column" key={`column_${columnIndex}`}>
                {rows.map((cellState, rowIndex) => {
                    const cellModifier = cellState === App.cellState.DEAD ? 'dead' : 'alive';
                    return <div
                        className={`App__cell App__cell--${cellModifier}`}
                        key={`cell_${columnIndex}_${rowIndex}`}
                        onClick={() => this.toggleCellState(columnIndex, rowIndex)}
                    />
                })}
            </div>
        )
    }

    renderStartGameButton() {
        const buttonLabel = this.state.isGameRunning ? 'Stop' : 'Start';

        return (
            <button
                className="App__startGameButton"
                onClick={() => this.toggleIsGameRunning()}
            >
                {buttonLabel}
            </button>
        )
    }

    render() {
        return (
            <div className="App">
                {this.renderStartGameButton()}
                {this.renderCells()}
            </div>
        );
    };

    // endregion

}


















































// export default class App extends React.Component {
//   static field = {
//     columnAmount: 10,
//     rowsAmount: 10
//   };

//   static cellState = {
//     ALIVE: true,
//     DEAD: false,
//   };
  
//   constructor(props){
//     super(props);

//     this.state = {
//       cells: this.initializecells,
//       isGameRunning: false,
//     }
//   }

//   initializeCells() {
//     let cells = [];

//     for (let columnIndex = 0; columnIndex < App.field.columnsAmount; columnIndex++) {
//         cells[columnIndex] = [];
//         for (let rowIndex = 0; rowIndex < App.field.rowsAmount; rowIndex++) {
//             cells[columnIndex][rowIndex] = App.cellState.DEAD;
//         }
//     }

//     return cells;
// }

  
// renderCells(){
//   <div className="App__cells">
//       {this.state.cells.map((rows, columnIndex) => {
//         return this.renderColumn(rows, columnIndex)
//       })}
//   </div>
// }

 

//   renderColumn(rows, columnIndex){
//     return(
//       <div className="App__column" key={`column_${columnIndex}`}>
//           {rows.map((cellState, rowIndex) => {
//             const cellModifier = cellState === App.cellState.DEAD ? 'dead' : 'alive';
//             return <div
//                 className={`App__cell App__cell--${cellModifier}`}
//                 key={`cell_${columnIndex}_${rowIndex}`}
//                 onClick={() => this.toggleCellState(columnIndex, rowIndex)}
//             />
//           })}
//       </div>
//     );
//   }

 

// render() {
//   return (
//     <div className='App'>
//       {this.renderCells()}
//     </div>
//   );
// }
// };


 
  
 
















// export default App;
























































// /* setting the rows and columns for the grid */
// const rowCount = 25;
// const columnCount = 25;

// /* Location of all the neighbors for cell, streamlined */
// const direction = [
//   [0, 1],
//   [0, -1],
//   [1, -1],
//   [-1, 1],
//   [1, 1],
//   [-1, -1],
//   [1, 0],
//   [-1, 0]
// ];


// function App() {
//     /* Setting state for grid */
//     const [grid, setGrid] = useState (
//       Array.from({ length: rowCount }).map(() => Array.from({ length: columnCount }).fill(0))
//       )

//       // const rows = [];
//       // for(let i = 0; i< rowCount; i++) {
//       //   rows.push(Array.from(Array(columnCount), ()=> 0));
//       // }
//       // return rows;
    

//     const [running, setRunning] = useState(false);

//     const runningRef = useRef(running);
//     runningRef.current= running
  
//     const runSimulation = useCallback(() => {
//       if (!runningRef.current) {
//         return;
//       }

//       setGrid(g => { /* g is the current grid */
//         return produce(g, gridCopy => { /* This is going through every cell in the grid */
//           for (let i = 0; i < rowCount; i++) {
//             for (let j = 0; j< columnCount; j++) {
//               let neighbors = 0;
//               /* This is going to tell us for each cell, how many neighboring cells are there */
//               direction.forEach(([x, y]) => {
//                 const newI= i + x;
//                 const newJ = j + y;
//                 if (newI >= 0 && newI < rowCount && newJ >= 0 && newJ <columnCount) { /* This will check to make sure we don't go out of bounds, and that there are neighbors */
//                   neighbors += g[newI][newJ]
//                 }
//               })
//               /* RULE #1 and RULE #2 */
//               if (neighbors < 2 || neighbors > 3) {
//                 gridCopy[i][j] = 0; /* KILLS IT */
//               } else if (g[i][j] === 0 && neighbors ===3) {
//                 gridCopy[i][j] = 1;   /*RULE #3, COMES ALIVE*/
//               } /*This part is mutating the gridCopy, and produce is creating a new grid, which updates the setGrid value */
//             }
//           }
//         });
//       });
//       setTimeout(runSimulation, 100);
//     }, [])

   
// return (
//     <div id="grid-container"    style={{ display: 'grid', gridTemplateColumns: `repeat(${columnCount}, 20px)` }} >

//       <p> Delfin Conway game of life</p>
      
//         {grid.map((rows, i) =>
//             rows.map((col, j) =>
//               <div
//               key={`${i}-${j}`}
//               onClick={() => {
//                 const newGrid = produce(grid, gridCopy => {
//                   gridCopy[i][j] = grid[i][j] ? 0 : 1;
//                 })
//                 const randomGrid = produce(grid, gridCopy => {
//                   gridCopy[i][j] = grid[i][j] ? 0 : 1;
//                 })
//                 setGrid(newGrid)
//               }}
//               style={{
//                 width: 20,
//                 height: 20,
//                 backgroundColor: grid[i][j] ? 'purple' : undefined,
//                 border: '1px solid grey'
//               }}/>
//             ))}
           
//      </div>
//   );
// }


