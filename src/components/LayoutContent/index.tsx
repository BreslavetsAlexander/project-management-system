import React from 'react';
import classnames from 'classnames';
import { IProps } from './types';
import styles from './styles.module.scss';

export const LayoutContent: React.FC<IProps> = (props) => {
  return <div className={classnames(styles.layoutContent, props.className)}>{props.children}</div>;
};
