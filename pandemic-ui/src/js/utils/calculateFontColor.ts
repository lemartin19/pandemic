export function calculateFontColor(playerColor: string) {
  const hex = playerColor.match(/#(\w{6})/)?.[1];
  const r = parseInt(hex?.[1] ?? '0', 16);
  const g = parseInt(hex?.[2] ?? '0', 16);
  const b = parseInt(hex?.[3] ?? '0', 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 9 ? 'black' : 'white';
}
