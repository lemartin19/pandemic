import { useState } from 'react';
import { usePlayerDispatch } from '../../app/store/Players';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { EventCard, isEventCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { PlayerHand } from './PlayerHand';

export function EventCardButton({
  playerName,
  eventCards,
}: {
  playerName: string;
  eventCards: Deck<EventCard>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<EventCard | null>(null);
  const playerDispatch = usePlayerDispatch();

  const onClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };
  const onSubmit = () => {
    if (!selectedCard) return;

    setIsOpen(false);
    setSelectedCard(null);
    playerDispatch({ type: 'removeFromHand', payload: { playerName, cards: [selectedCard] } });
  };
  return (
    <>
      <Button variant="secondary" size="small" onClick={() => setIsOpen(true)}>
        Use Event Card
      </Button>
      <Modal title="Use Event Card" isOpen={isOpen} onClose={onClose}>
        <PlayerHand
          selected={selectedCard ? [selectedCard] : undefined}
          onSelect={(card) => {
            if (isEventCard(card)) {
              setSelectedCard(card);
            }
          }}
          hand={eventCards}
        />
        {selectedCard && <selectedCard.EventForm onSubmit={onSubmit} />}
      </Modal>
    </>
  );
}
EventCardButton.displayName = 'EventCardButton';
