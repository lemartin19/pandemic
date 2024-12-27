import { useGamePlayQueueDispatch, useGamePlayQueueState } from '../../app/store/GamePlayQueue';
import { usePlayerState } from '../../app/store/Players';
import { QUEUE_PREVIEW_LENGTH } from '../constants/queuePreviewLength';

export function useAdvanceGameplayState() {
  const dispatch = useGamePlayQueueDispatch();
  const { queue } = useGamePlayQueueState();
  const { players } = usePlayerState();

  return () => {
    dispatch({ type: 'nextGameplayState' });
    if (queue.length <= QUEUE_PREVIEW_LENGTH + 1) {
      dispatch({
        type: 'queuePlayerTurns',
        payload: { playerNames: players.map((player) => player.name) },
      });
    }
  };
}
