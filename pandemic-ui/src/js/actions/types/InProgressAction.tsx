import { Action } from '../../types/Action';

export type InProgressAction = Pick<Action, 'type'> & Partial<Action>;
