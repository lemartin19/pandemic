import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';
import { useInfectionsState } from '../../app/store/Infections';
import { useDrawAndInfectCities } from '../hooks/useDrawAndInfectCities';

export function InfectCitiesButton() {
  const player = useCurrentPlayer();
  const { infectionRates } = useInfectionsState();
  const infectionRate = infectionRates[0];
  const drawAndInfectCities = useDrawAndInfectCities();
  const advanceGameplayState = useAdvanceGameplayState();
  return (
    <Button
      variant="player"
      playerColor={player?.color}
      onClick={() => {
        drawAndInfectCities();
        advanceGameplayState();
      }}
    >
      Infect {infectionRate} Cities
    </Button>
  );
}

InfectCitiesButton.displayName = 'InfectCitiesButton';
