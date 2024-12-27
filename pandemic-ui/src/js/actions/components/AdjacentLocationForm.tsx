import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { useConnectedCities } from '../../app/store/Map';
import { LocationSelect } from './LocationSelect';
import { Location } from '../../types/Map';

export function AdjacentLocationForm({
  value,
  onChange,
}: {
  value: Location | null;
  onChange: (newLocation: Location) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  const connectedCities = useConnectedCities(currentPlayer?.currentLocation ?? '');
  if (!currentPlayer) {
    return null;
  }
  return (
    <LocationSelect
      value={value}
      label="To"
      onChange={onChange}
      availableLocations={connectedCities}
    />
  );
}
AdjacentLocationForm.displayName = 'AdjacentLocationForm';
