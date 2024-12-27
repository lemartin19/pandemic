import { useState } from 'react';
import { LocationSelect } from '../../actions/components/LocationSelect';
import { SubmitButton } from '../../actions/components/SubmitButton';
import { useMapDispatch, useMapState } from '../../app/store/Map';
import { Location } from '../../types/Map';

export function GovernmentGrantForm({ onSubmit }: { onSubmit: () => void }) {
  const [location, setLocation] = useState<Location | null>(null);
  const { map, researchStations } = useMapState();
  const mapDispatch = useMapDispatch();

  const onClick = () => {
    if (!location) return;
    mapDispatch({
      type: 'buildResearchStation',
      payload: { location },
    });
    onSubmit();
  };

  const disabled = !location;
  return (
    <>
      <LocationSelect
        availableLocations={map
          .map((city) => city.name)
          .filter((city) => !researchStations.includes(city))}
        value={location}
        onChange={setLocation}
      />
      <SubmitButton disabled={disabled} onClick={onClick} />
    </>
  );
}
GovernmentGrantForm.displayName = 'GovernmentGrantForm';
