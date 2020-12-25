import { IFormValues } from './types';

export const INPUT_NAMES: { [key in keyof IFormValues]: key } = {
  assigneeId: 'assigneeId',
};
