import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Game from './components/game/Game';
import { App } from './App';
import HowToPlay from './components/how-to-play/HowToPlay';
import HighscoreOverview from './components/highscore-overview/HighscoreOverview';


ReactDOM.render(
      <BrowserRouter>
          <React.StrictMode>
          <div className="content">
              <Routes>
                  <Route path={'/'} element={<App/>}/>
                  <Route path={'/game'} element={<Game/>}/>
                  <Route path={'/how-to-play'} element={<HowToPlay/>}/>
                  <Route path={'/highscore-overview'} element={<HighscoreOverview/>}/>
              </Routes>
          </div>
          </React.StrictMode>
      </BrowserRouter>,
  document.getElementById('root')
);

