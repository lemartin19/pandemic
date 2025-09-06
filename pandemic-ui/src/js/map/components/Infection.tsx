export function Infection({ color, count }: { color: string; count: number }) {
  return count ? (
    <span
      key={color}
      className="inline-block px-1 py-0.5 rounded text-xs font-semibold"
      style={{ backgroundColor: color, color: color === 'yellow' ? 'black' : 'white' }}
    >
      {count}
    </span>
  ) : null;
}
Infection.displayName = 'Infection';
