import { useDecksDispatch } from '../../app/store/Decks';
import { useGamePlayQueueDispatch } from '../../app/store/GamePlayQueue';
import { useInfectionsDispatch } from '../../app/store/Infections';
import { useMapDispatch } from '../../app/store/Map';
import { usePlayerDispatch } from '../../app/store/Players';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Action } from '../../types/Action';

export function useDoAction() {
  const currentPlayer = useCurrentPlayer();
  const gameplayDispatch = useGamePlayQueueDispatch();
  const decksDispatch = useDecksDispatch();
  const playerDispatch = usePlayerDispatch();
  const mapDispatch = useMapDispatch();
  const infectionDispatch = useInfectionsDispatch();

  return (action: Action) => {
    if (!currentPlayer) return;

    if (action.type === 'driveFerry' || action.type === 'shuttle') {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: currentPlayer.name, location: action.to },
      });
    } else if (action.type === 'fly') {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: currentPlayer.name, location: action.cityCard.name },
      });
      decksDispatch({ type: 'discard', payload: [action.cityCard] });
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer.name, cards: [action.cityCard] },
      });
    } else if (action.type === 'charter') {
      playerDispatch({
        type: 'movePlayer',
        payload: { playerName: currentPlayer.name, location: action.to },
      });
      decksDispatch({ type: 'discard', payload: [action.cityCard] });
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer.name, cards: [action.cityCard] },
      });
    } else if (action.type === 'buildResearchStation') {
      mapDispatch({ type: 'buildResearchStation', payload: { location: action.cityCard.name } });
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer.name, cards: [action.cityCard] },
      });
    } else if (action.type === 'treatDisease') {
      infectionDispatch({
        type: 'treatDisease',
        payload: {
          location: currentPlayer.currentLocation,
          color: action.color,
        },
      });
    } else if (action.type === 'shareKnowledge') {
      playerDispatch({
        type: 'addToHand',
        payload: { playerName: action.playerName, cards: [action.cityCard] },
      });
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer.name, cards: [action.cityCard] },
      });
    }
    gameplayDispatch({ type: 'nextGameplayState' });
  };
}
