import { FC } from 'react';

export type Action = {
  name: string;
  description: string;
  ActionForm: FC;
  ActionButton: FC<{ isSelected: boolean; onSelect: (newType: Action['name']) => void }>;
};
