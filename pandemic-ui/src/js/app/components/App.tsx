import { StrictMode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoadGame } from '../../load-game/components/LoadGame';
import { NewGame } from '../../new-game/components/NewGame';
import { Provider } from '../store/Provider';
import { ThemeProvider } from '../store/Theme';
import { Game } from './Game';
import { Home } from './Home';
import { Navigation } from './Navigation';
import { Rules } from './Rules';

export function App() {
  return (
    <StrictMode>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Provider>
            <Navigation />
            <div className="flex flex-col items-center justify-center">
              <main className="w-full h-full overflow-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/new-game" element={<NewGame />} />
                  <Route path="/load-game" element={<LoadGame />} />
                  <Route path="/rules" element={<Rules />} />
                  <Route path="/game" element={<Game />} />
                </Routes>
              </main>
            </div>
          </Provider>
        </div>
      </ThemeProvider>
    </StrictMode>
  );
}
App.displayName = 'App';
