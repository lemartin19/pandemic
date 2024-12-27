import { SubmitButton } from '../../actions/components/SubmitButton';
import { useGamePlayQueueDispatch, useGamePlayQueueState } from '../../app/store/GamePlayQueue';
import { usePlayerState } from '../../app/store/Players';

export function OneQuietNightForm({ onSubmit }: { onSubmit: () => void }) {
  const { players } = usePlayerState();
  const { queue } = useGamePlayQueueState();
  const gamePlayDispatch = useGamePlayQueueDispatch();

  const onClick = () => {
    if (queue.every((gamePlay) => gamePlay.type !== 'infectCities')) {
      gamePlayDispatch({
        type: 'queuePlayerTurns',
        payload: { playerNames: players.map((player) => player.name) },
      });
    }
    gamePlayDispatch({ type: 'skipInfection' });
    onSubmit();
  };
  return <SubmitButton onClick={onClick} />;
}
OneQuietNightForm.displayName = 'OneQuietNightForm';
