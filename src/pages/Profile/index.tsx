import React from 'react';
import { Tabs, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AccordionContent } from './../../components/Board/AccordionContent';
import { ProfileForm } from './../../components/ProfileForm';
import { withAuthorization } from './../../components/hoc';
import styles from './styles.module.scss';

class _Profile extends React.Component {
  render() {
    return (
      <div className={styles.profile}>
        <div className={styles.header}>
          <UserOutlined className={styles.icon} />
          <div className={styles.info}>
            <div className={styles.name}>Jhon Smith</div>
            <div className={styles.username}>@username</div>
          </div>
        </div>
        <Tabs defaultActiveKey='Information'>
          <Tabs.TabPane tab='Information' key='Information'>
            <ProfileForm
              employee={{
                firstName: 'Vang',
                lastName: 'Moss',
                email: 'vangmoss@cosmetex.com',
                id: 1,
                password: '1234',
                username: 'vangmoss',
                currentProjectId: 1,
              }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Issues' key='Issues'>
            <Collapse defaultActiveKey={1}>
              <Collapse.Panel
                className={styles.collapsePanel}
                key={1}
                header='Project name'
                showArrow={false}
                disabled>
                <AccordionContent issues={[]} />
              </Collapse.Panel>
            </Collapse>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export const Profile = withAuthorization(_Profile);
