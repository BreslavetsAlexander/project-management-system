import React from 'react';
import { Collapse, Typography } from 'antd';
import { AccordionContent } from '../../components/Board/AccordionContent';
import { LayoutContent } from '../../components/LayoutContent';
import { API } from '../../constants/api';
import { ProjectsRepository, IssuesRepository } from '../../services/repositories';
import { IProps, IState, IProjectWithEmployees } from './types';
import styles from './styles.module.scss';

export class Board extends React.Component<IProps, IState> {
  state: IState = {
    project: null,
  };

  componentDidMount() {
    const projectPromise = ProjectsRepository.getById<IProjectWithEmployees>(
      this.props.match.params.id,
      {
        [API.RELATIONSHIPS.EMBED]: 'employees',
      },
    );
    const issuesPromise = IssuesRepository.getAll({ projectId: this.props.match.params.id });

    Promise.all([projectPromise, issuesPromise]).then(([currentProject, issuesList]) => {
      const employees = currentProject.employees.map((employee) => {
        return {
          ...employee,
          issues: issuesList.filter((issue) => issue.employeeId === employee.id),
        };
      });

      this.setState({
        project: {
          ...currentProject,
          employees,
        },
      });
    });
  }

  render() {
    if (!this.state.project) {
      return null;
    }

    const collapsePanels = this.state.project.employees.map((item) => {
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
  }
}
