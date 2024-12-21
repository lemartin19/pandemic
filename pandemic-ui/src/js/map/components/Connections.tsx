import { useState } from 'react';
import { City } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';

function Connection({
  from,
  to,
  size,
  color,
}: {
  from: string;
  to: string;
  size: { width: number; height: number };
  color: string;
}) {
  const fromPosition = CITY_POSITIONS[from as keyof typeof CITY_POSITIONS];
  const toPosition = CITY_POSITIONS[to as keyof typeof CITY_POSITIONS];
  const x1 = (fromPosition.x / 100) * size.width;
  const y1 = (fromPosition.y / 100) * size.height;
  const x2 = (toPosition.x / 100) * size.width;
  const y2 = (toPosition.y / 100) * size.height;
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2} />;
}

export function Connections({ city, highlight }: { city: City; highlight: boolean }) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const { connectedCities } = city;

  return (
    <svg
      className="Connections"
      style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
      ref={(el) => {
        if (el) {
          const newSize = {
            width: el.width.baseVal.value,
            height: el.height.baseVal.value,
          };
          if (!size || size.width !== newSize.width || size.height !== newSize.height) {
            setSize(newSize);
          }
        }
      }}
    >
      {size
        ? connectedCities.map((toCity) => (
            <Connection
              key={`${city.name}-${toCity}`}
              from={city.name}
              to={toCity}
              size={size}
              color={highlight ? '#ffffff' : '#2255aa'}
            />
          ))
        : null}
    </svg>
  );
}
Connections.displayName = 'Connections';
