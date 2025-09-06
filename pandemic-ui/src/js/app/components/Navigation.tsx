import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle';

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link 
        to={href} 
        className="text-white no-underline px-4 py-2 hover:text-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
      >
        {children}
      </Link>
    </li>
  );
}

export function Navigation() {
  return (
    <nav aria-label="Main navigation" className="flex justify-between items-center p-4 box-border w-full bg-blue-600 dark:bg-gray-800 shadow-md">
      <header>
        <h1 className="m-0 text-2xl font-bold text-white">Pandemic</h1>
      </header>
      <div className="flex items-center gap-4">
        <ul className="flex list-none gap-8 m-0">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/rules">Rules</NavItem>
          <NavItem href="/new-game">Start New Game</NavItem>
          <NavItem href="/load-game">Existing Game</NavItem>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
