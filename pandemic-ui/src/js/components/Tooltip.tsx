import { CSSProperties, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type TooltipPosition = 'left' | 'right' | 'bottom' | 'top';


const calculateStyles = (el: HTMLElement | null, position: TooltipPosition) => {
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;

  const style: CSSProperties = {
    position: 'absolute',
    zIndex: 1000,
  };

  switch (position) {
    case 'top':
      style.left = rect.left + scrollX + rect.width / 2;
      style.top = rect.top + scrollY - 8;
      style.transform = 'translate(-50%, -100%)';
      break;
    case 'bottom':
      style.left = rect.left + scrollX + rect.width / 2;
      style.top = rect.bottom + scrollY + 8;
      style.transform = 'translateX(-50%)';
      break;
    case 'left':
      style.left = rect.left + scrollX - 8;
      style.top = rect.top + scrollY + rect.height / 2;
      style.transform = 'translate(-100%, -50%)';
      break;
    case 'right':
      style.left = rect.right + scrollX + 8;
      style.top = rect.top + scrollY + rect.height / 2;
      style.transform = 'translateY(-50%)';
      break;
  }

  return style;
};

export const Tooltip = ({
  position = 'top',
  children,
  text,
}: PropsWithChildren<{ text: ReactNode; position?: TooltipPosition }>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});


  useEffect(() => {
    if (isVisible) {
      const style = calculateStyles(containerRef.current, position);
      if (style)  setTooltipStyle(style);


      const handleScroll = () => {
        const scrolledStyles = calculateStyles(containerRef.current, position);
        if (scrolledStyles) setTooltipStyle(scrolledStyles);
      };
      const handleResize = () => {
        const resizedStyles = calculateStyles(containerRef.current, position);
        if (resizedStyles) setTooltipStyle(resizedStyles);
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, position]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="Tooltip-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {isVisible && createPortal(
        <div
          className={`Tooltip-text Tooltip-${position}`}
          role="tooltip"
          style={tooltipStyle}
        >
          {text}
        </div>,
        document.body
      )}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
