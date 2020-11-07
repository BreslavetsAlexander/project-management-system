import { ISSUES } from '../../constants/issues';

export const BUTTON_STATUS_TEXT = {
  [ISSUES.STATUSES.TO_DO]: 'Start progress',
  [ISSUES.STATUSES.IN_PROGRESS]: 'Start review',
  [ISSUES.STATUSES.IN_REVIEW]: 'Done',
  [ISSUES.STATUSES.DONE]: ISSUES.STATUSES.TO_DO,
};

export const TRANSFORM_STATUS = {
  [ISSUES.STATUSES.TO_DO]: ISSUES.STATUSES.IN_PROGRESS,
  [ISSUES.STATUSES.IN_PROGRESS]: ISSUES.STATUSES.IN_REVIEW,
  [ISSUES.STATUSES.IN_REVIEW]: ISSUES.STATUSES.DONE,
  [ISSUES.STATUSES.DONE]: ISSUES.STATUSES.TO_DO,
};
