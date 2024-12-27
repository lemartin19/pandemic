import { useState } from 'react';
import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useAdvanceGameplayState } from '../hooks/useAdvanceGameplayState';
import { DiscardModal } from './DiscardModal';

export function DiscardCardButton({ playerName }: { playerName: string }) {
  const player = useCurrentPlayer();
  const advanceGameplayState = useAdvanceGameplayState();
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  return (
    <>
      <Button
        className="DoTurnButton"
        variant="player"
        playerColor={player?.color}
        onClick={() => setIsDiscardModalOpen(true)}
      >
        {playerName}: Discard Card
      </Button>
      <DiscardModal
        isOpen={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        playerName={playerName}
        onSubmit={() => {
          setIsDiscardModalOpen(false);
          advanceGameplayState();
        }}
      />
    </>
  );
}

DiscardCardButton.displayName = 'DiscardCardButton';
