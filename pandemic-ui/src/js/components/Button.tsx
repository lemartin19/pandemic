import '../../css/Button.css';

import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { calculateFontColor } from '../utils/calculateFontColor';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'player';
  size?: 'small' | 'medium' | 'large';
  playerColor?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  playerColor,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const usableVariant = variant === 'player' && !playerColor ? 'primary' : variant;

  return (
    <button
      className={`Button Button--${usableVariant} Button--${size} ${className}`.trim()}
      style={
        playerColor
          ? { backgroundColor: playerColor, color: calculateFontColor(playerColor) }
          : undefined
      }
      {...props}
    >
      {children}
    </button>
  );
}

Button.displayName = 'Button';
