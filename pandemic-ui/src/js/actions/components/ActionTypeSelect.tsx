import { useInfectionsState } from '../../app/store/Infections';
import { useMapState } from '../../app/store/Map';
import { usePlayerState } from '../../app/store/Players';
import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';
import { useCurrentPlayer } from '../../players/hooks/useCurrentPlayer';
import { Action } from '../../types/Action';
import { isEventCard } from '../../types/Card';
import { Infections } from '../../types/Infections';
import { Location } from '../../types/Map';
import { Player } from '../../types/Player';

const ACTION_TYPES: Array<{
  type: Action['type'];
  label: string;
  tooltip: string;
  isDisabled: ({
    player,
    researchStations,
    players,
    infections,
  }: {
    player: Player;
    researchStations: Location[];
    players: Player[];
    infections: Infections;
  }) => boolean;
}> = [
  {
    type: 'driveFerry',
    label: 'Drive/Ferry',
    tooltip: 'Drive or ferry to an adjacent city',
    isDisabled: () => false,
  },
  {
    type: 'shuttle',
    label: 'Shuttle',
    tooltip: 'Shuttle to another research station',
    isDisabled: ({ player, researchStations }) =>
      !researchStations.includes(player.currentLocation),
  },
  {
    type: 'fly',
    label: 'Fly',
    tooltip: 'Fly to a city by discarding the city card',
    isDisabled: ({ player }) => !player.hand.some((card) => !isEventCard(card)),
  },
  {
    type: 'charter',
    label: 'Charter Flight',
    tooltip: "Fly to any city by discarding your current location's city card",
    isDisabled: ({ player }) => !player.hand.some((card) => card.name === player.currentLocation),
  },
  {
    type: 'buildResearchStation',
    label: 'Build Research Station',
    tooltip: "Build a research station in your current city by discarding it's city card",
    isDisabled: ({ player }) => !player.hand.some((card) => card.name === player.currentLocation),
  },
  {
    type: 'shareKnowledge',
    label: 'Share Knowledge',
    tooltip: 'Share a city card with another player',
    isDisabled: ({ player, players }) => {
      const otherPlayers = players.filter((p) => p.name !== player.name);
      const isInSameCity = otherPlayers.some(
        (otherPlayer) => otherPlayer.currentLocation === player.currentLocation
      );
      const isHoldingCityCard =
        player.hand.some((card) => card.name === player.currentLocation) ||
        otherPlayers.some((otherPlayer) =>
          otherPlayer.hand.some((card) => card.name === player.currentLocation)
        );
      return !isInSameCity || !isHoldingCityCard;
    },
  },
  {
    type: 'treatDisease',
    label: 'Treat Disease',
    tooltip: 'Treat a disease in your current city',
    isDisabled: ({ player, infections }) =>
      Object.values(infections[player.currentLocation]).every((infection) => infection === 0),
  },
];

export function ActionTypeSelect({
  type,
  onSelect,
}: {
  type: Action['type'];
  onSelect: (newType: Action['type']) => void;
}) {
  const currentPlayer = useCurrentPlayer();
  const { researchStations } = useMapState();
  const { players } = usePlayerState();
  const { infections } = useInfectionsState();

  return currentPlayer ? (
    <div className="ActionTypeSelect">
      {ACTION_TYPES.map((action) => (
        <Tooltip key={action.type} text={action.tooltip}>
          <Button
            disabled={action.isDisabled({
              player: currentPlayer,
              researchStations,
              players,
              infections,
            })}
            variant={type === action.type ? 'primary' : 'secondary'}
            size="small"
            onClick={() => onSelect(action.type)}
          >
            {action.label}
          </Button>
        </Tooltip>
      ))}
    </div>
  ) : null;
}

ActionTypeSelect.displayName = 'ActionTypeSelect';
