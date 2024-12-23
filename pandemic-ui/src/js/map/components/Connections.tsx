import { useState } from 'react';
import { City } from '../../types/Map';
import { CITY_POSITIONS } from '../constants/cityPositions';

export function isAcrossPacific(from: string, to: string) {
  const isBetweenLosAngelesAndSydney =
    (from === 'Los Angeles' && to === 'Sydney') || (from === 'Sydney' && to === 'Los Angeles');
  const isBetweenSanFranciscoAndManila =
    (from === 'San Francisco' && to === 'Manila') || (from === 'Manila' && to === 'San Francisco');
  const isBetweenSanFranciscoAndTokyo =
    (from === 'San Francisco' && to === 'Tokyo') || (from === 'Tokyo' && to === 'San Francisco');
  return (
    isBetweenLosAngelesAndSydney || isBetweenSanFranciscoAndManila || isBetweenSanFranciscoAndTokyo
  );
}

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
  const fromX = (fromPosition.x / 100) * size.width;
  const fromY = (fromPosition.y / 100) * size.height;
  const toX = (toPosition.x / 100) * size.width;
  const toY = (toPosition.y / 100) * size.height;

  if (isAcrossPacific(from, to)) {
    const leftCity = fromX < toX ? { x: fromX, y: fromY } : { x: toX, y: toY };
    const rightCity = fromX < toX ? { x: toX, y: toY } : { x: fromX, y: fromY };
    const slope = (rightCity.y - leftCity.y) / (rightCity.x - leftCity.x);
    const midY = leftCity.y + slope * leftCity.x;
    return (
      <>
        <line x1={0} y1={midY} x2={leftCity.x} y2={leftCity.y} stroke={color} strokeWidth={2} />
        <line
          x1={rightCity.x}
          y1={rightCity.y}
          x2={size.width}
          y2={midY}
          stroke={color}
          strokeWidth={2}
        />
      </>
    );
  }
  return <line x1={fromX} y1={fromY} x2={toX} y2={toY} stroke={color} strokeWidth={2} />;
}

export function Connections({ city, highlight }: { city: City; highlight: boolean }) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const { connectedCities } = city;

  return (
    <svg
      className="Connections"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
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
              color={highlight ? '#ffffff' : 'rgba(51, 119, 221, 0.5)'}
            />
          ))
        : null}
    </svg>
  );
}
Connections.displayName = 'Connections';
