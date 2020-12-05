import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';

export const Loader: React.FC = () => {
  return <SyncOutlined className={styles.loader} spin />;
};
