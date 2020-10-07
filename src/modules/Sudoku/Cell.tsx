import { h, Component } from 'preact';
import classnames from 'classnames';

import './Cell.css';

export type CellClass = {
  visible: boolean;
  value?: number;
  availableValues: number[];  
}

type Props = {
  i: number;
  j: number;
  x: number;
  y: number;
  visible: boolean;
  availableValues: number[];
  value?: number;
  handleClick: (i: number, j: number, x: number, y: number) => void;
};

export class Cell extends Component<Props, any> {  

  render(props: Props) {
    const { i, j, x, y, visible, value, handleClick } = props;
    return (
      <div className="cell" onClick={() => {
        handleClick(i, j, x, y);
      }}>        
        <div className={ classnames({
          hidden: !visible,
          "animate__animated animate__bounceIn": visible          
        })}>
          {value}
        </div>
      </div>
    );
  }
}

