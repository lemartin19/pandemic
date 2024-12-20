import { useCurrentGameplayState } from '../../app/store/GamePlayQueue';
import { usePlayerState } from '../../app/store/Players';
import { isWaitingForPlayer } from '../../types/GamePlay';

export function useCurrentPlayer() {
  const { players } = usePlayerState();
  const currentGameplayState = useCurrentGameplayState();
  if (currentGameplayState && isWaitingForPlayer(currentGameplayState)) {
    return players.find((player) => player.name === currentGameplayState.playerName) ?? null;
  }
  return null;
}
