import React from 'react';
import { Collapse, Result } from 'antd';
import { UnorderedListOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons';
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

  const isProjectAuthor = props.currentEmployeeId === props.projectAuthorId;

  const collapsePanels = props.employees.map((employee) => {
    const issues = props.issues.filter((issue) => issue.assigneeId === employee.id);
    const header = (
      <div className={styles.header}>
        <span className={styles.name}>{`${employee.firstName} ${employee.lastName}`}</span>
        <span className={styles.count}>{issues.length} issue(s)</span>
      </div>
    );

    const leaveProjectExtra = !isProjectAuthor ? (
      <div className={styles.extra} onClick={() => props.onLeaveProject(employee.id)}>
        <ExportOutlined /> <span>Leave project</span>
      </div>
    ) : null;

    const deleteFromProjectExtra = isProjectAuthor ? (
      <div className={styles.extra} onClick={() => props.onDeleteFromProject(employee.id)}>
        <DeleteOutlined /> <span>Delete from project</span>
      </div>
    ) : null;

    const extra = employee.id === props.currentEmployeeId ? leaveProjectExtra : deleteFromProjectExtra;

    return (
      <Collapse.Panel
        key={employee.id}
        header={header}
        extra={extra}
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
