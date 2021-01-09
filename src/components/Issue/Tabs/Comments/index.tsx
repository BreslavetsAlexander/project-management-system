import React from 'react';
import { Comment, Form, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined } from '@ant-design/icons';
import { FormTextArea } from '../../../FormTextArea';
import { INPUT_NAMES } from './constants';
import { IProps, IState, IFormValues } from './types';
import styles from './styles.module.scss';

export class CommentsTab extends React.Component<IProps, IState> {
  state: IState = {
    editedCommentId: null,
  };

  formRef = React.createRef<FormInstance<IFormValues>>();

  getComments() {
    if (!this.props.comments.length) {
      return <div>No comments yet</div>;
    }

    return (
      <div>
        {this.props.comments.map((item) => {
          const actions = [
            <span onClick={() => this.onEdit(item.id)}>Edit</span>,
            <span onClick={() => this.props.deleteComment(item.id)}>Delete</span>,
          ];

          const author = this.props.employees.find((employee) => employee.id === item.authorId)!;
          const isAuthor = this.props.employee?.id === item.authorId;

          return (
            <Comment
              key={item.id}
              className={styles.comment}
              avatar={<UserOutlined className={styles.avatar} />}
              author={<a className={styles.author}>{`${author.firstName} ${author.lastName}`}</a>}
              datetime={<p className={styles.datetime}>{item.date}</p>}
              content={<p className={styles.content}>{item.text}</p>}
              actions={isAuthor ? actions : []}
            />
          );
        })}
      </div>
    );
  }

  onEdit = (editedCommentId: number | string) => {
    const comment = this.props.comments.find((item) => item.id === editedCommentId);

    this.formRef.current?.setFieldsValue({
      text: comment?.text,
    });

    this.setState({ editedCommentId });
  };

  onSubmit = (values: IFormValues) => {
    if (!this.state.editedCommentId) {
      this.props.addComment(values.text);
    } else {
      this.props.editComment(this.state.editedCommentId, values.text);

      this.setState({
        editedCommentId: null,
      });
    }

    this.formRef.current?.setFieldsValue({
      text: '',
    });
  };

  render() {
    return (
      <div>
        {this.getComments()}
        <Form<IFormValues> ref={this.formRef} className={styles.form} onFinish={this.onSubmit}>
          <FormTextArea label={null} name={INPUT_NAMES.text} />
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              {this.state.editedCommentId ? 'Edit Comment' : 'Add Comment'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
