import { h } from 'preact';
import { Header } from '../common/Header/Header';
import { Footer } from '../common/Footer';

export const Home = () => (
  <div>
    <Header />
    <div className="flex flex-col">
      <div className="header-splash text-2xl h-screen w-screen p-3 flex flex-col justify-center">
        <div className="flex-grow-0 bg-white p-3 text-center shadow-xl">tsaibot sandwich</div>          
      </div>
      <div>
        Elit est reprehenderit culpa aliqua. Mollit reprehenderit non amet do ex irure nisi dolor consectetur do consectetur. Laborum deserunt adipisicing exercitation nulla aute ipsum veniam. Excepteur elit sunt irure est non Lorem in proident. Sint aliquip eu aliqua pariatur non esse ex deserunt sint nisi incididunt tempor exercitation eu.
        Laboris incididunt officia sunt mollit voluptate ut irure.
      </div>
      <Footer />
    </div>    
  </div>
);
