import { useState } from 'react';
import { usePlayersInCity } from '../../app/store/Players';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Action } from '../../types/Action';
import { Location } from '../../types/Map';
import { Player } from '../../types/Player';
import { DefaultActionButton } from '../components/DefaultActionButton';
import { PlayerSelect } from '../components/PlayerSelect';
import { SubmitButton } from '../components/SubmitButton';

const SHARE_KNOWLEDGE_NAME = 'Share Knowledge';
const SHARE_KNOWLEDGE_DESCRIPTION =
  'Give or take the city card of your current location to or from another player in the same city';

function isLocationInHand(player: Player, location: Location) {
  return player.hand.some((c) => c.name === location);
}

export const SHARE_KNOWLEDGE: Action = {
  name: SHARE_KNOWLEDGE_NAME,
  description: SHARE_KNOWLEDGE_DESCRIPTION,
  ActionForm: ({ onSubmit }: { onSubmit: () => void }) => {
    const [playerToShareWith, setPlayerToShareWith] = useState<Player | null>(null);
    const currentPlayer = useCurrentPlayer();
    const playersInCity = usePlayersInCity(currentPlayer!.currentLocation);
    return (
      <>
        <PlayerSelect
          value={playerToShareWith}
          onChange={setPlayerToShareWith}
          players={playersInCity}
        />
        <SubmitButton disabled={!playerToShareWith} onClick={onSubmit} />
      </>
    );
  },
  ActionButton: ({
    isSelected,
    onSelect,
  }: {
    isSelected: boolean;
    onSelect: (newType: Action['name']) => void;
  }) => {
    const currentPlayer = useCurrentPlayer();
    const playersInCity = usePlayersInCity(currentPlayer!.currentLocation);
    const hasCurrentCityCard =
      isLocationInHand(currentPlayer!, currentPlayer!.currentLocation) ||
      playersInCity.some((player) => isLocationInHand(player, currentPlayer!.currentLocation));
    const disabled = !playersInCity.length || !hasCurrentCityCard;

    return (
      <DefaultActionButton
        disabled={disabled}
        name={SHARE_KNOWLEDGE_NAME}
        description={SHARE_KNOWLEDGE_DESCRIPTION}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    );
  },
};
