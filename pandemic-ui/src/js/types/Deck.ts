import { Card } from './Card';

export type Deck<T extends Card = Card> = Array<T>;
