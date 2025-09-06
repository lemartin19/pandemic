import { SectionHeader } from './SectionHeader';

export function Diseases() {
  return (
    <>
      <section>
        <SectionHeader>Epidemics</SectionHeader>
        <p>When an epidemic card is drawn:</p>
        <ol className="ml-5 list-decimal">
          <li>
            <strong className="text-yellow-400">Increase:</strong> Move the infection rate marker
            forward
          </li>
          <li>
            <strong className="text-yellow-400">Infect:</strong> Draw the bottom card from infection
            deck and add 3 cubes to that city
          </li>
          <li>
            <strong className="text-yellow-400">Intensify:</strong> Shuffle the infection discard
            pile and place on top of infection deck
          </li>
        </ol>
      </section>

      <section>
        <SectionHeader>Outbreaks</SectionHeader>
        <p>
          When a city that already has <strong className="text-yellow-400">3 cubes</strong> of a
          color would receive another cube of that color, an{' '}
          <strong className="text-yellow-400">outbreak</strong> occurs. Instead, place 1 cube in
          each adjacent city. If this would cause another outbreak, chain reaction outbreaks occur.
          Each outbreak advances the outbreak counter.
        </p>
      </section>

      <section>
        <SectionHeader>Disease States</SectionHeader>
        <ul className="ml-5 list-disc">
          <li>
            <strong className="text-yellow-400">Active:</strong> Disease spreads normally
          </li>
          <li>
            <strong className="text-yellow-400">Cured:</strong> No new cubes placed, treating
            removes all cubes
          </li>
          <li>
            <strong className="text-yellow-400">Eradicated:</strong> Cured disease with no cubes on
            board
          </li>
        </ul>
      </section>
    </>
  );
}
