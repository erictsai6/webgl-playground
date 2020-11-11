import { h, Component } from 'preact';
import classnames from 'classnames';

import './SelectorNode.css';

type Props = {
  value: number;     
  handleClick: (value: number) => void;
};

export class SelectorNode extends Component<Props, any> {  

  render(props: Props) {
    const { value, handleClick } = props;
    return (
      <div className="selector-node bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
        handleClick(value);
      }}>        
        <div className={ classnames({

        })}>
          {value}
        </div>
      </div>
    );
  }
}

