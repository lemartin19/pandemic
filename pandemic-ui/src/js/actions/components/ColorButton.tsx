import '../../css/Button.css';

import { PropsWithChildren } from 'react';
import { Color } from '../../types/Disease';

export function ColorButton({
  children,
  color,
  isSelected,
  onClick,
}: PropsWithChildren<{
  color: Color;
  isSelected?: boolean;
  onClick: (newColor: Color) => void;
}>) {
  return (
    <button
      className={`Button Button--small`}
      style={{ backgroundColor: color, opacity: isSelected ? 1 : 0.5 }}
      onClick={() => onClick(color)}
    >
      {children}
    </button>
  );
}
ColorButton.displayName = 'ColorButton';
