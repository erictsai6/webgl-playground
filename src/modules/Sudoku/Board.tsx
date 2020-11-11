import { h, Component } from 'preact';
import { SubBoard, SubBoardClass } from './SubBoard';

import './Board.css';

type Props = {
  subBoards: SubBoardClass[][];
  errors: number;
  handleClick: (i: number, j: number, x: number, y: number) => void;
};

export class Board extends Component<Props, any> {  

  render(props: Props) {
    const { 
      subBoards,
      handleClick
    } = props;
    return (<div className="p-3">
        {subBoards.map((boardRow, i) => {          
          return (<div className="board-row">{
            boardRow.map((subBoard, j) => {            
              const subBoardProps = {
                cells: subBoard.cells,
                i,
                j,
                handleClick
              };
              return (<SubBoard { ...subBoardProps } />);
            })
          }</div>);
        })}
    </div> );
  }
}