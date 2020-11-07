import React from 'react';
import { Modal, Form, Button } from 'antd';
import { FormInput } from '../../FormInput';
import { FormTextArea } from '../../FormTextArea';
import { FormAutoComplete } from '../../FormAutoComplete';
import { ISSUES } from '../../../constants/issues';
import { INPUTS } from './constants';
import { IProps } from './types';
import styles from './styles.module.scss';

export class EditModal extends React.Component<IProps> {
  getInitialValues() {
    return {
      [INPUTS.TITLE.name]: this.props.values.title,
      [INPUTS.DESCRIPTION.name]: this.props.values.description,
      [INPUTS.PRIORITY.name]: this.props.values.priority,
    };
  }

  getForm() {
    const options = Object.values(ISSUES.PRIORITIES).map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });

    return (
      <Form
        layout="vertical"
        initialValues={this.getInitialValues()}
        onFinish={this.props.onSubmit}>
        <FormInput label={INPUTS.TITLE.label} name={INPUTS.TITLE.name} />
        <FormTextArea label={INPUTS.DESCRIPTION.label} name={INPUTS.DESCRIPTION.name} />
        <FormAutoComplete
          options={options}
          label={INPUTS.PRIORITY.label}
          name={INPUTS.PRIORITY.name}
        />
        <Form.Item className={styles.buttons}>
          <Button className={styles.cancel} danger onClick={() => this.props.setVisible(false)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    );
  }

  render() {
    return (
      <Modal
        title="Edit issue"
        className={styles.modal}
        visible={this.props.visible}
        closable={false}>
        {this.getForm()}
      </Modal>
    );
  }
}
