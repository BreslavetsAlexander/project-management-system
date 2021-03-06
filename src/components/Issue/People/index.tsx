import React from 'react';
import { Typography, Form } from 'antd';
import { FormSelect } from '../../FormSelect';
import { INPUT_NAMES } from './constants';
import { IProps, IFormValues } from './types';
import styles from './styles.module.scss';

export class IssuePeople extends React.Component<IProps> {
  onValuesChange = (changedValues: IFormValues) => {
    this.props.onChangeAssignee(changedValues.assigneeId);
  };

  getSelect() {
    if (this.props.disabled) {
      const assignee = this.props.employees.find((item) => item.id === this.props.assigneeId);

      return (
        <div className={styles.author}>
          Assignee: {`${assignee?.firstName} ${assignee?.lastName}`}
        </div>
      );
    }

    const selectOptions = this.props.employees.map((item) => {
      return {
        title: `${item.firstName} ${item.lastName}`,
        value: item.id,
      };
    });

    return (
      <Form<IFormValues>
        className={styles.form}
        layout='inline'
        initialValues={{ [INPUT_NAMES.assigneeId]: this.props.assigneeId }}
        onValuesChange={this.onValuesChange}>
        <FormSelect label='Assignee' name={INPUT_NAMES.assigneeId} options={selectOptions} />
      </Form>
    );
  }

  render() {
    const author = this.props.employees.find((item) => item.id === this.props.authorId);

    return (
      <div className={styles.people}>
        <Typography.Title level={3}>People</Typography.Title>
        {this.getSelect()}
        <div className={styles.author}>Author: {`${author?.firstName} ${author?.lastName}`}</div>
      </div>
    );
  }
}
