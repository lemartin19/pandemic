import { useInfectionsState } from '../../app/store/Infections';
import { Button } from '../../components/Button';

import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Color } from '../../types/Disease';

export function ColorSelect({
  value,
  onChange,
}: {
  value: Color | null;
  onChange: (newColor: Color) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  const { infections } = useInfectionsState();
  if (!currentPlayer) {
    return null;
  }
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
