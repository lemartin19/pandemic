import { useDecksDispatch } from '../../app/store/Decks';
import { Button } from '../../components/Button';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';

export function IntensifyEpidemicButton() {
  const decksDispatch = useDecksDispatch();
  const advanceGameplayState = useAdvanceGameplayState();

  return (
    <Button
      onClick={() => {
        decksDispatch({ type: 'intensify' });
        advanceGameplayState();
      }}
    >
      Intensify Epidemic
    </Button>
  );
}

IntensifyEpidemicButton.displayName = 'IntensifyEpidemicButton';
