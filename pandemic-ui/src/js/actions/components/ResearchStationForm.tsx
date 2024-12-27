import { useMapState } from '../../app/store/Map';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Location } from '../../types/Map';
import { LocationSelect } from './LocationSelect';

export function ResearchStationForm({
  value,
  onChange,
}: {
  value: Location | null;
  onChange: (newLocation: Location | null) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  const { researchStations } = useMapState();
  if (!currentPlayer) {
    return null;
  }
  const availableLocations = researchStations.filter(
    (location) => location !== currentPlayer.currentLocation
  );
  return (
    <LocationSelect
      value={value}
      label="To"
      onChange={onChange}
      availableLocations={availableLocations}
    />
  );
}
ResearchStationForm.displayName = 'ResearchStationForm';
