import React from 'react';
import { Link } from 'react-router-dom';
import { CommentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { ISSUES } from '../../../constants/issues';
import { ROUTES } from './../../../constants/routes';
import { IProps } from './types';
import styles from './styles.module.scss';

export class AccordionContent extends React.Component<IProps> {
  getSection(status: string) {
    const issues = this.props.issues
      .filter((item) => item.status === status)
      .map((item) => {
        const issuePriority = Object.values(ISSUES.PRIORITIES).find(
          (priority) => priority.name === item.priority,
        )!;
        const priorityIcon = (
          <issuePriority.icon style={{ color: issuePriority.color }} className={styles.icon} />
        );

        return (
          <div
            style={{ borderLeftColor: (issuePriority && issuePriority.color) || '' }}
            className={styles.issue}
            key={item.id}>
            {priorityIcon}
            <div>
              <Link
                to={ROUTES.PROJECTS.ISSUE.ROUTE(item.projectId, item.id)}
                className={styles.title}>
                {item.title}
              </Link>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.icons}>
                <div>
                  <CommentOutlined /> {item.comments.length}
                </div>
                <div>
                  <ClockCircleOutlined /> {item.worklogs.length}
                </div>
              </div>
            </div>
          </div>
        );
      });

    return (
      <div className={styles.section} key={status}>
        <p className={styles.title}>{`${status} ${issues.length}`}</p>
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
