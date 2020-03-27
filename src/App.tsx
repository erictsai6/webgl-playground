import Router from 'preact-router';
import { h, render, Fragment } from 'preact';
import { Home } from './modules/Home/Home';
import { Playground } from './modules/Playground/Playground';

const Main = () => (
  <Fragment>
    <Router>
      <Home path="/" />
      <Playground path="/playground" />
      {/* <About path="/about" />
          // Advanced is an optional query
          <Search path="/search/:query/:advanced?" /> */}
    </Router>
  </Fragment>
);

render(<Main />, document.body);
