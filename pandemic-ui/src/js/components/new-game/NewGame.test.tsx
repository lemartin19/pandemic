import { render, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { NewGame } from './NewGame';

describe('NewGame', () => {
  function renderNewGame(propOverrides: Partial<ComponentProps<typeof NewGame>> = {}) {
    return render(<NewGame {...propOverrides} />);
  }

  test('renders the player and difficulty select', () => {
    renderNewGame();
    expect(screen.getByLabelText(/players/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
  });

  test('renders the start button', () => {
    renderNewGame();
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });
});
