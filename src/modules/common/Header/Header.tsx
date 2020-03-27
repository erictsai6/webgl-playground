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
        <div className="fixed">
          <Fire style={{transition: '.5s' }} 
            className="fire-hamburger-icon ml-3 my-3 w-12 h-12 rounded-full p-2 shadow-lg fill-current cursor-pointer" 
            onClick={this.toggleSidebar} />
        </div>
        {this.state.showSidebar && 
          <div className="navigation">      
            <ul className="flex flex-col shadow-xl h-screen bg-orange-500 p-3">             
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
      </Fragment>
    );
  }
}