import '../../css/App.css';

import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Game } from './Game';
import { Home } from './Home';
import { Navigation } from './Navigation';
import { NewGame } from './NewGame';
import { Rules } from './Rules';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="App">
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-game" element={<NewGame />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/game/:id" element={<Game />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
