import '../../../css/App.css';

import { Route, Routes } from 'react-router-dom';
import { Game } from './Game';
import { Home } from './Home';
import { Navigation } from './Navigation';
import { NewGame } from '../../new-game/components/NewGame';
import { Rules } from './Rules';

export function App() {
  return (
    <>
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
    </>
  );
}
App.displayName = 'App';
