import React from 'react';
import { Collapse, Typography } from 'antd';
import { AccordionContent } from '../../components/Board/AccordionContent';
import { LayoutContent } from '../../components/LayoutContent';
import { IEmployee } from '../../definitions';
import { EmployeesRepository } from '../../services/repositories';
import styles from './styles.module.scss';

export const Board = () => {
  const [employees, setEmployees] = React.useState<IEmployee[] | null>([]);

  React.useEffect(() => {
    EmployeesRepository.getAll().then((res) => setEmployees(res));
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

  console.log(employees);

  return (
    <LayoutContent className={styles.board}>
      <Typography.Title>Board</Typography.Title>
      <Collapse bordered={false} accordion className={styles.collapse}>
        {collapsePanels}
      </Collapse>
    </LayoutContent>
  );
};
