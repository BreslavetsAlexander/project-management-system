import React from 'react';
import { ISSUES } from '../../../constants/issues';
import { IProps } from './types';
import styles from './styles.module.scss';

export class AccordionContent extends React.Component<IProps> {
  getSection(status: string) {
    const issues = this.props.issues
      .filter((item) => item.status === status)
      .map((item) => {
        const issuePriority = Object.values(ISSUES.PRIORITIES).find(
          (priority) => priority.name === item.priority,
        );
        const priorityIcon = issuePriority ? (
          <issuePriority.icon style={{ color: issuePriority.color }} className={styles.icon} />
        ) : null;

        return (
          <div
            style={{ borderLeftColor: (issuePriority && issuePriority.color) || '' }}
            className={styles.issue}
            key={item.id}>
            {priorityIcon}
            <div>
              <h4 className={styles.projectName}>Project name</h4>
              <h3 className={styles.issueName}>{item.title}</h3>
            </div>
          </div>
        );
      });

    return (
      <div className={styles.section} key={status}>
        <div className={styles.title}>
          <span>{status}</span>
          <span className={styles.count}>{issues.length}</span>
        </div>
        <div className={styles.issues}>{issues}</div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.content}>
        {Object.values(ISSUES.STATUSES).map((status) => this.getSection(status))}
      </div>
    );
  }
}
