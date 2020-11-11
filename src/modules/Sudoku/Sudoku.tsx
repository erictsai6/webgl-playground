import { h, Component } from 'preact';
import classnames from 'classnames';

import { Board } from './Board';
import { SubBoardClass } from './SubBoard';
import { SelectorNode } from './SelectorNode';

import './Sudoku.css';
import { fillBoard } from './GameLogic';

export class Sudoku extends Component {  

  public state: {
    subBoards: SubBoardClass[][];
    
    selectors: number[];
    selectorsVisible: boolean;
    selectedI?: number;
    selectedJ?: number;
    selectedX?: number;
    selectedY?: number;

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
    for (let i = 0; i < 10; i++) {  
      try {
        const subBoards = [];
        for (let i = 0; i < 3; i++) {
          subBoards.push([]);
          for (let j = 0; j < 3; j++) {
            subBoards[i].push(this.initilizeSubBoard());
          }
        }

        fillBoard(subBoards);

        return subBoards;
      } catch (err) {
        console.error(err);
      }
    }
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

  render() {
    const { 
      subBoards,
      errors
    } = this.state;

    return (<div className="">  
      <div className="flex flex-row-reverse p-3">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>{this.resetBoard()}}>
            New game
        </button>
      </div>    
      {subBoards.length && <Board         
        subBoards={subBoards} 
        handleClick={this.handleCellClick} 
        errors={errors} />
      }
      
      <div className={classnames({
        "selectors-panel": true,
        "animate__animated animate__fadeOut": !this.state.selectorsVisible,
        "animate__animated animate__fadeIn": this.state.selectorsVisible          
      })}>
        {this.state.selectors.map(value => {
          const props = {
            value,
            handleClick: this.handleSelectorClick
          }
          return (<SelectorNode {...props} />);
        })}
      </div>            
    </div>);
  }  

  handleCellClick = (i: number, j: number, x: number, y: number) => {
    this.setState({
      selectorsVisible: !this.state.selectorsVisible,
      selectors: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      selectedI: i,
      selectedJ: j,
      selectedX: x,
      selectedY: y
    });   
  }

  handleSelectorClick = (valueSelected: number) => {
    const i = this.state.selectedI;
    const j = this.state.selectedJ;
    const x = this.state.selectedX;
    const y = this.state.selectedY;
    const subBoards = [...this.state.subBoards];

    const subBoard = subBoards[i][j];
    const cell = subBoard.cells[x][y];

    if (cell.value == valueSelected) {
      subBoard.cells[x][y] = { ...cell, visible: true };

      this.setState({
        subBoards,
        selectorsVisible: false
      }); 
    } else {
      console.log('error counted, haha');
    }
  }
  
}
