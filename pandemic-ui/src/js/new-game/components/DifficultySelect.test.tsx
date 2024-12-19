import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { DifficultySelect } from './DifficultySelect';
import userEvent from '@testing-library/user-event';

describe('DifficultySelect', () => {
  function renderDifficultySelect(
    propOverrides: Partial<ComponentProps<typeof DifficultySelect>> = {}
  ) {
    return render(<DifficultySelect value={'easy'} onChange={() => {}} {...propOverrides} />);
  }

  test('renders the label and initial value', () => {
    renderDifficultySelect();
    expect(screen.getByLabelText(/difficulty/i)).toHaveValue('easy');
  });

  test('can be updated to a different value', async () => {
    const onChangeSpy = jest.fn((event) => {
      expect(event.target.value).toBe('hard');
      expect(event.target.name).toBe('difficulty');
    });
    renderDifficultySelect({ value: 'medium', onChange: onChangeSpy });
    const select = screen.getByLabelText(/difficulty/i);
    expect(select).toHaveValue('medium');
    await userEvent.selectOptions(select, 'hard');
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
});
