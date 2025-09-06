export function Diseases() {
  return (
    <>
      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Epidemics</h2>
        <p className="leading-relaxed mb-4">When an epidemic card is drawn:</p>
        <ol className="ml-5 mb-4 list-decimal">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Increase:</strong> Move the infection rate marker forward
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Infect:</strong> Draw the bottom card from infection deck and add 3 cubes to
            that city
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Intensify:</strong> Shuffle the infection discard pile and place on top of
            infection deck
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Outbreaks</h2>
        <p className="leading-relaxed mb-4">
          When a city that already has <strong className="text-yellow-400">3 cubes</strong> of a color would receive another cube of that color,
          an <strong className="text-yellow-400">outbreak</strong> occurs. Instead, place 1 cube in each adjacent city. If this would cause
          another outbreak, chain reaction outbreaks occur. Each outbreak advances the outbreak
          counter.
        </p>
      </section>

      <section>
        <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">Disease States</h2>
        <ul className="ml-5 mb-4 list-disc">
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Active:</strong> Disease spreads normally
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Cured:</strong> No new cubes placed, treating removes all cubes
          </li>
          <li className="mb-2 leading-relaxed">
            <strong className="text-yellow-400">Eradicated:</strong> Cured disease with no cubes on board
          </li>
        </ul>
      </section>
    </>
  );
}
