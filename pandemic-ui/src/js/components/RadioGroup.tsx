import { ReactNode } from 'react';

export interface RadioOption<T> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps<T> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  disabled?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function RadioGroup<T extends string | number>({
  name,
  value,
  onChange,
  options,
  disabled = false,
  className = '',
  orientation = 'vertical',
}: RadioGroupProps<T>) {
  return (
    <div className={`RadioGroup RadioGroup--${orientation} ${className}`.trim()} role="radiogroup">
      {options.map((option, index) => {
        const isDisabled = disabled || option.disabled;
        const isChecked = value === option.value;
        const inputId = `${name}-${index}`;

        return (
          <label
            key={option.value}
            className={`RadioGroup-option ${isDisabled ? 'RadioGroup-option--disabled' : ''} ${
              isChecked ? 'RadioGroup-option--checked' : ''
            }`.trim()}
            htmlFor={inputId}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => !isDisabled && onChange(option.value)}
              className="RadioGroup-input"
            />
            <span className="RadioGroup-label">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

RadioGroup.displayName = 'RadioGroup';
