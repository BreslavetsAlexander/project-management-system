import React from 'react';
import { Tabs, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AccordionContent } from './../../components/Board/AccordionContent';
import { ProfileForm } from './../../components/ProfileForm';
import { withAuthorization } from './../../components/hoc';
import { EmployeeContext } from '../../context';
import styles from './styles.module.scss';

class _Profile extends React.Component {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  render() {
    const employeeName = `${this.context.employee?.firstName} ${this.context.employee?.lastName}`;

    return (
      <div className={styles.profile}>
        <div className={styles.header}>
          <UserOutlined className={styles.icon} />
          <div className={styles.info}>
            <div className={styles.name}>{employeeName}</div>
            <div className={styles.username}>@username</div>
          </div>
        </div>
        <Tabs defaultActiveKey='Information'>
          <Tabs.TabPane tab='Information' key='Information'>
            <ProfileForm employee={this.context.employee!} />
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
