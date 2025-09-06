export function Diseases() {
  return (
    <>
      <section>
        <h2>Epidemics</h2>
        <p>When an epidemic card is drawn:</p>
        <ol>
          <li>
            <strong>Increase:</strong> Move the infection rate marker forward
          </li>
          <li>
            <strong>Infect:</strong> Draw the bottom card from infection deck and add 3 cubes to
            that city
          </li>
          <li>
            <strong>Intensify:</strong> Shuffle the infection discard pile and place on top of
            infection deck
          </li>
        </ol>
      </section>

      <section>
        <h2>Outbreaks</h2>
        <p>
          When a city that already has 3 cubes of a color would receive another cube of that color,
          an outbreak occurs. Instead, place 1 cube in each adjacent city. If this would cause
          another outbreak, chain reaction outbreaks occur. Each outbreak advances the outbreak
          counter.
        </p>
      </section>

      <section>
        <h2>Disease States</h2>
        <ul>
          <li>
            <strong>Active:</strong> Disease spreads normally
          </li>
          <li>
            <strong>Cured:</strong> No new cubes placed, treating removes all cubes
          </li>
          <li>
            <strong>Eradicated:</strong> Cured disease with no cubes on board
          </li>
        </ul>
      </section>
    </>
  );
}
