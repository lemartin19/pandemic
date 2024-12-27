import { useDecksDispatch, useDecksState } from '../../app/store/Decks';
import { useInfectCity } from './useInfectCity';

export function useDrawAndInfectCities() {
  const { infectionDeck } = useDecksState();
  const decksDispatch = useDecksDispatch();
  const infectCity = useInfectCity();

  return () => {
    const drawnCity = infectionDeck[0];
    decksDispatch({ type: 'infectionDraw' });
    infectCity({ location: drawnCity.name });
  };
}
