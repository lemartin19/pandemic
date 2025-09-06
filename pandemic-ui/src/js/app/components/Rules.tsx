export function Rules() {
  return (
    <div className="rules-container">
      <h1>Pandemic Rules</h1>
      
      <section>
        <h2>Game Overview</h2>
        <p>
          Pandemic is a cooperative board game where players work together as disease-fighting specialists 
          to treat infections around the world and gather resources for cures. Players must work as a team 
          to succeed. The players all win or lose together.
        </p>
      </section>

      <section>
        <h2>Objective</h2>
        <p>
          Players win immediately when cures have been found for all 4 diseases. 
          The players don't actually have to eradicate all diseases, just find the cures.
        </p>
      </section>

      <section>
        <h2>Losing Conditions</h2>
        <p>The players lose if any of the following happens:</p>
        <ul>
          <li>8 outbreaks occur (outbreaks tracker reaches the skull)</li>
          <li>The player deck runs out of cards</li>
          <li>Disease cubes run out when needed for infection</li>
        </ul>
      </section>

      <section>
        <h2>Player Turn Structure</h2>
        <p>On each turn, the active player must:</p>
        <ol>
          <li><strong>Take 4 actions</strong> (may be the same action repeated)</li>
          <li><strong>Draw 2 player cards</strong> (resolve any epidemics immediately)</li>
          <li><strong>Infect cities</strong> (draw infection cards equal to the infection rate)</li>
        </ol>
      </section>

      <section>
        <h2>Player Actions</h2>
        <p>Players can choose from these 7 basic actions:</p>
        
        <h3>Movement Actions</h3>
        <ul>
          <li><strong>Drive/Ferry:</strong> Move to an adjacent city (connected by a line)</li>
          <li><strong>Direct Flight:</strong> Discard a city card to move to that city</li>
          <li><strong>Charter Flight:</strong> Discard the card matching your current city to move anywhere</li>
          <li><strong>Shuttle Flight:</strong> Move from a research station to any other research station</li>
        </ul>

        <h3>Other Actions</h3>
        <ul>
          <li><strong>Build Research Station:</strong> Discard the card matching your current city to build a research station</li>
          <li><strong>Treat Disease:</strong> Remove 1 disease cube from current city (all cubes if disease is cured)</li>
          <li><strong>Share Knowledge:</strong> Give/take a city card from another player (both must be in that city)</li>
          <li><strong>Discover Cure:</strong> At a research station, discard 5 cards of same color to cure that disease</li>
        </ul>
      </section>

      <section>
        <h2>Special Roles</h2>
        <ul>
          <li><strong>Dispatcher:</strong> Move other players or move through other players</li>
          <li><strong>Medic:</strong> Removes all cubes when treating, prevents infection in cured cities</li>
          <li><strong>Operations Expert:</strong> Build research stations without cards, fly from stations</li>
          <li><strong>Quarantine Specialist:</strong> Prevents infections in adjacent cities</li>
          <li><strong>Researcher:</strong> Can share any city card when giving cards</li>
          <li><strong>Scientist:</strong> Needs only 4 cards to cure diseases</li>
          <li><strong>Contingency Planner:</strong> Can reuse discarded event cards</li>
        </ul>
      </section>

      <section>
        <h2>Epidemic Cards</h2>
        <p>When an epidemic card is drawn:</p>
        <ol>
          <li><strong>Increase:</strong> Move the infection rate marker forward</li>
          <li><strong>Infect:</strong> Draw the bottom card from infection deck and add 3 cubes to that city</li>
          <li><strong>Intensify:</strong> Shuffle the infection discard pile and place on top of infection deck</li>
        </ol>
      </section>

      <section>
        <h2>Outbreaks</h2>
        <p>
          When a city that already has 3 cubes of a color would receive another cube of that color, 
          an outbreak occurs. Instead, place 1 cube in each adjacent city. If this would cause another 
          outbreak, chain reaction outbreaks occur. Each outbreak advances the outbreak counter.
        </p>
      </section>

      <section>
        <h2>Event Cards</h2>
        <ul>
          <li><strong>Airlift:</strong> Move any pawn to any city</li>
          <li><strong>Forecast:</strong> Look at the top 6 infection cards and rearrange</li>
          <li><strong>Government Grant:</strong> Build a research station in any city</li>
          <li><strong>One Quiet Night:</strong> Skip the next infect cities step</li>
          <li><strong>Resilient Population:</strong> Remove an infection card from the game</li>
        </ul>
      </section>

      <section>
        <h2>Hand Limit</h2>
        <p>
          Players have a hand limit of 7 cards. If a player has more than 7 cards at the end of any turn, 
          they must discard cards until they have 7.
        </p>
      </section>

      <section>
        <h2>Disease States</h2>
        <ul>
          <li><strong>Active:</strong> Disease spreads normally</li>
          <li><strong>Cured:</strong> No new cubes placed, treating removes all cubes</li>
          <li><strong>Eradicated:</strong> Cured disease with no cubes on board</li>
        </ul>
      </section>
    </div>
  );
}
