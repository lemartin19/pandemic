import '../../css/Tooltip.css';
import { PropsWithChildren, ReactNode } from 'react';

type TooltipPosition = 'left' | 'right' | 'bottom' | 'top';

export const Tooltip = ({
  position = 'top',
  children,
  text,
}: PropsWithChildren<{ text: ReactNode; position?: TooltipPosition }>) => {
  return (
    <div className="Tooltip-container">
      {children}
      <div className={`Tooltip-text Tooltip-${position}`} role="tooltip">
        {text}
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
