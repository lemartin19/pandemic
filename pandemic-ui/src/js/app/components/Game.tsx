import { useDecksState } from '../store/Decks';
import { useInfectionsState } from '../store/Infections';
import { usePlayerState } from '../store/Players';

export function Game() {
  const { players, currentPlayer } = usePlayerState();
  const { infections, infectionSaturation } = useInfectionsState();
  const { drawPile, infectionDeck, infectionDiscard } = useDecksState();

  return (
    <div>
      Game
      <div className="game-board">
        <div>
          <h2>Players</h2>
          {players.map((player) => (
            <div className="player-board" key={player.name}>
              <div className="player-name">{player.name}</div>
            </div>
          ))}
          <br />
          Current Player: {currentPlayer}
        </div>

        <div>
          <h2>Infections</h2>
          {Object.keys(infections).map((infectionCity) => (
            <div className="infection-board" key={infectionCity}>
              {infectionCity}: {JSON.stringify(infections[infectionCity])}
            </div>
          ))}
          <br />
          Infection Saturation: {JSON.stringify(infectionSaturation)}
        </div>

        <div>
          <h2>Decks</h2>
          Draw Pile: {JSON.stringify(drawPile)}
          <br />
          Infection Deck: {JSON.stringify(infectionDeck)}
          <br />
          Infection Discard: {JSON.stringify(infectionDiscard)}
        </div>
      </div>
    </div>
  );
}
