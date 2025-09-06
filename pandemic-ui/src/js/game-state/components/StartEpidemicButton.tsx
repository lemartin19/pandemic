import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';
import { useStartEpidemic } from '../hooks/useStartEpidemic';

export function StartEpidemicButton() {
  const player = useCurrentPlayer();
  const startEpidemic = useStartEpidemic();
  const advanceGameplayState = useAdvanceGameplayState();
  return (
    <Button
      variant="player"
      playerColor={player?.color}
      onClick={() => {
        startEpidemic();
        advanceGameplayState();
      }}
    >
      Start Epidemic
    </Button>
  );
}

StartEpidemicButton.displayName = 'StartEpidemicButton';
