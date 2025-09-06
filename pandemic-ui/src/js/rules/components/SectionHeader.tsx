import { PropsWithChildren } from 'react';

export function SectionHeader({ children }: PropsWithChildren) {
  return (
    <h2 className="text-blue-400 border-b border-gray-600 pb-2 mt-6 mb-4 text-xl font-semibold">
      {children}
    </h2>
  );
}
