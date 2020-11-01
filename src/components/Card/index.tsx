import React from 'react';
import { IProps } from './types';
import styles from './styles.module.scss';

export const Card: React.FC<IProps> = props => {
  return (
    <div className={styles.card}>
      <p className={styles.value}>{props.value}</p>
      <p className={styles.title}>{props.title}</p>
    </div>
  );
};
