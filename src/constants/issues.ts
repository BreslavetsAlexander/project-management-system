import { UpSquareOutlined, DownSquareOutlined, MinusOutlined } from '@ant-design/icons';

export const ISSUES = {
  STATUSES: {
    TO_DO: 'To Do',
    IN_PROGRESS: 'In Progress',
    IN_REVIEW: 'In Review',
    DONE: 'Done',
  },
  PRIORITIES: {
    LOW: {
      name: 'Low',
      icon: DownSquareOutlined,
      color: 'green',
    },
    MEDIUM: {
      name: 'Medium',
      icon: MinusOutlined,
      color: 'orange',
    },
    HIGH: {
      name: 'High',
      icon: UpSquareOutlined,
      color: 'red',
    },
  },
};
