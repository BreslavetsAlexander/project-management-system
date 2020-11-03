import React from 'react';
import { Collapse, Typography } from 'antd';
import { AccordionContent } from '../../components/Board/AccordionContent';
import { LayoutContent } from '../../components/LayoutContent';
import { IEmployeeWithIssues } from '../../definitions';
import { EmployeesRepository, IssuesRepository } from '../../services/repositories';
import styles from './styles.module.scss';

export const Board = () => {
  const [employees, setEmployees] = React.useState<IEmployeeWithIssues[] | null>([]);

  React.useEffect(() => {
    const employeesPromise = EmployeesRepository.getAll();
    const issuesPromise = IssuesRepository.getAll();

    Promise.all([employeesPromise, issuesPromise]).then(([employeesList, issuesList]) => {
      const employeeWithIssues = employeesList.map((item) => {
        return {
          ...item,
          issues: issuesList.filter((issue) => issue.employeeId === item.id),
        };
      });

      setEmployees(employeeWithIssues);
    });
  }, []);

  if (!employees) {
    return <div>Loading ...</div>;
  }

  const collapsePanels = employees.map((item) => {
    const header = (
      <div className={styles.header}>
        <span className={styles.name}>{item.name}</span>
        <span className={styles.count}>{item.issues.length} issues</span>
      </div>
    );

    return (
      <Collapse.Panel
        key={item.id}
        header={header}
        className={styles.panel}
        disabled={item.issues.length === 0}
        showArrow={item.issues.length > 0}>
        <AccordionContent issues={item.issues} />
      </Collapse.Panel>
    );
  });

  return (
    <LayoutContent className={styles.board}>
      <Typography.Title>Board</Typography.Title>
      <Collapse bordered={false} accordion className={styles.collapse}>
        {collapsePanels}
      </Collapse>
    </LayoutContent>
  );
};
