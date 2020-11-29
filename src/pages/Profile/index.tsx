import React from 'react';
import { Tabs, Timeline, Form, Button, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LayoutContent } from './../../components/LayoutContent';
import { AccordionContent } from './../../components/Board/AccordionContent';
import { FormInput } from './../../components/FormInput';
import styles from './styles.module.scss';

export class Profile extends React.Component<{}, {}> {
  render() {
    return (
      <LayoutContent className={styles.profile}>
        <div className={styles.header}>
          <UserOutlined className={styles.icon} />
          <div className={styles.info}>
            <div className={styles.name}>Jhon Smith</div>
            <div className={styles.username}>@username</div>
          </div>
        </div>
        <Tabs defaultActiveKey='1'>
          <Tabs.TabPane tab='Information' key='1'>
            <Form layout='vertical' style={{ width: '30%' }}>
              <FormInput label='First name' name='name' />
              <FormInput label='Last name' name='name' />
              <FormInput label='username' name='name' />
              <FormInput label='email' name='name' />
              <FormInput label='password' name='name' />
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab='My issues' key='2'>
            <Collapse defaultActiveKey={1}>
              <Collapse.Panel key={1} header='Project name' showArrow={false} disabled>
                <AccordionContent issues={[]} />
              </Collapse.Panel>
            </Collapse>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Activity' key='3'>
            <Timeline>
              {[1, 2, 3, 4, 5].map((item) => (
                <Timeline.Item key={item}>item {item} 2015-09-01</Timeline.Item>
              ))}
            </Timeline>
          </Tabs.TabPane>
        </Tabs>
      </LayoutContent>
    );
  }
}
