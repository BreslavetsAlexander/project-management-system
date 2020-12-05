import React from 'react';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { LayoutContent } from './../../components/LayoutContent';
import { Loader } from './../../components/Loader';
import { Result } from 'antd';

import { List } from 'antd';

export const Home: React.FC = () => {
  const activity = [
    'commented on [NAME-123] - Test 123',
    'started progress on [NAME-123] - Test 123',
    'logged 3 hours on [NAME-123] - Test 123',
    'created [NAME-123] - Test 123',
    'changed the Assignee to Another Men on [NAME-123] - Test 123',
    'updated the descreption on [NAME-123] - Test 123',
    'updated the title on [NAME-123] - Test 123',
    'changed the status to To Do on [NAME-123] - Test 123',
    'changed the status to In Progress on [NAME-123] - Test 123',
    'changed the status to In Review on [NAME-123] - Test 123',
    'changed the status to Done on [NAME-123] - Test 123',
  ];

  const activityStream = (
    <div className='right' style={{ flexBasis: '50%', padding: '0 20px' }}>
      <div
        style={{ fontSize: '20px', backgroundColor: '#003a8c', color: '#ffffff', padding: '10px' }}>
        Activity Stream
      </div>
      <div style={{ marginTop: '15px' }}>
        {/* {activity.map((item) => (
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              paddingBottom: '5px',
              borderBottom: '1px solid #003a8c',
            }}
            key={item}>
            <UserOutlined style={{ fontSize: '70px', color: '#003a8c' }} />
            <div style={{ marginTop: '10px' }}>
              <p>
                <span>Jhon Smith</span> {item}
              </p>
            </div>
          </div>
        ))} */}

        <List
          itemLayout='horizontal'
          dataSource={activity}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<UserOutlined style={{ fontSize: '70px', color: '#003a8c' }} />}
                title={`Jhon Smith ${item}`}
                description='05.12.2020 16:17'
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );

  const assignedToMe = (
    <div style={{ marginTop: '30px' }}>
      <div
        style={{
          fontSize: '20px',
          backgroundColor: '#003a8c',
          color: '#ffffff',
          padding: '10px',
        }}>
        Assigned to Me
      </div>
      <List
        size='large'
        bordered
        dataSource={activity}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );

  const introduction = (
    <div style={{ border: '1px solid #003a8c' }}>
      <div
        style={{
          fontSize: '20px',
          backgroundColor: '#003a8c',
          color: '#ffffff',
          padding: '10px',
        }}>
        Introduction
      </div>
      <Result
        icon={<SmileOutlined />}
        title='Welcome to JIRA Clone'
        subTitle='Thanks for choosing'
      />
      <p>Using this app you can ...</p>
    </div>
  );

  return (
    <LayoutContent>
      <Loader />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 -20px',
        }}>
        <div className='left' style={{ flexBasis: '50%', padding: '0 20px' }}>
          {introduction}
          {assignedToMe}
        </div>
        {activityStream}
      </div>
    </LayoutContent>
  );
};
