import { PropsWithChildren } from 'react';
import { useGamePlayQueueState } from '../../app/store/GamePlayQueue';
import { usePlayer } from '../../app/store/Players';
import { GamePlay } from '../../types/GamePlay';
import { calculateFontColor } from '../../utils/calculateFontColor';

function StyledPlayerColor({ children, playerName }: PropsWithChildren<{ playerName: string }>) {
  const player = usePlayer(playerName);
  const playerColor = player?.color;
  if (!playerColor) {
    return <span>{playerName}</span>;
  }
  return (
    <span
      style={{ backgroundColor: playerColor, color: calculateFontColor(playerColor) }}
      className="GamePlayQueue-playerItem"
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
  const nextItems = queue.slice(1, 4);

  return (
    <div className="GamePlayQueue">
      <ul className="GamePlayQueue-list">
        {nextItems.map((item: GamePlay, index: number) => (
          <li className="GamePlayQueue-item" key={index}>
            <GamePlayQueueItem gamePlay={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

GamePlayQueue.displayName = 'GamePlayQueue';
