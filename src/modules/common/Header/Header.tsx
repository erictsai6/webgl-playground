import { h, Component, Fragment } from 'preact';
import { Fire } from '../Svg/Svg';
import classnames from 'classnames';

import './Header.css';

type Props = {
  open: boolean;
  toggleHeader: () => void;
}

export class Header extends Component<Props> {

  render(props: Props)  {
    return (
      <Fragment>         
        <div className={`navigation ${  classnames({
          open: props.open
        })}`}>      
          <ul className="flex flex-col shadow-xl h-screen p-3 sm:w-full">             
            <li className="pr-6">
              <a href="/">Home</a>
            </li>       
            <li className="pr-6">
              <a href="/playground">Game</a>        
            </li>
            <li className="pr-6">
              <a href="/sudoku">Sudoku</a>        
            </li>
            <li className="pr-6">
              <a href="/tools">Tools</a>     
            </li>
            <li className="pr-6">   
              <a href="/tools/skybox">Skybox</a>        
            </li>
          </ul>
        </div>      
        <Fire 
          className="fire-hamburger-icon ml-3 my-3 shadow-lg fill-current cursor-pointer" 
          onClick={props.toggleHeader} />
        
      </Fragment>
    );
  }
}