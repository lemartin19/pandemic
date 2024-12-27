import { PropsWithChildren } from 'react';
import { InfectionsProvider } from './Infections';
import { PlayerProvider } from './Players';
import { MapProvider } from './Map';
import { DecksProvider } from './Decks';
import { GamePlayQueueProvider } from './GamePlayQueue';

export function Provider({ children }: PropsWithChildren) {
  return (
    <PlayerProvider>
      <InfectionsProvider>
        <DecksProvider>
          <MapProvider>
            <GamePlayQueueProvider>{children}</GamePlayQueueProvider>
          </MapProvider>
        </DecksProvider>
      </InfectionsProvider>
    </PlayerProvider>
  );
}
