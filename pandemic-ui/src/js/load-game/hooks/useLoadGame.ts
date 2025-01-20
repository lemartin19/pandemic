import { useDecksDispatch } from '../../app/store/Decks';
import { useGamePlayQueueDispatch } from '../../app/store/GamePlayQueue';
import { useInfectionsDispatch } from '../../app/store/Infections';
import { useMapDispatch } from '../../app/store/Map';
import { usePlayerDispatch } from '../../app/store/Players';
import { SavedGame } from '../types/SavedGame';

export function useLoadGame() {
  const playerDispatch = usePlayerDispatch();
  const infectionsDispatch = useInfectionsDispatch();
  const decksDispatch = useDecksDispatch();
  const mapDispatch = useMapDispatch();
  const gamePlayDispatch = useGamePlayQueueDispatch();

  const loadGame = (savedGame: SavedGame) => {
    playerDispatch({ type: 'initPlayers', payload: savedGame.players });
    infectionsDispatch({
      type: 'initInfections',
      payload: savedGame.infections,
    });
    decksDispatch({
      type: 'initDecks',
      payload: savedGame.decks,
    });
    mapDispatch({
      type: 'initMap',
      payload: savedGame.map,
    });
    gamePlayDispatch({
      type: 'initGameplayState',
      payload: { queue: savedGame.gamePlayQueue },
    });
  };

  return {
    loadGame,
  };
}
