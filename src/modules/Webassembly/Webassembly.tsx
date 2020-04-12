import { h, Component } from 'preact';

import { calcPrimeSum } from '../../lib.rs';

export class Webassembly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primeSum: 0
    };
  }
  componentDidMount() {
    this.setState({
      primeSum: calcPrimeSum(25)
    });
  }

  render() {
    return (<div className="p-3">
      <div className="header-container-standard">
        <h1 className="text-2xl justify-center">Webassembly tool</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="">{this.state.primeSum}</div>
      </div>
    </div>);
  }
}