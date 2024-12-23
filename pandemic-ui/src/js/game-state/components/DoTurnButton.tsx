import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { GamePlay } from '../../types/GamePlay';

function getTextForGameplayState(gameplayState: GamePlay) {
  if (gameplayState.type === 'waitingForPlayerAction') {
    return `${gameplayState.playerName}: Take Action`;
  }
  if (gameplayState.type === 'waitingForPlayerDraw') {
    return `${gameplayState.playerName}: Draw Card`;
  }
  if (gameplayState.type === 'waitingForPlayerDiscard') {
    return `${gameplayState.playerName}: Take Action`;
  }
  if (gameplayState.type === 'startEpidemic') {
    return `Start Epidemic`;
  }
  if (gameplayState.type === 'increaseInfectionRate') {
    return `Increase Infection Rate`;
  }
  if (gameplayState.type === 'infectCities') {
    return `Infect Cities`;
  }
}

export function DoTurnButton({ onClick }: { onClick: () => void }) {
  const gameplayState = useCurrentGameplayState();

  return gameplayState ? (
    <button className="DoTurnButton" onClick={onClick}>
      {getTextForGameplayState(gameplayState)}
    </button>
  ) : null;
}
DoTurnButton.displayName = 'DoTurnButton';
