import { PropsWithChildren } from 'react';
import { InfectionsProvider } from './Infections';
import { PlayerProvider } from './Players';
import { MapProvider } from './Map';
import { DecksProvider } from './Decks';
import { GamePlayQueueProvider } from './GamePlayQueue';

export function Provider({ children }: PropsWithChildren<{}>) {
  return (
    <GamePlayQueueProvider>
      <PlayerProvider>
        <InfectionsProvider>
          <DecksProvider>
            <MapProvider>{children}</MapProvider>
          </DecksProvider>
        </InfectionsProvider>
      </PlayerProvider>
    </GamePlayQueueProvider>
  );
}
