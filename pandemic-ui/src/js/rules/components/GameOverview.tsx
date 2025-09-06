import { SectionHeader } from './SectionHeader';

export function GameOverview() {
  return (
    <>
      <section>
        <p>
          Pandemic is a cooperative board game where players work together as disease-fighting
          specialists to treat infections around the world and gather resources for cures. Players
          must work as a team to succeed. The players all win or lose together.
        </p>
      </section>

      <section>
        <SectionHeader>Objective</SectionHeader>
        <p>
          Players win immediately when cures have been found for all{' '}
          <strong className="text-yellow-400">4 diseases</strong>. The players don't actually have
          to eradicate all diseases, just find the cures.
        </p>
      </section>

      <section>
        <SectionHeader>Losing Conditions</SectionHeader>
        <p>The players lose if any of the following happens:</p>
        <ul className="ml-5 list-disc">
          <li>
            <strong className="text-yellow-400">8 outbreaks</strong> occur (outbreaks tracker
            reaches the skull)
          </li>
          <li>
            The <strong className="text-yellow-400">player deck runs out</strong> of cards
          </li>
          <li>
            <strong className="text-yellow-400">Disease cubes run out</strong> when needed for
            infection
          </li>
        </ul>
      </section>
    </>
  );
}
