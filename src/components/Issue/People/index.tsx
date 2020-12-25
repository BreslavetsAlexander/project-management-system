import React from 'react';
import { Typography, Form } from 'antd';
import { FormSelect } from '../../FormSelect';
import { INPUT_NAMES } from './constants';
import { IProps, IFormValues } from './types';
import styles from './styles.module.scss';

export class IssuePeople extends React.Component<IProps> {
  onValuesChange = (changedValues: IFormValues) => {
    const assignee = this.props.employees.find((item) => item.id === changedValues.assigneeId);

    this.props.onChangeAssignee({
      id: assignee?.id!,
      name: assignee?.name!,
    });
  };

  getSelect() {
    const selectOptions = this.props.employees.map((item) => {
      return {
        title: item.name,
        value: item.id,
      };
    });

    return (
      <Form<IFormValues>
        className={styles.form}
        initialValues={{ [INPUT_NAMES.assigneeId]: this.props.assignee.id }}
        onValuesChange={this.onValuesChange}>
        <FormSelect name={INPUT_NAMES.assigneeId} options={selectOptions} />
      </Form>
    );
  }

  render() {
    return (
      <div className={styles.people}>
        <Typography.Title level={3}>People</Typography.Title>
        <div className={styles.assignee}>
          <span>Assignee:</span>
          {this.getSelect()}
        </div>
        <div className={styles.author}>Author: {this.props.author.name}</div>
      </div>
    );
  }
}
