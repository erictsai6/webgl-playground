import { h, Component } from 'preact';

import { calcPrimeSum } from '../../../rust/functions.rs';

export class Webassembly extends Component {
  componentDidMount() {
    this.setState({
      
    })
    console.log(calcPrimeSum(25));
  }

  render() {
    return (<div className="p-3">
      <div className="header-container-standard">
        <h1 className="text-2xl justify-center">Webassembly tool</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className=""></div>
      </div>
    </div>);
  }
}