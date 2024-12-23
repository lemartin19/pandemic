import { useState } from 'react';
import { usePlayer, usePlayerDispatch } from '../../app/store/Players';
import { Modal } from '../../components/Modal';
import { CityCard, EventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { Button } from '../../components/Button';
import { useDecksDispatch } from '../../app/store/Decks';
import { PlayerHand } from '../../players/components/PlayerHand';

function useDiscardCards(playerName: string) {
  const decksDispatch = useDecksDispatch();
  const playerDispatch = usePlayerDispatch();

  return (cards: Deck<CityCard | EventCard>) => {
    playerDispatch({ type: 'removeFromHand', payload: { playerName, cards } });
    decksDispatch({ type: 'discard', payload: cards });
  };
}

export function DiscardModal({
  isOpen,
  onClose,
  playerName,
}: {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
}) {
  const [discardedCards, setDiscardedCards] = useState<Deck<CityCard | EventCard>>([]);
  const player = usePlayer(playerName);
  const discardCards = useDiscardCards(playerName);
  return player ? (
    <Modal isOpen={isOpen} onClose={onClose} title="Discard to 7 cards">
      <PlayerHand
        hand={player.hand}
        selected={discardedCards}
        onSelect={(card) => setDiscardedCards((oldDiscardedCards) => [...oldDiscardedCards, card])}
      />
      <Button
        disabled={player?.hand.length - discardedCards.length > 7}
        onClick={() => discardCards(discardedCards)}
      >
        Discard
      </Button>
    </Modal>
  ) : null;
}
DiscardModal.displayName = 'DiscardModal';
