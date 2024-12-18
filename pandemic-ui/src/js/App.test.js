import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pandemic', () => {
  render(<App />);
  const pandemic = screen.getByText(/Pandemic/i);
  expect(pandemic).toBeInTheDocument();
});
