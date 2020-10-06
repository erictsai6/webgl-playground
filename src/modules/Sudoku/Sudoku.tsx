import { h, Component } from 'preact';

import { Board } from './Board';
import { SubBoardClass } from './SubBoard';
import { getAvailableValues } from './utils';

import './Sudoku.css';
import { fillBoard } from './GameLogic';

class SelectorNode {
  constructor(public id: number, public count: number) {}
}

export class Sudoku extends Component {  

  public state: {
    subBoards: SubBoardClass[][];
    selectors: Array<SelectorNode>;
    selectorsVisible: boolean;
    overallX?: number;
    overallY?: number;
    errors: number;
  };
  
  constructor(props: any) {
    super(props);
    this.state = {
      subBoards: this.initializeBoard(),
      selectors: [],
      selectorsVisible: false,
      errors: 0      
    };
  }

  initializeBoard(): SubBoardClass[][] {    
    const subBoards = [];
    for (let i = 0; i < 3; i++) {
      subBoards.push([]);
      for (let j = 0; j < 3; j++) {
        subBoards[i].push(this.initilizeSubBoard());
      }
    }

    fillBoard(subBoards);

    return subBoards;
  }

  resetBoard() {
    const subBoards = this.initializeBoard();
    this.setState({
      subBoards
    });
  }

  initilizeSubBoard(): SubBoardClass {
    const cells = [];
    for (let i = 0; i < 3; i++) {
      cells.push([]);
      for (let j = 0; j < 3; j++) {
        cells[i].push({
          visible: false,
          availableValues: []
        });
      }
    }
    return {
      cells
    };
  }

  getCleanSelectors() {
    const selectors = [];
    for (let i = 1; i < 10; i++) {
      selectors.push(new SelectorNode(i, 9));
    }
    return selectors;
  }

  render() {
    const { 
      subBoards,
      errors
    } = this.state;

    return (<div>
      <h1>Concurrent Sudoku Game</h1>
      
      {subBoards.length && <Board 
        subBoards={subBoards} 
        handleClick={this.handleCellClick} 
        errors={errors} />
      }
      
      {
        this.state.selectorsVisible && <div className="selectors-panel">
          <div>Selector</div>
          <div className="">dd</div>
        </div>
      }
      <div>
        <button onClick={()=>{this.initializeBoard()}} >New game</button>
      </div>
    </div>);
  }  

  handleCellClick = (i: number, j: number, x: number, y: number) => {
    const subBoards = [...this.state.subBoards];

    const subBoard = subBoards[i][j];
    const cell = subBoard.cells[x][y];
    subBoard.cells[x][y] = { ...cell, visible: true };

    this.setState(subBoards);
    // this.selectorsVisible = true;
    // this.i = i;
    // this.j = j;
    // this.x = x;
    // this.y = y;
  }

  // handleSelectorClick(value: number) {
  //   const subBoard = this.subBoards[this.i][this.j];
  //   const cell = subBoard.cells[this.x][this.y];

  //   if (cell.value !== value) {
  //     this.incrementErrors();
  //   } else {
  //     cell.visible = true;
  //     this.hideSelectors();
  //   }
  // }

  // hideSelectors() {
  //   this.selectorsVisible = false;
  //   this.i = null;
  //   this.j = null;
  //   this.x = null;
  //   this.y = null;
  // }

  // incrementErrors() {
  //   this.errors++;
  // }

  
}
