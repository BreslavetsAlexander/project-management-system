import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { IProps } from './types';
import styles from './styles.module.scss';

export const Loader: React.FC<IProps> = (props) => {
  const classNames = [styles.loader];

  if (props.className) {
    classNames.push(props.className);
  }

  return <SyncOutlined className={classNames.join(' ')} spin />;
};
