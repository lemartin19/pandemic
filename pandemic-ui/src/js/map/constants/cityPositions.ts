export const CITY_POSITIONS: Record<
  string,
  { x: number; y: number; labelPosition: 'top' | 'bottom' | 'left' | 'right' }
> = {
  // North America
  'San Francisco': { x: 19, y: 36, labelPosition: 'right' },
  Chicago: { x: 26, y: 35, labelPosition: 'bottom' },
  Montreal: { x: 30, y: 33, labelPosition: 'top' },
  'New York': { x: 31, y: 36, labelPosition: 'right' },
  Atlanta: { x: 28, y: 42, labelPosition: 'left' },
  Washington: { x: 29, y: 40, labelPosition: 'right' },
  'Los Angeles': { x: 19.5, y: 41, labelPosition: 'bottom' },
  'Mexico City': { x: 24, y: 50, labelPosition: 'bottom' },
  Miami: { x: 29, y: 46, labelPosition: 'bottom' },

  // Europe
  London: { x: 49.5, y: 29, labelPosition: 'left' },
  Madrid: { x: 48.5, y: 37, labelPosition: 'left' },
  Paris: { x: 50, y: 32, labelPosition: 'bottom' },
  Milan: { x: 52, y: 33.5, labelPosition: 'right' },
  'St Petersburg': { x: 57.5, y: 22, labelPosition: 'top' },
  Essen: { x: 52, y: 28, labelPosition: 'right' },

  // South America
  Bogota: { x: 31, y: 60, labelPosition: 'bottom' },
  Lima: { x: 30, y: 69, labelPosition: 'bottom' },
  Santiago: { x: 32, y: 78, labelPosition: 'bottom' },
  'Buenos Aires': { x: 37, y: 78, labelPosition: 'bottom' },
  'Sao Paulo': { x: 38, y: 68, labelPosition: 'bottom' },

  // Africa
  Lagos: { x: 50, y: 59, labelPosition: 'bottom' },
  Kinshasa: { x: 52.5, y: 65, labelPosition: 'bottom' },
  Johannesburg: { x: 56.5, y: 81, labelPosition: 'bottom' },
  Khartoum: { x: 55, y: 52, labelPosition: 'bottom' },
  Algiers: { x: 50, y: 40, labelPosition: 'bottom' },
  Cairo: { x: 57, y: 44, labelPosition: 'bottom' },

  // Middle East & Central Asia
  Moscow: { x: 59, y: 26, labelPosition: 'right' },
  Istanbul: { x: 57, y: 38, labelPosition: 'top' },
  Baghdad: { x: 60, y: 42, labelPosition: 'bottom' },
  Tehran: { x: 63, y: 40, labelPosition: 'right' },
  Riyadh: { x: 61, y: 48, labelPosition: 'bottom' },
  Karachi: { x: 66, y: 47, labelPosition: 'left' },
  Delhi: { x: 69, y: 47, labelPosition: 'top' },
  Kolkata: { x: 71, y: 50, labelPosition: 'top' },
  Mumbai: { x: 68, y: 52.5, labelPosition: 'left' },
  Chennai: { x: 69.5, y: 55, labelPosition: 'bottom' },

  // East Asia
  Seoul: { x: 82, y: 39.5, labelPosition: 'top' },
  Tokyo: { x: 84.5, y: 39.5, labelPosition: 'right' },
  Osaka: { x: 83, y: 41, labelPosition: 'bottom' },
  Beijing: { x: 79, y: 36.5, labelPosition: 'left' },
  Shanghai: { x: 80, y: 43, labelPosition: 'left' },
  Taipei: { x: 80, y: 48, labelPosition: 'right' },
  'Hong Kong': { x: 78, y: 49, labelPosition: 'left' },
  Manila: { x: 80, y: 53, labelPosition: 'right' },
  Bangkok: { x: 75, y: 55, labelPosition: 'left' },
  'Ho Chi Minh City': { x: 77, y: 56.5, labelPosition: 'bottom' },
  Jakarta: { x: 76, y: 65.5, labelPosition: 'bottom' },
  Sydney: { x: 87, y: 85, labelPosition: 'top' },
};
