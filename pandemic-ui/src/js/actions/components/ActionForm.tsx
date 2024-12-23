import { Dispatch, SetStateAction } from 'react';
import { useInfectionsState } from '../../app/store/Infections';
import { useConnectedCities, useMapState } from '../../app/store/Map';
import { Button } from '../../components/Button';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { CityCard, isEventCard } from '../../types/Card';
import { Color } from '../../types/Disease';
import { Location } from '../../types/Map';
import { InProgressAction } from '../types/InProgressAction';
import { LocationSelect } from './LocationSelect';

function AdjacentLocationForm({
  value,
  onChange,
}: {
  value?: Location;
  onChange: (newLocation: Location) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  const connectedCities = useConnectedCities(currentPlayer?.currentLocation ?? '');
  if (!currentPlayer) return null;
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

function HandLocationForm({
  value,
  onChange,
}: {
  value?: CityCard;
  onChange: (newCityCard: CityCard) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  if (!currentPlayer) return null;
  const availableLocations = currentPlayer.hand
    .filter((card) => !isEventCard(card))
    .map((card) => card.name);
  return (
    <LocationSelect
      value={value?.name}
      label="To"
      onChange={(newCity) =>
        onChange(currentPlayer.hand.find((card) => card.name === newCity) as CityCard)
      }
      availableLocations={availableLocations}
    />
  );
}
HandLocationForm.displayName = 'HandLocationForm';

function ColorSelect({ value, onChange }: { value?: Color; onChange: (newColor: Color) => void }) {
  const currentPlayer = useCurrentPlayer();
  const { infections } = useInfectionsState();
  if (!currentPlayer) return null;
  const availableColors = Object.entries(infections[currentPlayer.currentLocation])
    .filter(([__, count]) => count > 0)
    .map(([color]) => color);
  return (
    <div className="ColorSelect">
      {availableColors.map((color) => (
        <Button
          key={color}
          variant={value === color ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onChange(color as Color)}
        >
          {color}
        </Button>
      ))}
    </div>
  );
}
ColorSelect.displayName = 'ColorSelect';

function ResearchStationForm({
  value,
  onChange,
}: {
  value?: Location;
  onChange: (newLocation: Location) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  const { researchStations } = useMapState();
  if (!currentPlayer) return null;
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

export function ActionForm({
  action,
  updateAction,
}: {
  action: InProgressAction;
  updateAction: Dispatch<SetStateAction<InProgressAction>>;
}) {
  switch (action.type) {
    case 'driveFerry':
      return (
        <AdjacentLocationForm
          value={action.to}
          onChange={(newLocation) => updateAction({ type: 'driveFerry', to: newLocation })}
        />
      );
    case 'fly':
      return (
        <HandLocationForm
          value={action.cityCard}
          onChange={(newCityCard) => updateAction({ type: 'fly', cityCard: newCityCard })}
        />
      );
    case 'shuttle':
      return (
        <ResearchStationForm
          value={action.to}
          onChange={(newLocation) => updateAction({ type: 'shuttle', to: newLocation })}
        />
      );
    case 'treatDisease':
      return (
        <ColorSelect
          value={action.color}
          onChange={(newColor) => updateAction({ type: 'treatDisease', color: newColor })}
        />
      );
    default:
      return null;
  }
}
ActionForm.displayName = 'ActionForm';
