import React from 'react';
import { Modal, Form, Button } from 'antd';
import { FormInput } from '../FormInput';
import { FormTextArea } from '../FormTextArea';
import { FormSelect } from '../FormSelect';
import { ISSUES } from '../../constants/issues';
import { INPUT_NAMES } from './constants';
import { IProps, IFormValues } from './types';
import styles from './styles.module.scss';

export class IssueModal extends React.Component<IProps> {
  getInitialValues() {
    return {
      [INPUT_NAMES.TITLE.name]: this.props.values.title,
      [INPUT_NAMES.DESCRIPTION.name]: this.props.values.description,
      [INPUT_NAMES.PRIORITY.name]: this.props.values.priority,
      [INPUT_NAMES.ORIGINAL_ESTIMATE.DAYS.name]: this.props.values.originalEstimate.d,
      [INPUT_NAMES.ORIGINAL_ESTIMATE.HOURS.name]: this.props.values.originalEstimate.h,
      [INPUT_NAMES.ORIGINAL_ESTIMATE.MINUTES.name]: this.props.values.originalEstimate.m,
    };
  }

  onSubmit = (values: IFormValues) => {
    this.props.onSubmit({
      title: values.title,
      description: values.description,
      priority: values.priority,
      originalEstimate: {
        d: values.d,
        h: values.h,
        m: values.m,
      },
    });
  };

  getForm() {
    const options = Object.values(ISSUES.PRIORITIES).map((item) => {
      return {
        value: item.name,
        title: item.name,
      };
    });

    const values = new Array(60).fill('').map((_, i) => `${i}`);
    const days = values.slice(0, 32).map((item) => {
      return {
        value: item,
        title: item,
      };
    });
    const hours = values.slice(0, 24).map((item) => {
      return {
        value: item,
        title: item,
      };
    });
    const minutes = values.map((item) => {
      return {
        value: item,
        title: item,
      };
    });

    return (
      <Form<IFormValues>
        className={styles.form}
        layout='vertical'
        initialValues={this.getInitialValues()}
        onFinish={this.onSubmit}>
        <FormInput label={INPUT_NAMES.TITLE.label} name={INPUT_NAMES.TITLE.name} />
        <FormTextArea label={INPUT_NAMES.DESCRIPTION.label} name={INPUT_NAMES.DESCRIPTION.name} />
        <FormSelect
          options={options}
          label={INPUT_NAMES.PRIORITY.label}
          name={INPUT_NAMES.PRIORITY.name}
        />
        <div className={styles.originalEstimate}>
          <div>Original estimate</div>
          <div className={styles.selects}>
            <FormSelect
              options={days}
              label={INPUT_NAMES.ORIGINAL_ESTIMATE.DAYS.label}
              name={INPUT_NAMES.ORIGINAL_ESTIMATE.DAYS.name}
            />
            <FormSelect
              options={hours}
              label={INPUT_NAMES.ORIGINAL_ESTIMATE.HOURS.label}
              name={INPUT_NAMES.ORIGINAL_ESTIMATE.HOURS.name}
            />
            <FormSelect
              options={minutes}
              label={INPUT_NAMES.ORIGINAL_ESTIMATE.MINUTES.label}
              name={INPUT_NAMES.ORIGINAL_ESTIMATE.MINUTES.name}
            />
          </div>
        </div>
        <Form.Item className={styles.buttons}>
          <Button className={styles.cancel} danger onClick={() => this.props.setVisible(false)}>
            Cancel
          </Button>
          <Button type='primary' htmlType='submit'>
            {this.props.buttonText}
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    return (
      <Modal
        title={this.props.title}
        className={styles.modal}
        visible={this.props.visible}
        closable={false}>
        {this.getForm()}
      </Modal>
    );
  }
}
