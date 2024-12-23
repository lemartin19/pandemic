import { Location } from '../../types/Map';
import { Button } from '../../components/Button';

interface LocationSelectProps {
  value?: Location;
  onChange: (location: Location) => void;
  availableLocations: Location[];
  label?: string;
}

export function LocationSelect({
  value,
  onChange,
  availableLocations,
  label,
}: LocationSelectProps) {
  return (
    <div className="LocationSelect">
      {label && <div className="LocationSelect-label">{label}</div>}
      <div className="LocationSelect-options">
        {availableLocations.map((location) => (
          <Button
            key={location}
            variant={value === location ? 'primary' : 'secondary'}
            size="small"
            onClick={() => onChange(location)}
          >
            {location}
          </Button>
        ))}
      </div>
    </div>
  );
}
LocationSelect.displayName = 'LocationSelect';
