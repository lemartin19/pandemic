import { useState } from 'react';
import { usePlayerDispatch } from '../../../app/store/Players';
import { useCurrentPlayer } from '../../../players/hooks/useCurrentPlayer';
import { CityCard } from '../../../types/Card';
import { Player } from '../../../types/Player';
import { HandLocationForm } from '../../components/HandLocationForm';
import { PlayerSelect } from '../../components/PlayerSelect';
import { SubmitButton } from '../../components/SubmitButton';

interface ResearchGiveFormProps {
  otherPlayersInCity: Player[];
  onSubmit: () => void;
}

export function ResearchGiveForm({ otherPlayersInCity, onSubmit }: ResearchGiveFormProps) {
  const [playerToShareWith, setPlayerToShareWith] = useState<Player | null>(null);
  const [card, setCard] = useState<CityCard | null>(null);
  const currentPlayer = useCurrentPlayer();
  const playerDispatch = usePlayerDispatch();

  const handleSubmit = () => {
    if (card && playerToShareWith && currentPlayer) {
      playerDispatch({
        type: 'removeFromHand',
        payload: { playerName: currentPlayer.name, cards: [card] },
      });
      playerDispatch({
        type: 'addToHand',
        payload: { playerName: playerToShareWith.name, cards: [card] },
      });
      onSubmit();
    }
  };

  const isSubmitDisabled = !playerToShareWith || !card;

  return (
    <>
      <PlayerSelect
        value={playerToShareWith}
        onChange={setPlayerToShareWith}
        players={otherPlayersInCity}
      />
      <HandLocationForm value={card} onChange={setCard} />
      <SubmitButton disabled={isSubmitDisabled} onClick={handleSubmit} />
    </>
  );
}

ResearchGiveForm.displayName = 'ResearchGiveForm';
