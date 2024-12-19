import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { PlayersSelect } from './PlayersSelect';
import userEvent from '@testing-library/user-event';

describe('PlayersSelect', () => {
  function renderPlayersSelect(propOverrides: Partial<ComponentProps<typeof PlayersSelect>> = {}) {
    return render(<PlayersSelect value={2} onChange={() => {}} {...propOverrides} />);
  }

  test('renders the label and initial value', () => {
    renderPlayersSelect();
    expect(screen.getByLabelText(/players/i)).toHaveValue('2');
  });

  test('can be updated to a different value', async () => {
    const onChangeSpy = jest.fn((event) => {
      expect(event.target.value).toBe('4');
      expect(event.target.name).toBe('numberOfPlayers');
    });
    renderPlayersSelect({ value: 3, onChange: onChangeSpy });
    const select = screen.getByLabelText(/players/i);
    expect(select).toHaveValue('3');
    await userEvent.selectOptions(select, '4');
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
});
