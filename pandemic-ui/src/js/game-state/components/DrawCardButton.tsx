import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';
import { useDrawCard } from '../hooks/useDrawCard';

export function DrawCardButton({ playerName }: { playerName: string }) {
  const player = useCurrentPlayer();
  const advanceGameplayState = useAdvanceGameplayState();
  const drawCard = useDrawCard();

  return (
    <Button
      variant="player"
      playerColor={player?.color}
      onClick={() => {
        advanceGameplayState();
        drawCard();
      }}
    >
      {playerName}: Draw Card
    </Button>
  );
}
DrawCardButton.displayName = 'DrawCardButton';
