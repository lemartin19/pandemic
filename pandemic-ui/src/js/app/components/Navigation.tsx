import '../../../css/Navigation.css';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link to={href} className="Navigation-link">
        {children}
      </Link>
    </li>
  );
}

export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <header>
        <h1 className="Navigation-title">Pandemic</h1>
      </header>
      <ul className="Navigation-list">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/new-game">Start New Game</NavItem>
        <NavItem href="/rules">Rules</NavItem>
        <NavItem href="/game/:id">Existing Game</NavItem>
      </ul>
    </nav>
  );
}
