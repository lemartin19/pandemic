import { Action } from './Action';

export type Role = {
  name: string;
  description: string;
  actions: Action[];
};
