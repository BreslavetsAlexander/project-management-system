import React from 'react';
import { IProps } from './types';
import styles from './styles.module.scss';

export const DetailsTab: React.FC<IProps> = (props) => {
  return (
    <div className={styles.detailsTab}>
      <p>
        <span>Created at</span>: {props.createdAt}
      </p>
      <p>
        <span>Priority</span>: {props.priority}
      </p>
      <p>
        <span>Description</span>: {props.description}
      </p>
    </div>
  );
};
