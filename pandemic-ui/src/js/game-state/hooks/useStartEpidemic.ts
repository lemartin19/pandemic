import { useDecksDispatch, useDecksState } from '../../app/store/Decks';
import { useInfectCity } from './useInfectCity';

export function useStartEpidemic() {
  const decksDispatch = useDecksDispatch();
  const infectCity = useInfectCity();
  const { infectionDeck } = useDecksState();
  const bottomInfectionCard = infectionDeck[infectionDeck.length - 1];

  return () => {
    decksDispatch({ type: 'infectionDraw', fromBottom: true });
    infectCity({ location: bottomInfectionCard.name, isEpidemic: true });
  };
}
