import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';
import { Action } from '../../types/Action';

export function DefaultActionButton({
  name,
  description,
  isSelected,
  disabled,
  onSelect,
}: {
  name: string;
  description: string;
  disabled?: boolean;
  isSelected: boolean;
  onSelect: (newType: Action['name']) => void;
}) {
  return (
    <Tooltip text={description}>
      <Button
        variant={isSelected ? 'primary' : 'secondary'}
        disabled={disabled}
        onClick={() => onSelect(name)}
      >
        {name}
      </Button>
    </Tooltip>
  );
}
DefaultActionButton.displayName = 'DefaultActionButton';
