export function Infection({ color, count }: { color: string; count: number }) {
  return count ? (
    <span key={color} className="Infection" style={{ backgroundColor: color }}>
      {count}
    </span>
  ) : null;
}
Infection.displayName = 'Infection';
