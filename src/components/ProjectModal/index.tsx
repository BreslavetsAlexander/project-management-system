import React from 'react';
import { Modal, Form, Button } from 'antd';
import { FormInput } from '../FormInput';
import { FormTextArea } from '../FormTextArea';
import { INPUTS } from './constants';
import { IProps } from './types';
import styles from './styles.module.scss';

export class ProjectModal extends React.Component<IProps> {
  getInitialValues() {
    return {
      [INPUTS.TITLE.name]: this.props.values.title,
      [INPUTS.DESCRIPTION.name]: this.props.values.description,
    };
  }

  getForm() {
    return (
      <Form
        layout='vertical'
        initialValues={this.getInitialValues()}
        onFinish={this.props.onSubmit}>
        <FormInput label={INPUTS.TITLE.label} name={INPUTS.TITLE.name} />
        <FormTextArea label={INPUTS.DESCRIPTION.label} name={INPUTS.DESCRIPTION.name} />
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
