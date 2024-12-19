import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { InitialSetup } from './InitialSetup';
import userEvent from '@testing-library/user-event';

describe('InitialSetup', () => {
  function renderInitialSetup(propOverrides: Partial<ComponentProps<typeof InitialSetup>> = {}) {
    return render(<InitialSetup onSubmit={() => {}} {...propOverrides} />);
  }

  test('renders the player and difficulty select', () => {
    renderInitialSetup();
    expect(screen.getByLabelText(/players/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
  });

  test('calls onSubmit when the setup players button is clicked', async () => {
    const onSubmit = jest.fn();
    renderInitialSetup({ onSubmit });
    await userEvent.click(screen.getByRole('button', { name: /setup players/i }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
