import { h, Component } from 'preact';

import { Cell, CellClass } from './Cell';

export class SubBoardClass {
  cells: CellClass[][];
}

type Props = {
  cells: CellClass[][];
  i: number;
  j: number;
  handleClick: (i: number, j: number, x: number, y: number) => void;
};

export class SubBoard extends Component <Props, any> {
  
  render(props: Props) {
    const {       
      cells, 
      i, 
      j,
      handleClick
    } = props;
    return (<div className="sub-board">
      {cells.map((row, x) => {
        return (<div className="sub-board-row">
          {
            row.map((cell, y) => {   
              const cellProps = {
                i,
                j,
                x,
                y,                  
                visible: cell.visible,
                availableValues: cell.availableValues,
                value: cell.value,
                handleClick,
              }             
              return (
                <Cell {...cellProps} />
              );
            })
          }
        </div>)
      })}
    </div>);    
  }  
}
