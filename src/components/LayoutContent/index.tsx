import React from 'react';
import { Layout } from 'antd';
import classnames from 'classnames';
import { IProps } from './types';
import styles from './styles.module.scss';

export const LayoutContent: React.FC<IProps> = (props) => {
  return (
    <Layout.Content className={classnames(styles.layoutContent, props.className)}>
      {props.children}
    </Layout.Content>
  );
};
