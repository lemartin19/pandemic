import { useDecksDispatch, useDecksState } from '../../app/store/Decks';
import { useInfectionsState } from '../../app/store/Infections';
import { useInfectCity } from './useInfectCity';

export function useDrawAndInfectCities() {
  const { infectionRates } = useInfectionsState();
  const infectionRate = infectionRates[0];
  const { infectionDeck } = useDecksState();
  const decksDispatch = useDecksDispatch();
  const infectCity = useInfectCity();

  return () => {
    const drawnCities = infectionDeck.slice(0, infectionRate);
    decksDispatch({ type: 'infectionDraw', count: infectionRate });
    for (const city of drawnCities) {
      infectCity({ location: city.name });
    }
  };
}
