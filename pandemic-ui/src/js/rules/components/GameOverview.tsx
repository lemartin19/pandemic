export function GameOverview() {
  return (
    <>
      <section>
        <h2>Game Overview</h2>
        <p>
          Pandemic is a cooperative board game where players work together as disease-fighting
          specialists to treat infections around the world and gather resources for cures. Players
          must work as a team to succeed. The players all win or lose together.
        </p>
      </section>

      <section>
        <h2>Objective</h2>
        <p>
          Players win immediately when cures have been found for all 4 diseases. The players don't
          actually have to eradicate all diseases, just find the cures.
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
    </>
  );
}
