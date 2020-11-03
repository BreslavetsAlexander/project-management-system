import React from 'react';
import { UpSquareOutlined } from '@ant-design/icons';
import { IProps } from './types';
import styles from './styles.module.scss';

export const AccordionContent: React.FC<IProps> = () => {
  return (
    <div className={styles.content}>
      <div className={styles.section}>
        <div className={styles.title}>To Do</div>
        <div className={styles.issues}>
          <div className={styles.issue}>
            <UpSquareOutlined className={styles.icon} />
            <div>
              <h4 className={styles.projectName}>Project name</h4>
              <h3 className={styles.issueName}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, vel?
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>In Progress</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>In Review</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Done</div>
      </div>
    </div>
  );
};
