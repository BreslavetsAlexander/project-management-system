import React from 'react';
import { Comment } from 'antd';
import { IProps } from './types';
// import styles from './styles.module.scss';

export const CommentsTab: React.FC<IProps> = (props) => {
  return (
    <Comment
      author={<a>{props.author}</a>}
      content={<p>{props.content}</p>}
      datetime={
        <p title="title">
          <span>span</span>
        </p>
      }
    />
  );
};
