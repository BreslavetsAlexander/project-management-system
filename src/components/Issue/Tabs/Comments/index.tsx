import React from 'react';
import { Comment, Form, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FormTextArea } from '../../../FormTextArea';
import { IProps } from './types';
import styles from './styles.module.scss';

export const CommentsTab: React.FC<IProps> = (props) => {
  return (
    <div>
      <div>
        {[1, 2, 3].map((item) => (
          <Comment
            key={item}
            className={styles.comment}
            avatar={<UserOutlined className={styles.avatar} />}
            author={<a className={styles.author}>{props.author}</a>}
            datetime={<p className={styles.datetime}>05.12.2020 16:17</p>}
            content={
              <p className={styles.content}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa exercitationem
                dolores est! Velit adipisci hic consectetur perspiciatis sit accusamus ipsum
                recusandae impedit odit autem! Exercitationem!
              </p>
            }
          />
        ))}
      </div>
      <Form className={styles.form}>
        <FormTextArea label={null} name='comment' />
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
