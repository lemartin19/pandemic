export interface WaitingForPlayerAction {
  type: 'waitingForPlayerAction';
  playerName: string;
}

export interface WaitingForPlayerDraw {
  type: 'waitingForPlayerDraw';
  playerName: string;
}

export interface WaitingForPlayerDiscard {
  type: 'waitingForPlayerDiscard';
  playerName: string;
}

export type StartEpidemic = {
  type: 'startEpidemic';
};

export type IncreaseInfectionRate = {
  type: 'increaseInfectionRate';
};

export type IntensifyEpidemic = {
  type: 'intensifyEpidemic';
};

export type InfectCities = {
  type: 'infectCities';
};

export type GamePlay =
  | WaitingForPlayerAction
  | WaitingForPlayerDraw
  | WaitingForPlayerDiscard
  | StartEpidemic
  | IncreaseInfectionRate
  | IntensifyEpidemic
  | InfectCities;

export function isWaitingForPlayer(
  gamePlay: GamePlay
): gamePlay is WaitingForPlayerAction | WaitingForPlayerDraw | WaitingForPlayerDiscard {
  return (
    gamePlay.type === 'waitingForPlayerAction' ||
    gamePlay.type === 'waitingForPlayerDraw' ||
    gamePlay.type === 'waitingForPlayerDiscard'
  );
}
