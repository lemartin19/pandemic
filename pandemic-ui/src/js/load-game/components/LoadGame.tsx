import { ExistingGameSelect } from './ExistingGameSelect';

export function LoadGame() {
  return (
    <div className="LoadGame">
      <h2 className="LoadGame-title">Play an existing game</h2>
      <ExistingGameSelect />
    </div>
  );
}
LoadGame.displayName = 'LoadGame';
