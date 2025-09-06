import { useState } from 'react';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { isEventCard } from '../../../types/Card';
import { Player } from '../../../types/Player';
import { PlayerSelect } from '../../components/PlayerSelect';
import { SubmitButton } from '../../components/SubmitButton';

interface TakeFormProps {
  otherPlayersInCity: Player[];
  onSubmit: () => void;
}

export function TakeForm({ otherPlayersInCity, onSubmit }: TakeFormProps) {
  const [playerToShareWith, setPlayerToShareWith] = useState<Player | null>(null);
  const currentPlayer = useCurrentPlayer();
  const playerDispatch = usePlayerDispatch();

  const handleSubmit = () => {
    if (playerToShareWith && currentPlayer) {
      const currentCityCard = playerToShareWith.hand.find(
        (card) => !isEventCard(card) && card.name === currentPlayer.currentLocation
      );

      if (currentCityCard) {
        playerDispatch({
          type: 'removeFromHand',
          payload: { playerName: playerToShareWith.name, cards: [currentCityCard] },
        });
        playerDispatch({
          type: 'addToHand',
          payload: { playerName: currentPlayer.name, cards: [currentCityCard] },
        });
        onSubmit();
      }
    }
  };

  const isSubmitDisabled = !playerToShareWith;

  return (
    <>
      <PlayerSelect
        value={playerToShareWith}
        onChange={setPlayerToShareWith}
        players={otherPlayersInCity}
      />
      <SubmitButton disabled={isSubmitDisabled} onClick={handleSubmit} />
    </>
  );
}

TakeForm.displayName = 'TakeForm';
