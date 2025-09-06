import { ExistingGameSelect } from './ExistingGameSelect';

export function LoadGame() {
  return (
    <div className="max-w-md mx-auto mt-8 p-8 rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-6">Play an existing game</h2>
      <ExistingGameSelect />
    </div>
  );
}
LoadGame.displayName = 'LoadGame';
