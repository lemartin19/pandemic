import { useState } from 'react';
import { ActionModal } from '../../actions/components/ActionModal';
import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';

export function TakeActionButton({ playerName }: { playerName: string }) {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const player = useCurrentPlayer();
  const advanceGameplayState = useAdvanceGameplayState();
  return (
    <>
      <Button className="DoTurnButton" variant="player" playerColor={player?.color}>
        {playerName}: Take Action
      </Button>
      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onSubmit={() => {
          setIsActionModalOpen(false);
          advanceGameplayState();
        }}
      />
    </>
  );
}
TakeActionButton.displayName = 'TakeActionButton';
