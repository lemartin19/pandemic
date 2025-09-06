import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';
import { useInfectionsDispatch } from '../../app/store/Infections';

export function IncreaseInfectionRateButton() {
  const player = useCurrentPlayer();
  const infectionsDispatch = useInfectionsDispatch();
  const advanceGameplayState = useAdvanceGameplayState();
  return (
    <Button
      variant="player"
      playerColor={player?.color}
      onClick={() => {
        infectionsDispatch({ type: 'increaseInfectionRate' });
        advanceGameplayState();
      }}
    >
      Increase Infection Rate
    </Button>
  );
}

IncreaseInfectionRateButton.displayName = 'IncreaseInfectionRateButton';
