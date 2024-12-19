import { render, screen } from '@testing-library/react';
import { Home } from './Home';

describe('Home', () => {
  test('renders the heading', () => {
    render(<Home />);
    expect(
      screen.getByRole('heading', { name: /welcome to the pandemic boardgame/i })
    ).toBeInTheDocument();
  });

  test('renders a link to the github', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/lemartin19/pandemic'
    );
  });
});
