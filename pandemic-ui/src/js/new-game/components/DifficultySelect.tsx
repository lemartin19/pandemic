import { ChangeEvent } from 'react';

export function DifficultySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (__event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="DifficultySelect">
      <label htmlFor="difficulty">Difficulty</label>
      <select id="difficulty" name="difficulty" value={value} onChange={onChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}
DifficultySelect.displayName = 'DifficultySelect';
