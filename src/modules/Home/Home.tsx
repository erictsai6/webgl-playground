import { h } from 'preact';

import './Home.css';
import { AngleDown } from '../common/Svg/Svg';

export const Home = () => (
  <div>
    <div className="main-content flex flex-col" >
      <div className="header-splash h-screen w-screen">
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
      <div className="p-3 grid grid-cols-2 gap-3 justify-center">
        <div>
          Hi my name is Eric and I'm an engineering manager
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, iusto? A, perferendis fugit quo soluta, ut dolore distinctio, laudantium quos et sequi adipisci sit deleniti ea sunt praesentium. Reiciendis, laudantium!
        </div>
        <div>
          <img className="rounded-full m-auto" src="https://pbs.twimg.com/profile_images/523550536767791104/0VlhGMoQ_400x400.jpeg" alt="Tsaibot Twitter Profile Picture" />
        </div>
        <div>
          <img className="rounded-full m-auto" src="https://pbs.twimg.com/profile_images/523550536767791104/0VlhGMoQ_400x400.jpeg" alt="Tsaibot Twitter Profile Picture" />
        </div>
        <div>
          I've been in the industry 
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero unde a sint omnis molestiae accusantium enim molestias sequi, dolores, doloremque aliquam laudantium. Provident quibusdam numquam optio, dignissimos soluta a libero?          
        </div>
        <div>
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
