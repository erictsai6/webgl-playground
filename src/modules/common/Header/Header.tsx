import { h, Component, Fragment } from 'preact';
import { Fire } from '../Svg/Svg';

import './Header.css';

interface State {
  showSidebar: boolean;
}

export class Header extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showSidebar: false
    } as any;
  }

  toggleSidebar = () => {    
    this.setState({
      showSidebar: !this.state.showSidebar
    });
  }

  render()  {
    return (
      <Fragment>
        {this.state.showSidebar && 
          <div className="navigation fixed">      
            <ul className="flex flex-col shadow-xl h-screen p-3 sm:w-full">             
              <li className="pr-6">
                <a className="text-blue-500" href="/">Home</a>
              </li>       
              <li className="pr-6">
                <a href="/playground">Game</a>        
              </li>
              <li className="pr-6">
                <a href="/tools">Tools</a>        
              </li>
            </ul>
          </div>
        }  
        <div className="fixed">
          <Fire style={{transition: '.5s' }} 
            className="fire-hamburger-icon ml-3 my-3 shadow-lg fill-current cursor-pointer" 
            onClick={this.toggleSidebar} />
        </div>
        
      </Fragment>
    );
  }
}