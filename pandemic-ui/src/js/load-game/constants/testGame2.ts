import { BASIC_EVENT_CARDS } from '../../new-game/constants/basicCards';
import { BASIC_ROLES } from '../../new-game/constants/basicRoles';
import { SavedGame } from '../types/SavedGame';

export const TEST_GAME_2: SavedGame = {
  name: 'Test Game 2',
  players: [
    {
      name: 'Player 1',
      color: '#a398df',
      hand: [
        {
          type: 'city',
          name: 'Cairo',
          color: 'black',
        },
        {
          type: 'city',
          name: 'Washington',
          color: 'blue',
        },
        {
          type: 'city',
          name: 'Beijing',
          color: 'red',
        },
        BASIC_EVENT_CARDS.find((card) => card.name === 'One Quiet Night')!,
      ],
      currentLocation: 'Atlanta',
      role: BASIC_ROLES.find((role) => role.name === 'Medic')!,
    },
    {
      name: 'Player 2',
      color: '#e33946',
      hand: [
        {
          type: 'city',
          name: 'Delhi',
          color: 'black',
        },
        {
          type: 'city',
          name: 'Bangkok',
          color: 'red',
        },
        {
          type: 'city',
          name: 'Istanbul',
          color: 'black',
        },
        {
          type: 'city',
          name: 'Kolkata',
          color: 'black',
        },
      ],
      currentLocation: 'Atlanta',
      role: BASIC_ROLES.find((role) => role.name === 'Scientist')!,
    },
  ],
  infections: {
    infections: {
      'San Francisco': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Chicago: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Montreal: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'New York': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Atlanta: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Washington: {
        red: 0,
        blue: 2,
        yellow: 0,
        black: 0,
      },
      London: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Madrid: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Paris: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Milan: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'St Petersburg': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Essen: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'Los Angeles': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'Mexico City': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Miami: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Bogota: {
        red: 0,
        blue: 0,
        yellow: 3,
        black: 0,
      },
      Lima: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Santiago: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'Buenos Aires': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'Sao Paulo': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Lagos: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Kinshasa: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Johannesburg: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Khartoum: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Moscow: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Istanbul: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Baghdad: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Tehran: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Algiers: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Cairo: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 3,
      },
      Riyadh: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 1,
      },
      Karachi: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Delhi: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 1,
      },
      Kolkata: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Mumbai: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 2,
      },
      Chennai: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 3,
      },
      Seoul: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Tokyo: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Osaka: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Beijing: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Shanghai: {
        red: 2,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Taipei: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'Hong Kong': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Manila: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Bangkok: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      'Ho Chi Minh City': {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Jakarta: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0,
      },
      Sydney: {
        red: 1,
        blue: 0,
        yellow: 0,
        black: 0,
      },
    },
    infectionSaturation: {
      red: 18,
      blue: 18,
      yellow: 18,
      black: 18,
    },
    infectionRates: [2, 2, 2, 3, 3, 4, 4],
    outbreaksLeft: 8,
    cured: {
      blue: false,
      yellow: false,
      black: false,
      red: false,
    },
    eradicated: {
      blue: false,
      yellow: false,
      black: false,
      red: false,
    },
  },
  decks: {
    infectionDiscard: [
      {
        type: 'city',
        name: 'Bogota',
        color: 'yellow',
      },
      {
        type: 'city',
        name: 'Cairo',
        color: 'black',
      },
      {
        type: 'city',
        name: 'Chennai',
        color: 'black',
      },
      {
        type: 'city',
        name: 'Mumbai',
        color: 'black',
      },
      {
        type: 'city',
        name: 'Shanghai',
        color: 'red',
      },
      {
        type: 'city',
        name: 'Washington',
        color: 'blue',
      },
      {
        type: 'city',
        name: 'Riyadh',
        color: 'black',
      },
      {
        type: 'city',
        name: 'Delhi',
        color: 'black',
      },
      {
        type: 'city',
        name: 'Sydney',
        color: 'red',
      },
    ],
    infectionDeck: [
      {
        type: 'city',
        name: 'Mumbai',
        color: 'black',
      },
    ],
    drawPile: [
      {
        type: 'epidemic',
      },
    ],
    discardPile: [],
  },
  map: {
    map: [
      {
        name: 'San Francisco',
        color: 'blue',
        connectedCities: ['Chicago', 'Los Angeles', 'Tokyo', 'Manila'],
      },
      {
        name: 'Chicago',
        color: 'blue',
        connectedCities: ['San Francisco', 'Atlanta', 'Montreal', 'Los Angeles'],
      },
      {
        name: 'Montreal',
        color: 'blue',
        connectedCities: ['Chicago', 'New York', 'Washington'],
      },
      {
        name: 'New York',
        color: 'blue',
        connectedCities: ['Montreal', 'London', 'Madrid', 'Washington'],
      },
      {
        name: 'Atlanta',
        color: 'blue',
        connectedCities: ['Chicago', 'Washington', 'Miami'],
      },
      {
        name: 'Washington',
        color: 'blue',
        connectedCities: ['Atlanta', 'New York', 'Montreal', 'Miami'],
      },
      {
        name: 'London',
        color: 'blue',
        connectedCities: ['New York', 'Madrid', 'Paris', 'Essen'],
      },
      {
        name: 'Madrid',
        color: 'blue',
        connectedCities: ['New York', 'London', 'Paris', 'Sao Paulo', 'Algiers'],
      },
      {
        name: 'Paris',
        color: 'blue',
        connectedCities: ['London', 'Madrid', 'Milan', 'Essen', 'Algiers'],
      },
      {
        name: 'Milan',
        color: 'blue',
        connectedCities: ['Paris', 'Essen', 'Istanbul'],
      },
      {
        name: 'St Petersburg',
        color: 'blue',
        connectedCities: ['Essen', 'Moscow', 'Istanbul'],
      },
      {
        name: 'Essen',
        color: 'blue',
        connectedCities: ['London', 'Paris', 'Milan', 'St Petersburg'],
      },
      {
        name: 'Los Angeles',
        color: 'yellow',
        connectedCities: ['San Francisco', 'Mexico City', 'Sydney', 'Chicago'],
      },
      {
        name: 'Mexico City',
        color: 'yellow',
        connectedCities: ['Los Angeles', 'Miami', 'Bogota', 'Lima'],
      },
      {
        name: 'Miami',
        color: 'yellow',
        connectedCities: ['Atlanta', 'Washington', 'Mexico City', 'Bogota'],
      },
      {
        name: 'Bogota',
        color: 'yellow',
        connectedCities: ['Miami', 'Mexico City', 'Lima', 'Sao Paulo', 'Buenos Aires'],
      },
      {
        name: 'Lima',
        color: 'yellow',
        connectedCities: ['Mexico City', 'Bogota', 'Santiago'],
      },
      {
        name: 'Santiago',
        color: 'yellow',
        connectedCities: ['Lima'],
      },
      {
        name: 'Buenos Aires',
        color: 'yellow',
        connectedCities: ['Bogota', 'Sao Paulo'],
      },
      {
        name: 'Sao Paulo',
        color: 'yellow',
        connectedCities: ['Madrid', 'Lagos', 'Bogota', 'Buenos Aires'],
      },
      {
        name: 'Lagos',
        color: 'yellow',
        connectedCities: ['Sao Paulo', 'Khartoum', 'Kinshasa'],
      },
      {
        name: 'Kinshasa',
        color: 'yellow',
        connectedCities: ['Lagos', 'Khartoum', 'Johannesburg'],
      },
      {
        name: 'Johannesburg',
        color: 'yellow',
        connectedCities: ['Kinshasa', 'Khartoum'],
      },
      {
        name: 'Khartoum',
        color: 'yellow',
        connectedCities: ['Cairo', 'Lagos', 'Kinshasa', 'Johannesburg'],
      },
      {
        name: 'Moscow',
        color: 'black',
        connectedCities: ['St Petersburg', 'Istanbul', 'Tehran'],
      },
      {
        name: 'Istanbul',
        color: 'black',
        connectedCities: ['Milan', 'St Petersburg', 'Moscow', 'Baghdad', 'Cairo', 'Algiers'],
      },
      {
        name: 'Baghdad',
        color: 'black',
        connectedCities: ['Istanbul', 'Tehran', 'Karachi', 'Riyadh', 'Cairo'],
      },
      {
        name: 'Tehran',
        color: 'black',
        connectedCities: ['Moscow', 'Baghdad', 'Karachi', 'Delhi'],
      },
      {
        name: 'Algiers',
        color: 'black',
        connectedCities: ['Madrid', 'Paris', 'Istanbul', 'Cairo'],
      },
      {
        name: 'Cairo',
        color: 'black',
        connectedCities: ['Algiers', 'Istanbul', 'Baghdad', 'Riyadh', 'Khartoum'],
      },
      {
        name: 'Riyadh',
        color: 'black',
        connectedCities: ['Cairo', 'Baghdad', 'Karachi'],
      },
      {
        name: 'Karachi',
        color: 'black',
        connectedCities: ['Baghdad', 'Tehran', 'Delhi', 'Mumbai', 'Riyadh'],
      },
      {
        name: 'Delhi',
        color: 'black',
        connectedCities: ['Tehran', 'Karachi', 'Mumbai', 'Chennai', 'Kolkata'],
      },
      {
        name: 'Kolkata',
        color: 'black',
        connectedCities: ['Delhi', 'Chennai', 'Bangkok', 'Hong Kong'],
      },
      {
        name: 'Mumbai',
        color: 'black',
        connectedCities: ['Karachi', 'Delhi', 'Chennai'],
      },
      {
        name: 'Chennai',
        color: 'black',
        connectedCities: ['Mumbai', 'Delhi', 'Kolkata', 'Bangkok', 'Jakarta'],
      },
      {
        name: 'Seoul',
        color: 'red',
        connectedCities: ['Beijing', 'Shanghai', 'Tokyo'],
      },
      {
        name: 'Tokyo',
        color: 'red',
        connectedCities: ['Seoul', 'Shanghai', 'San Francisco', 'Osaka'],
      },
      {
        name: 'Osaka',
        color: 'red',
        connectedCities: ['Tokyo', 'Taipei', 'Shanghai'],
      },
      {
        name: 'Beijing',
        color: 'red',
        connectedCities: ['Seoul', 'Shanghai'],
      },
      {
        name: 'Shanghai',
        color: 'red',
        connectedCities: ['Beijing', 'Seoul', 'Tokyo', 'Taipei', 'Hong Kong'],
      },
      {
        name: 'Taipei',
        color: 'red',
        connectedCities: ['Shanghai', 'Hong Kong', 'Manila', 'Osaka'],
      },
      {
        name: 'Hong Kong',
        color: 'red',
        connectedCities: ['Shanghai', 'Taipei', 'Manila', 'Ho Chi Minh City', 'Bangkok', 'Kolkata'],
      },
      {
        name: 'Manila',
        color: 'red',
        connectedCities: ['Taipei', 'Hong Kong', 'Ho Chi Minh City', 'San Francisco', 'Sydney'],
      },
      {
        name: 'Bangkok',
        color: 'red',
        connectedCities: ['Chennai', 'Kolkata', 'Hong Kong', 'Ho Chi Minh City', 'Jakarta'],
      },
      {
        name: 'Ho Chi Minh City',
        color: 'red',
        connectedCities: ['Bangkok', 'Hong Kong', 'Manila', 'Jakarta'],
      },
      {
        name: 'Jakarta',
        color: 'red',
        connectedCities: ['Chennai', 'Bangkok', 'Ho Chi Minh City', 'Sydney'],
      },
      {
        name: 'Sydney',
        color: 'red',
        connectedCities: ['Jakarta', 'Manila', 'Los Angeles'],
      },
    ],
    researchStations: ['Atlanta'],
  },
  gamePlayQueue: [
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 1',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 1',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 1',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 1',
    },
    {
      type: 'waitingForPlayerDraw',
      playerName: 'Player 1',
    },
    {
      type: 'waitingForPlayerDraw',
      playerName: 'Player 1',
    },
    {
      type: 'infectCities',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 2',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 2',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 2',
    },
    {
      type: 'waitingForPlayerAction',
      playerName: 'Player 2',
    },
    {
      type: 'waitingForPlayerDraw',
      playerName: 'Player 2',
    },
    {
      type: 'waitingForPlayerDraw',
      playerName: 'Player 2',
    },
    {
      type: 'infectCities',
    },
  ],
};
