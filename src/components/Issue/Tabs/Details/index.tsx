import React from 'react';
import { IProps } from './types';
import styles from './styles.module.scss';

export const DetailsTab: React.FC<IProps> = (props) => {
  const originalEstimate = (Object.keys(props.originalEstimate) as Array<
    keyof typeof props.originalEstimate
  >)
    .map((key) => {
      const value = props.originalEstimate[key];
      return value ? `${value}${key}` : null;
    })
    .filter((item) => item)
    .join(' ');

  return (
    <div className={styles.detailsTab}>
      <p className={styles.description}>
        <span>Original Estimate</span>: {originalEstimate}
      </p>
      <p className={styles.priority}>
        <span>Priority</span>: {props.priority}
      </p>
      <p className={styles.description}>
        <span>Description</span>: {props.description}
      </p>
    </div>
  );
};
