import { useState } from 'react';
import { LocationSelect } from '../../actions/components/LocationSelect';
import { PlayerSelect } from '../../actions/components/PlayerSelect';
import { SubmitButton } from '../../actions/components/SubmitButton';
import { useMapState } from '../../app/store/Map';
import { usePlayerDispatch, usePlayerState } from '../../app/store/Players';
import { Location } from '../../types/Map';
import { Player } from '../../types/Player';

export function AirliftForm({ onSubmit }: { onSubmit: () => void }) {
  const [player, setPlayer] = useState<Player | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const playerDispatch = usePlayerDispatch();
  const { players } = usePlayerState();
  const { map } = useMapState();

  const onClick = () => {
    if (!player || !location) return;
    playerDispatch({
      type: 'movePlayer',
      payload: { playerName: player.name, location: 'Atlanta' },
    });
    onSubmit();
  };

  const disabled = !player || !location;
  return (
    <>
      <PlayerSelect players={players} value={player} onChange={(player) => setPlayer(player)} />
      <LocationSelect
        availableLocations={map.map((city) => city.name)}
        value={location}
        onChange={(location) => setLocation(location)}
      />
      <SubmitButton disabled={disabled} onClick={onClick} />
    </>
  );
}
AirliftForm.displayName = 'AirliftForm';
