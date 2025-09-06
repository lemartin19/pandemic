import { useNavigate } from 'react-router-dom';
import { useInitGame } from '../hooks/useInitGame';
import { createInitialDecks } from '../utils/createInitialDecks';
import { createInitialInfections } from '../utils/createInitialInfections';
import { createInitialMap } from '../utils/createInitialMap';
import { createInitialPlayers } from '../utils/createInitialPlayers';
import { InitialSetup } from './InitialSetup';
import { PlayerSetup } from './PlayerSetup';

export function NewGame() {
  const navigate = useNavigate();
  const { initGame, gameSettings, setGameSettings } = useInitGame();

  function handleInitialSetup(settings: {
    numberOfPlayers: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }): void {
    const initialPlayers = createInitialPlayers(settings.numberOfPlayers);
    const { players, drawPile, infectionDeck } = createInitialDecks(
      settings.difficulty,
      'basic',
      initialPlayers
    );
    const { map, researchStations } = createInitialMap('basic');
    const { infections, infectionDiscard, infectionSaturation, infectionRates, outbreaksLeft } =
      createInitialInfections(map, infectionDeck);

    setGameSettings({
      players,
      drawPile,
      infectionDeck,
      map,
      infections,
      infectionDiscard,
      infectionSaturation,
      researchStations,
      infectionRates,
      outbreaksLeft,
    });
  }

  function handlePlayerSetup(playerSettings: { name: string; color: string }[]): void {
    const players = gameSettings.players.map((player, idx) => ({
      ...player,
      name: playerSettings[idx].name,
      color: playerSettings[idx].color,
      currentLocation: 'Atlanta',
    }));

    initGame({ players });
    navigate('/game');
  }
  const isDefiningPlayers = gameSettings.players.length === 0;

  return (
    <div className="max-w-md mx-auto mt-8 p-8 rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-6">Start a new game</h2>
      {isDefiningPlayers ? (
        <InitialSetup onSubmit={handleInitialSetup} />
      ) : (
        <PlayerSetup initialValue={gameSettings.players} onSubmit={handlePlayerSetup} />
      )}
    </div>
  );
}
NewGame.displayName = 'NewGame';
