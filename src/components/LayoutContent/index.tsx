import React from 'react';
import { IProps } from './types';
import styles from './styles.module.scss';

export const LayoutContent: React.FC<IProps> = (props) => {
  return <div className={styles.layoutContent}>{props.children}</div>;
};
