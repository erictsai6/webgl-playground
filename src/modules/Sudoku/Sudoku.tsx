import { h, Component } from 'preact';

import { Board } from './Game';
import './Sudoku.css';

export class Sudoku extends Component {  

  private state: {
    board: Board;
  };
  
  constructor(props: any) {
    super(props);
    this.state = {
      board: new Board()
    };
  }

  initializeBoard() {    
    this.setState({ board: new Board() });
  }

  render() {
    return (<div>
      <h1>Concurrent Sudoku Game</h1>

      { this.state.board && <div className="board">
        {this.state.board.subBoards.map((boardRow) => {          
          return (<div className="board-row">{
            boardRow.map((subBoard) => {            
              return (<div className="sub-board">
                {subBoard.cells.map((row) => {
                  return (<div className="sub-board-row">
                    {
                      row.map((cell) => {
                        return (<div className="cell">{cell.value}</div>)
                      })
                    }
                  </div>)
                })}
              </div>);
            })
          }</div>);
        })}
      </div> }
      <div>
        <button onClick={()=>{this.initializeBoard()}} >New game</button>
      </div>
    </div>);
  }
}
