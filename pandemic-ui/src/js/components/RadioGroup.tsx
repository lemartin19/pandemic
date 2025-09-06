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
  const orientationClasses = orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap';

  return (
    <div className={`flex gap-2 ${orientationClasses} ${className}`.trim()} role="radiogroup">
      {options.map((option, index) => {
        const isDisabled = disabled || option.disabled;
        const isChecked = value === option.value;
        const inputId = `${name}-${index}`;

        return (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded transition-colors select-none ${
              isDisabled 
                ? 'cursor-not-allowed opacity-50' 
                : isChecked
                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'hover:bg-gray-100'
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
              className={`m-0 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
            <span className={`font-medium ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

RadioGroup.displayName = 'RadioGroup';
