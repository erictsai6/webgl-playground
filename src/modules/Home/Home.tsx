import { h } from 'preact';
import { Header } from '../common/Header';

export const Home = () => (
  <div class="flex flex-row">
    <Header />
    <div className="pl-16 flex flex-col">
      <div className="text-2xl h-screen w-screen p-3 flex flex-col justify-center">
        <div className="text-center">tsaibot sandwich</div>          
      </div>
      <div>
        Somethiiing to scroll under to
      </div>
    </div>    
  </div>
);
