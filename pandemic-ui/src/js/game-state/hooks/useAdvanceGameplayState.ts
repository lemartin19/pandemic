import { useGamePlayQueueDispatch, useGamePlayQueueState } from '../../app/store/GamePlayQueue';
import { usePlayerState } from '../../app/store/Players';

export function useAdvanceGameplayState() {
  const dispatch = useGamePlayQueueDispatch();
  const { queue } = useGamePlayQueueState();
  const { players } = usePlayerState();

  return () => {
    dispatch({ type: 'nextGameplayState' });
    if (queue.length <= 1) {
      dispatch({
        type: 'queuePlayerTurns',
        payload: { playerNames: players.map((player) => player.name) },
      });
    }
  };
}
