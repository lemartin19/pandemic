import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
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

function usePlayerButtonStyle() {
  const player = useCurrentPlayer();
  const playerColor = player?.color;
  return playerColor && { variant: 'player' as const, playerColor };
}

export function DoTurnButton({ onClick }: { onClick: () => void }) {
  const gameplayState = useCurrentGameplayState();
  const playerButtonStyle = usePlayerButtonStyle();
  return gameplayState ? (
    <Button className="DoTurnButton" onClick={onClick} {...playerButtonStyle}>
      {getTextForGameplayState(gameplayState)}
    </Button>
  ) : null;
}
DoTurnButton.displayName = 'DoTurnButton';
