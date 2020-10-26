import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';
import Buttons from './Button'
import Rules from './Rules'



class Main extends React.Component {
  // define the state
  constructor() {
    super();
    this.speed = 100;
    this.rows = 15;
    this.cols = 25;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)), // every grid element turned off
    };
  }

  // never update a state directly, make a copy of the array instead
  // helper function - setState function --> updating a state
  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy,
    });
  };

  // seed = () => {
  //   let gridCopy = arrayClone(this.state.gridFull);
  //   for (let i = 0; i < this.rows; i++) {
  //     for (let j = 0; j < this.cols; j++) {
  //       if (Math.floor(Math.random() * 4) === 1) {
  //         gridCopy[i][j] = true;
  //       }
  //     }
  //   }
  //   this.setState({
  //     gridFull: gridCopy,
  //   });
  // };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  // refactor to call a function 
  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({ 
      gridFull: grid,
      generation: 0
    });
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 25;
        this.rows = 25;
      break;
      case "2":
        this.cols = 50;
        this.rows = 30;
      break;
      default:
        this.cols = 60;
        this.rows = 40;
    }
    this.clear();
  }

  // Play Method & Game Logic
  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    // rules from Conway's Game of Life - every element of the grid
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // how many neighbors? 8 potential neighbors - decide if it's going to die or live
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j - 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j - 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1,
    });
  };

  // // life cycle hook
  // componentDidMount() {
  //   // seeded on the grid
  //   this.seed();
  //   // to start the game
  //   this.playButton();
  // }

  // will be used as props in the Grid component
  render() {
    return (
      <div>
        <h1>Delfin's Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
        <Rules />
      </div>
    );
  }
}

// will clone all of the arrays inside of an array
function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));
