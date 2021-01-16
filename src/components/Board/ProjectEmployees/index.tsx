import React from 'react';
import { Collapse, Result } from 'antd';
import { UnorderedListOutlined, ExportOutlined } from '@ant-design/icons';
import { AccordionContent } from '../AccordionContent';
import { IProps } from './types';
import styles from './styles.module.scss';

export const ProjectEmployees: React.FC<IProps> = (props) => {
  if (!props.employees.length) {
    return (
      <Result
        className={styles.result}
        icon={<UnorderedListOutlined />}
        title='There are no employees on this project'
        extra='The author of the project has not added anyone yet'
      />
    );
  }

  const collapsePanels = props.employees.map((employee) => {
    const issues = props.issues.filter((issue) => issue.assigneeId === employee.id);
    const header = (
      <div className={styles.header}>
        <span className={styles.name}>{`${employee.firstName} ${employee.lastName}`}</span>
        <span className={styles.count}>{issues.length} issue(s)</span>
      </div>
    );

    const extra = (
      <div className={styles.extra} onClick={() => props.onLeaveProject(employee.id)}>
        <ExportOutlined /> <span>Leave project</span>
      </div>
    );

    return (
      <Collapse.Panel
        key={employee.id}
        header={header}
        extra={employee.id === props.currentEmployeeId ? extra : null}
        className={styles.panel}
        showArrow>
        <AccordionContent issues={issues} />
      </Collapse.Panel>
    );
  });

  return (
    <Collapse bordered={false} accordion className={styles.collapse}>
      {collapsePanels}
    </Collapse>
  );
};
