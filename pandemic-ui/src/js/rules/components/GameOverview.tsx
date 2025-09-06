export function GameOverview() {
  return (
    <>
      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Game Overview</h2>
        <p className="leading-relaxed mb-4">
          Pandemic is a cooperative board game where players work together as disease-fighting
          specialists to treat infections around the world and gather resources for cures. Players
          must work as a team to succeed. The players all win or lose together.
        </p>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Objective</h2>
        <p className="leading-relaxed mb-4">
          Players win immediately when cures have been found for all <strong className="text-yellow-400">4 diseases</strong>. The players don't
          actually have to eradicate all diseases, just find the cures.
        </p>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Losing Conditions</h2>
        <p className="leading-relaxed mb-4">The players lose if any of the following happens:</p>
        <ul className="ml-5 mb-4 list-disc">
          <li className="mb-2 leading-relaxed"><strong className="text-yellow-400">8 outbreaks</strong> occur (outbreaks tracker reaches the skull)</li>
          <li className="mb-2 leading-relaxed">The <strong className="text-yellow-400">player deck runs out</strong> of cards</li>
          <li className="mb-2 leading-relaxed"><strong className="text-yellow-400">Disease cubes run out</strong> when needed for infection</li>
        </ul>
      </section>
    </>
  );
}
