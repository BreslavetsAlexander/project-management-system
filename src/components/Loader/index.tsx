import React from 'react';
import classnames from 'classnames';
import { SyncOutlined } from '@ant-design/icons';
import { IProps } from './types';
import styles from './styles.module.scss';

export const Loader: React.FC<IProps> = (props) => {
  return <SyncOutlined className={classnames(styles.loader, props.className)} spin />;
};
