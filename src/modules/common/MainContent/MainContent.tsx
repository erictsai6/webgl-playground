import { h, ComponentChildren } from 'preact';
import classnames from 'classnames';

import './MainContent.css';

type Props = {
  isHeaderOpen: boolean;
  scrollPosition: number;
  children: ComponentChildren;
}

function applyFixedScrollPositionStyle(props: Props) {
  if (props.isHeaderOpen) {
    return `position: fixed; top: -${props.scrollPosition};`
  }
  return '';
}


export function MainContent(props: Props) {
  return (
    <div style={applyFixedScrollPositionStyle(props)} className={  
      classnames({
        "main-content": true,
        shift: props.isHeaderOpen
      })} >
        { props.children }
    </div>);
}