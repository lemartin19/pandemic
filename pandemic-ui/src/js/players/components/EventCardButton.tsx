import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { PlayerHand } from './PlayerHand';
import { Button } from '../../components/Button';
import { Deck } from '../../types/Deck';
import { EventCard, isEventCard } from '../../types/Card';

export function EventCardButton({ eventCards }: { eventCards: Deck<EventCard> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<EventCard | null>(null);
  const onClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
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
        {selectedCard && <selectedCard.EventForm onSubmit={onClose} />}
      </Modal>
    </>
  );
}
EventCardButton.displayName = 'EventCardButton';
