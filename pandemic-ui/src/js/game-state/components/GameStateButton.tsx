import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { DiscardCardButton } from './DiscardCardButton';
import { DrawCardButton } from './DrawCardButton';
import { IncreaseInfectionRateButton } from './IncreaseInfectionRateButton';
import { InfectCitiesButton } from './InfectCitiesButton';
import { StartEpidemicButton } from './StartEpidemicButton';
import { TakeActionButton } from './TakeActionButton';

export function GameStateButton() {
  const gameplayState = useCurrentGameplayState();

  if (!gameplayState) {
    return null;
  }
  if (gameplayState.type === 'waitingForPlayerAction') {
    return <TakeActionButton playerName={gameplayState.playerName} />;
  }
  if (gameplayState.type === 'waitingForPlayerDraw') {
    return <DrawCardButton playerName={gameplayState.playerName} />;
  }
  if (gameplayState.type === 'waitingForPlayerDiscard') {
    return <DiscardCardButton playerName={gameplayState.playerName} />;
  }
  if (gameplayState.type === 'startEpidemic') {
    return <StartEpidemicButton />;
  }
  if (gameplayState.type === 'increaseInfectionRate') {
    return <IncreaseInfectionRateButton />;
  }
  if (gameplayState.type === 'infectCities') {
    return <InfectCitiesButton />;
  }
}
GameStateButton.displayName = 'GameStateButton';
