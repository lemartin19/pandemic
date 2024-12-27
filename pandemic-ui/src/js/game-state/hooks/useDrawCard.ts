import { useDecksDispatch, useDecksState } from '../../app/store/Decks';
import { useGamePlayQueueDispatch } from '../../app/store/GamePlayQueue';
import { usePlayerDispatch } from '../../app/store/Players';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';

export function useDrawCard() {
  const gameplayQueueDispatch = useGamePlayQueueDispatch();
  const decksDispatch = useDecksDispatch();
  const playerDispatch = usePlayerDispatch();
  const currentPlayer = useCurrentPlayer();
  const { drawPile } = useDecksState();
  const drawCard = drawPile[0];

  return () => {
    if (!drawCard || !currentPlayer) {
      return;
    }
    decksDispatch({ type: 'playerDraw' });

    if (drawCard.type === 'epidemic') {
      gameplayQueueDispatch({ type: 'startEpidemic' });
    } else {
      playerDispatch({
        type: 'addToHand',
        payload: { playerName: currentPlayer!.name, cards: [drawCard] },
      });

      if (currentPlayer.hand.length >= 7) {
        gameplayQueueDispatch({
          type: 'requirePlayerDiscard',
          payload: { playerName: currentPlayer!.name },
        });
      }
    }
  };
}
