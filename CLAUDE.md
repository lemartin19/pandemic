# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a digital implementation of the Pandemic board game consisting of two main components:
- **pandemic-server**: Express.js/TypeScript backend service for game logic
- **pandemic-ui**: React 19 frontend application for game interface

The project implements the full Pandemic game mechanics including player actions, disease management, epidemic handling, and game state progression through a command pattern architecture.

## Development Commands

### Root Level Commands
- `npm run lint` - Lint both server and UI TypeScript/React code
- `npm run lint:fix` - Auto-fix linting issues across the codebase
- `npm run format` - Format all code with Prettier

### Server (pandemic-server/)
- `npm run dev` - Start development server with hot reload using ts-node-dev
- `npm run build` - Compile TypeScript to dist/
- `npm start` - Run compiled server from dist/
- `npm test` - Run Jasmine test suite
- `npm run lint` - Lint server code only

### UI (pandemic-ui/)
- `npm start` - Start React development server
- `npm run build` - Build production React bundle
- `npm test` - Run React Testing Library tests with Jest
- `npm run eject` - Eject from Create React App

## Architecture Overview

### Backend Architecture
The backend follows a domain-driven design with clear separation of concerns:

- **Game Logic**: Core game state managed by the `Game` class which orchestrates all game mechanics
- **Command Pattern**: Actions are implemented as executable commands (Move, Treat, Cure, etc.) that modify game state
- **Entity Models**: Strongly-typed entities (Player, City, Disease, Card) with business logic encapsulation
- **Gameplay State Machine**: Queue-based system using `GameplayState` classes to manage turn progression and game phases

Key architectural patterns:
- Actions extend a base `Action` class with `execute()` method for consistent game state modification
- Deck management through specialized classes (DrawPile, InfectionDeck, PlayerHand)
- Location and disease modeling with proper relationships and constraints

### Frontend Architecture  
The React frontend uses a provider-based state management system:

- **Context Providers**: Nested providers for different game aspects (Players, Infections, Decks, Map, GamePlayQueue)
- **Component Organization**: Feature-based folder structure (actions/, game-state/, players/, map/, etc.)
- **React Router**: Client-side routing for game phases (home, new-game, load-game, game)
- **Testing Strategy**: React Testing Library with user-event for interaction testing

State management hierarchy:
```
Provider (root)
├── PlayerProvider
├── InfectionsProvider  
├── DecksProvider
├── MapProvider
└── GamePlayQueueProvider
```

## Code Quality Standards

### ESLint Configuration
The project uses strict ESLint rules configured in `eslint.config.js`:
- No console/debugger statements in production code
- Strict equality (`===`) enforcement
- TypeScript unused variables detection
- React best practices enforcement
- Separate configurations for UI (with React rules) and server (Node.js environment)

### Testing Approach
- **Backend**: Jasmine test framework
- **Frontend**: React Testing Library with Jest
- Test files use `.test.{js,jsx,ts,tsx}` extension
- Focus on user behavior testing rather than implementation details

## Development Workflow

1. **Code Changes**: Make changes in appropriate `src/js/` directory
2. **Linting**: Run `npm run lint` from root to check both projects
3. **Formatting**: Run `npm run format` to apply Prettier formatting
4. **Testing**: Run tests in specific project directory
5. **Build Verification**: Run build commands to ensure TypeScript compilation

## Game Domain Knowledge

The codebase models the complete Pandemic board game including:
- **Disease System**: Four diseases with infection, treatment, cure, and eradication states
- **Player Roles**: Different roles with unique abilities (Medic, Scientist, Dispatcher, etc.)
- **Action System**: Seven basic actions plus role-specific and event card actions
- **Epidemic Mechanics**: Infection rate increases and deck intensification
- **Win/Lose Conditions**: Disease eradication vs. outbreak/deck depletion

Understanding the game rules is essential for meaningful contributions to game logic or UI interactions.