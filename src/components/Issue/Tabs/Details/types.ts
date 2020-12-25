import { IIssue } from '../../../../definitions';

export type IProps = Pick<IIssue, 'priority' | 'description' | 'originalEstimate'>;
