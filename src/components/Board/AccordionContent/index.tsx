import React from 'react';
import { UpSquareOutlined } from '@ant-design/icons';
import { ISSUES } from '../../../constants/issues';
import { IProps } from './types';
import styles from './styles.module.scss';

export class AccordionContent extends React.Component<IProps> {
  getSection(status: string) {
    const issues = this.props.issues
      .filter((item) => item.status === status)
      .map((item) => (
        <div className={styles.issue} key={item.id}>
          <UpSquareOutlined className={styles.icon} />
          <div>
            <h4 className={styles.projectName}>Project name</h4>
            <h3 className={styles.issueName}>{item.title}</h3>
          </div>
        </div>
      ));

    return (
      <div className={styles.section} key={status}>
        <div className={styles.title}>{status}</div>
        <div className={styles.issues}>{issues}</div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.content}>
        {Object.values(ISSUES.statuses).map((status) => this.getSection(status))}
      </div>
    );
  }
}
