import React from 'react';
import { IProps } from './types';
import styles from './styles.module.scss';

export const DetailsTab: React.FC<IProps> = (props) => {
  return (
    <div className={styles.detailsTab}>
      <p className={styles.priority}>
        <span>Priority</span>: {props.priority}
      </p>
      <p className={styles.description}>
        <span>Description</span>: {props.description}
      </p>
    </div>
  );
};
