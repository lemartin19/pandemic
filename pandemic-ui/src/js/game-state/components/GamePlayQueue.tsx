import { PropsWithChildren } from 'react';
import { useGamePlayQueueState } from '../../app/store/GamePlayQueue';
import { usePlayer } from '../../app/store/Players';
import { GamePlay } from '../../types/GamePlay';
import { calculateFontColor } from '../../utils/calculateFontColor';
import { QUEUE_PREVIEW_LENGTH } from '../constants/queuePreviewLength';

function StyledPlayerColor({ children, playerName }: PropsWithChildren<{ playerName: string }>) {
  const player = usePlayer(playerName);
  const playerColor = player?.color;
  if (!playerColor) {
    return <span>{playerName}</span>;
  }
  return (
    <span
      style={{ backgroundColor: playerColor, color: calculateFontColor(playerColor) }}
      className="px-2 py-1 rounded text-sm"
    >
      {children}
    </span>
  );
}
StyledPlayerColor.displayName = 'StyledPlayerColor';

function GamePlayQueueItem({ gamePlay }: { gamePlay: GamePlay }) {
  switch (gamePlay.type) {
    case 'waitingForPlayerAction':
      return (
        <StyledPlayerColor playerName={gamePlay.playerName}>
          {gamePlay.playerName}: Action
        </StyledPlayerColor>
      );
    case 'waitingForPlayerDraw':
      return (
        <StyledPlayerColor playerName={gamePlay.playerName}>
          {gamePlay.playerName}: Draw
        </StyledPlayerColor>
      );
    case 'waitingForPlayerDiscard':
      return (
        <StyledPlayerColor playerName={gamePlay.playerName}>
          {gamePlay.playerName}: Discard
        </StyledPlayerColor>
      );
    case 'startEpidemic':
      return <>Epidemic</>;
    case 'increaseInfectionRate':
      return <>Increase Infection Rate</>;
    case 'infectCities':
      return <>Infect Cities</>;
    default:
      return <>{gamePlay.type}</>;
  }
}

export function GamePlayQueue() {
  const { queue } = useGamePlayQueueState();
  const nextItems = queue.slice(1, QUEUE_PREVIEW_LENGTH + 1);

  return (
    <ul className="flex items-center gap-2 list-none">
      {nextItems.map((item: GamePlay, index: number) => (
        <li className="text-sm" key={index}>
          <GamePlayQueueItem gamePlay={item} />
        </li>
      ))}
    </ul>
  );
}

GamePlayQueue.displayName = 'GamePlayQueue';
