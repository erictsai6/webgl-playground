import { h } from 'preact';

import './Home.css';
import { AngleDown } from '../common/Svg/Svg';

export const Home = () => (
  <div>
    <div className="main-content flex flex-col" >
      <div className="header-splash">
        <div className="panel left header-splash-title">
          <div>tsai</div>
          <div><br /></div>
        </div>
        <div className="panel right header-splash-title">
          <div>bot</div>
          <div>.dev</div>
        </div>
        <div className="see-more-container">
          <AngleDown className="angle-down-icon" />
        </div>
      </div>
      <div className="home-grid-container p-3 grid grid-cols-2 gap-3 justify-center">
        <div>
          Hi I'm Eric and welcome to my personal website.
          I got started in my career building web applications in Django & JQuery and 
          been able to see the evolution of the web and the increased of SPA libraries like 
          Angular, React, Vue and more.  In addition to that it's been great to see new HTML5 
          technologies become available in major browsers which is how this particular personal 
          site got started. 
        </div>
        <div>
          <img className="rounded-full m-auto" src="https://pbs.twimg.com/profile_images/523550536767791104/0VlhGMoQ_400x400.jpeg" alt="Tsaibot Twitter Profile Picture" />
        </div>
        <div>
          <img className="rounded-full m-auto" src="https://pbs.twimg.com/profile_images/523550536767791104/0VlhGMoQ_400x400.jpeg" alt="Tsaibot Twitter Profile Picture" />
        </div>
        <div>
          More recently I've been a "part-time" developer for a number of years because of 
          my manager duties.  Since I am no longer a developer individual contributor it is important to stay 
          on top of the new trends and keep my skills sharp.  This originally started off as a 
          playground for WebGL but quickly grew as I realized that some tooling did not exist for 
          small things like skybox image breakdowns.  I seized the opportunity to create my own 
          personal site and add this tooling as separate pages. 
        </div>
        <div>
          This personal site is hosted for free on Netlify and encrypted with LetsEncrypt.  
          It is built with the following technologies:
          <ul>
            <li>Preact - view rendering library similar to React</li>
            <li>Babylon.JS - framework built on top of WebGL for 3D rendering</li>
            <li>TailwindCSS - utility css library (good for prototyping quickly)</li>
            <li>Parcel - zero config asset bundler</li>
            <li>Typescript - static typing language on top of javascript</li>
          </ul>
          This started off as an experiment to play with WebGL technologies and quickly grew in scope when I realized that there weren't 
          good tools available.  Navigate the header for more  content
        </div>
        <div>
          <img className="rounded-full m-auto" src="https://pbs.twimg.com/profile_images/523550536767791104/0VlhGMoQ_400x400.jpeg" alt="Tsaibot Twitter Profile Picture" />
        </div>       
      </div>
    </div>    
  </div>
);
