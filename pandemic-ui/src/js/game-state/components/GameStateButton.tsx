import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { DiscardCardButton } from './DiscardCardButton';
import { DrawCardButton } from './DrawCardButton';
import { IncreaseInfectionRateButton } from './IncreaseInfectionRateButton';
import { InfectCitiesButton } from './InfectCitiesButton';
import { StartEpidemicButton } from './StartEpidemicButton';
import { TakeActionButton } from './TakeActionButton';

export function GameStateButton() {
  const gameplayState = useCurrentGameplayState();

  switch (gameplayState?.type) {
    case 'waitingForPlayerAction':
      return <TakeActionButton playerName={gameplayState.playerName} />;

    case 'waitingForPlayerDraw':
      return <DrawCardButton playerName={gameplayState.playerName} />;

    case 'waitingForPlayerDiscard':
      return <DiscardCardButton playerName={gameplayState.playerName} />;

    case 'startEpidemic':
      return <StartEpidemicButton />;

    case 'increaseInfectionRate':
      return <IncreaseInfectionRateButton />;

    case 'infectCities':
      return <InfectCitiesButton />;

    default:
      return null;
  }
}
GameStateButton.displayName = 'GameStateButton';
