import React from 'react';
import moment from 'moment';
import { Form, Modal, Button } from 'antd';
import { FormDatePicker } from '../../FormDatePicker';
import { FormTimePicker } from '../../FormTimePicker';
import { DATES_FORMATS } from '../../../constants/datesFormats';
import { INPUTS } from './constants';
import { IProps, IFormValues } from './types';
import styles from './styles.module.scss';

export class LogWorkModal extends React.Component<IProps> {
  getInitialValues() {
    return {
      [INPUTS.DATE.name]: moment(),
      [INPUTS.TIME.name]: moment()
        .set('hours', 0)
        .set('minutes', 10),
    };
  }

  onSubmit = (values: IFormValues) => {
    this.props.onSubmit({
      date: values.date.format(DATES_FORMATS.DAY_MONTH_YEAR),
      time: {
        d: 0,
        h: values.time.get('hours'),
        m: values.time.get('minutes'),
      },
    });
  };

  getForm() {
    return (
      <Form<IFormValues>
        layout='inline'
        initialValues={this.getInitialValues()}
        onFinish={this.onSubmit}>
        <div className={styles.pickersWrap}>
          <FormDatePicker
            className={styles.formDatePicker}
            label={INPUTS.DATE.label}
            name={INPUTS.DATE.name}
          />
          <FormTimePicker
            label={INPUTS.TIME.label}
            name={INPUTS.TIME.name}
            placeholder='Log your work'
          />
        </div>
        <div className={styles.buttonsWrap}>
          <Form.Item className={styles.buttons}>
            <Button danger className={styles.cancel} onClick={() => this.props.setVisible(false)}>
              Cancel
            </Button>
            <Button type='primary' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        title='Log Work'
        className={styles.modal}
        closable={false}>
        {this.getForm()}
      </Modal>
    );
  }
}
