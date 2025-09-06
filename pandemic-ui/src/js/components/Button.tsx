import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { calculateFontColor } from '../utils/calculateFontColor';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'player';
  size?: 'small' | 'medium' | 'large';
  playerColor?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  playerColor,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const usableVariant = variant === 'player' && !playerColor ? 'primary' : variant;

  const getVariantClasses = () => {
    switch (usableVariant) {
      case 'primary':
        return 'bg-blue-600 text-white hover:bg-blue-700';
      case 'secondary':
        return 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      case 'danger':
        return 'bg-red-600 text-white hover:bg-red-700';
      case 'player':
        return ''; // Handled by inline styles
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-1.5 text-sm';
      case 'medium':
        return 'px-4 py-2 text-base';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded font-semibold cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${getVariantClasses()} ${getSizeClasses()} ${className}`.trim()}
      disabled={disabled}
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
