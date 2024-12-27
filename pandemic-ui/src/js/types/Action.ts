import { FC } from 'react';

export type Action = {
  name: string;
  description: string;
  ActionForm: FC<{ onSubmit: () => void }>;
  ActionButton: FC<{ isSelected: boolean; onSelect: (newType: Action['name']) => void }>;
};
