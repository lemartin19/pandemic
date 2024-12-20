import { CityCard } from '../../types/Card';
import { Deck } from '../../types/Deck';
import { Infections, InfectionSaturation } from '../../types/Infections';
import { Map } from '../../types/Map';

/**
 * Infects a city with a given color and count
 * @param card - The city card to infect
 * @param infections - The infections object to update
 * @param count - The number of infections to infect
 * @mutates the infections to set infections to the given count
 */
function infectCity(card: CityCard, infections: Infections, count: number): void {
  infections[card.name][card.color] = count;
}

/**
 * Calculates the initial infection saturation
 * @returns The initial infection saturation
 *
 * There are initially 6 disease cubes of each color placed on the map.
 * And 24 disease cubes included in the game for each color.
 */
function calculateInitialInfectionSaturation(): InfectionSaturation {
  return {
    red: 18,
    blue: 18,
    yellow: 18,
    black: 18,
  };
}

/**
 * Creates the initial infections
 * @param cities - The cities on the map
 * @param infectionDeck - The infection deck
 * @mutates the infectionDeck to remove the cards that are initially infected
 * @returns The initial infections
 */
export function createInitialInfections(
  cities: Map,
  infectionDeck: Deck<CityCard>
): {
  infections: Infections;
  infectionSaturation: InfectionSaturation;
  infectionDiscard: Deck<CityCard>;
} {
  const infections: Infections = cities.reduce<Infections>((acc, city) => {
    acc[city.name] = {
      red: 0,
      blue: 0,
      yellow: 0,
      black: 0,
    };
    return acc;
  }, {});

  const infectionDiscard = [];

  for (let i = 3; i >= 1; i--) {
    const nextInfections = infectionDeck.splice(0, 2);
    nextInfections.forEach((card) => {
      infectCity(card, infections, i);
    });
    infectionDiscard.push(...nextInfections);
  }

  return {
    infections,
    infectionDiscard,
    infectionSaturation: calculateInitialInfectionSaturation(),
  };
}
