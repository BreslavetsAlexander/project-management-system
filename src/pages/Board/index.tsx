import React from 'react';
import { Collapse, Typography } from 'antd';
import { AccordionContent } from '../../components/Board/AccordionContent';
import { LayoutContent } from '../../components/LayoutContent';
import styles from './styles.module.scss';

export const Board = () => {
  const collapsePanels = [1, 2, 3].map((item) => {
    const header = (
      <div className={styles.header}>
        <span className={styles.name}>Leanne Graham</span>
        <span className={styles.count}>13 issues</span>
      </div>
    );

    return (
      <Collapse.Panel key={item} header={header} className={styles.panel}>
        <AccordionContent />
      </Collapse.Panel>
    );
  });

  return (
    <LayoutContent className={styles.board}>
      <Typography.Title>Board</Typography.Title>
      <Collapse bordered={false} accordion className={styles.collapse} defaultActiveKey={['1']}>
        {collapsePanels}
      </Collapse>
    </LayoutContent>
  );
};
