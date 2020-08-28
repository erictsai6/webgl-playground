import Router from 'preact-router';
import { h, render, Fragment, Component } from 'preact';
import { Home } from './modules/Home/Home';
import { Playground } from './modules/Playground/Playground';
import { Sudoku } from './modules/Sudoku/Sudoku';
import { Header } from './modules/common/Header/Header';
import { Footer } from './modules/common/Footer';
import { MainContent } from './modules/common/MainContent/MainContent';

type IAppState = {
  header: {
    open: boolean;
    scrollPosition: number;
  };
}

class Main extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      header: {
        open: false,        
        scrollPosition: 0
      }
    };
  }

  handleRoute = () => {
    this.setState({
      header: {
        open: false,
        scrollPosition: 0
      }
    })
  }

  toggleHeader = () => {
    const scrollPosition = window.scrollY;
    this.setState({
      header: {
        open: !this.state.header.open,
        scrollPosition
      }
    });
  }
  render(_, state: IAppState) {
    return (
      <div class="app">
        <Header toggleHeader={this.toggleHeader} 
          open={state.header.open} />
        <MainContent isHeaderOpen={state.header.open} 
              scrollPosition={state.header.scrollPosition}>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Playground path="/playground" />
            <Sudoku path="/sudoku" />
            {/* <About path="/about" />
                // Advanced is an optional query
                <Search path="/search/:query/:advanced?" /> */}
          </Router>
          {/* <Footer /> */}
        </MainContent>
      </div>
    );
  }
}

render(<Main />, document.body);
