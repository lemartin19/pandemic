import { ChangeEvent } from 'react';

export function DifficultySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (__event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="difficulty" className="font-bold">
        Difficulty
      </label>
      <select
        id="difficulty"
        name="difficulty"
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded text-base"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
DifficultySelect.displayName = 'DifficultySelect';
