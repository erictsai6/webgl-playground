import { h } from 'preact';

import './Home.css';
import { AngleDown } from '../common/Svg/Svg';

export const Home = () => (
  <div>
    <div className="main-content flex flex-col" >
      <div className="header-splash h-screen w-screen p-3 flex flex-col">
        <h1 className="text-center header-splash-title flex-grow">tsaibot.dev</h1>
        <div className="flex justify-center align-bottom">
          <AngleDown className="angle-down-icon" />
        </div>
      </div>
      <div>
        Welcome to Eric's personal site.  It started off as a webgl playground using Babylon but 
        Elit est reprehenderit culpa aliqua. Mollit reprehenderit non amet do ex irure nisi dolor consectetur do consectetur. Laborum deserunt adipisicing exercitation nulla aute ipsum veniam. Excepteur elit sunt irure est non Lorem in proident. Sint aliquip eu aliqua pariatur non esse ex deserunt sint nisi incididunt tempor exercitation eu.
        Laboris incididunt officia sunt mollit voluptate ut irure.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti minus quasi commodi, eum perspiciatis veniam qui natus et minima ullam, dolor ducimus animi nulla tempore. Totam aspernatur alias hic minus.
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima fuga non soluta debitis, dicta recusandae doloremque quasi explicabo, quisquam libero nesciunt, exercitationem porro molestiae consectetur mollitia tenetur officia perspiciatis. Nesciunt!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet quas iusto accusantium voluptatem earum ad enim. Ea, adipisci? Modi repellat esse soluta voluptate maiores natus nostrum non perferendis eum pariatur.
      </div>
    </div>    
  </div>
);
