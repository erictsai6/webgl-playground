import { h } from 'preact';
import { Fire } from './Svg/Svg';

export function Header() {
  return (
    <div className="navigation">      
      <ul className="flex flex-col shadow-xl h-screen bg-orange-500 p-3"> 
        <li className="pr-6 pb-6 hover:text-yellow-300">
          <Fire style={{transition: '.5s' }} className="fill-current text-teal-500 hover:text-yellow-300 cursor-pointer" />
        </li>
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
  );
}