import { type Action } from '../../types/Action';
import { Button } from '../../components/Button';

const ACTION_TYPES: Array<{
  type: Action['type'];
  label: string;
}> = [
  {
    type: 'driveFerry',
    label: 'Drive/Ferry',
  },
  {
    type: 'shuttle',
    label: 'Shuttle Flight',
  },
  {
    type: 'fly',
    label: 'Direct Flight',
  },
  {
    type: 'charter',
    label: 'Charter Flight',
  },
  {
    type: 'buildResearchStation',
    label: 'Build Research Station',
  },
  {
    type: 'shareKnowledge',
    label: 'Share Knowledge',
  },
  {
    type: 'treatDisease',
    label: 'Treat Disease',
  },
];

export function ActionTypeSelect({
  type,
  onSelect,
}: {
  type: Action['type'];
  onSelect: (newType: Action['type']) => void;
}) {
  return (
    <div className="ActionTypeSelect">
      {ACTION_TYPES.map((actionType) => (
        <Button
          key={actionType.type}
          variant={type === actionType.type ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onSelect(actionType.type)}
        >
          {actionType.label}
        </Button>
      ))}
    </div>
  );
}

ActionTypeSelect.displayName = 'ActionTypeSelect';
