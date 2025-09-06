export function Players() {
  return (
    <>
      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Hand Limit</h2>
        <p className="leading-relaxed mb-4">
          Players have a hand limit of <strong className="text-yellow-400">7 cards</strong>. If a player has more than 7 cards at the end of any
          turn, they must discard cards until they have 7.
        </p>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Turn Structure</h2>
        <p className="leading-relaxed mb-4">On each turn, the active player must:</p>
        <ol className="ml-5 mb-4 list-decimal">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Take 4 actions</strong> (may be the same action repeated)
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Draw 2 player cards</strong> (resolve any epidemics immediately)
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Infect cities</strong> (draw infection cards equal to the infection rate)
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Player Actions</h2>
        <p className="leading-relaxed mb-4">Players can choose from these 7 basic actions:</p>

        <h3 className="text-gray-400 mt-5 mb-3 text-lg">Movement Actions</h3>
        <ul className="ml-5 mb-4 list-disc">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Drive/Ferry:</strong> Move to an adjacent city (connected by a line)
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Direct Flight:</strong> Discard a city card to move to that city
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Charter Flight:</strong> Discard the card matching your current city to move
            anywhere
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Shuttle Flight:</strong> Move from a research station to any other research
            station
          </li>
        </ul>

        <h3 className="text-gray-400 mt-5 mb-3 text-lg">Other Actions</h3>
        <ul className="ml-5 mb-4 list-disc">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Build Research Station:</strong> Discard the card matching your current city to
            build a research station
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Treat Disease:</strong> Remove 1 disease cube from current city (all cubes if
            disease is cured)
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Share Knowledge:</strong> Give/take a city card from another player (both must
            be in that city)
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Discover Cure:</strong> At a research station, discard 5 cards of same color to
            cure that disease
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Event Cards</h2>
        <ul className="ml-5 mb-4 list-disc">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Airlift:</strong> Move any pawn to any city
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Forecast:</strong> Look at the top 6 infection cards and rearrange
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Government Grant:</strong> Build a research station in any city
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">One Quiet Night:</strong> Skip the next infect cities step
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Resilient Population:</strong> Remove an infection card from the game
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Roles</h2>
        <ul className="ml-5 mb-4 list-disc">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Dispatcher:</strong> Move other players or move through other players
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Medic:</strong> Removes all cubes when treating, prevents infection in cured
            cities
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Operations Expert:</strong> Build research stations without cards, fly from
            stations
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Quarantine Specialist:</strong> Prevents infections in adjacent cities
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Researcher:</strong> Can share any city card when giving cards
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Scientist:</strong> Needs only 4 cards to cure diseases
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Contingency Planner:</strong> Can reuse discarded event cards
          </li>
        </ul>
      </section>
    </>
  );
}
