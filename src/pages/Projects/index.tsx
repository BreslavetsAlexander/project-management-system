import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Card, Typography } from 'antd';
import { LayoutContent } from '../../components/LayoutContent';
import { ProjectModal } from '../../components/ProjectModal';
import { IProps as IProjectModalProps } from '../../components/ProjectModal/types';
import { ProjectsRepository, IssuesRepository } from '../../services/repositories';
import { ROUTES } from '../../constants/routes';
import { IState } from './types';
import styles from './styles.module.scss';

export class Projects extends React.Component<{}, IState> {
  state: IState = {
    projects: [],
    visible: false,
  };

  componentDidMount() {
    const projectsPromise = ProjectsRepository.getAll();
    const issuesPromise = IssuesRepository.getAll();

    Promise.all([projectsPromise, issuesPromise]).then(([projectsList, ussuesList]) => {
      const projects = projectsList.map((item) => {
        return {
          ...item,
          issues: ussuesList.filter((issue) => issue.currentProjectId === item.id),
        };
      });

      this.setState({ projects });
    });
  }

  setVisible = (visible: boolean) => this.setState({ visible });

  onSubmit = (values: IProjectModalProps['values']) => {
    ProjectsRepository.create({
      title: values.title,
      description: values.description,
    }).then((project) => {
      const projects = [...this.state.projects];
      projects.push({
        ...project,
        issues: [],
      });
      this.setState({ projects });
      this.setVisible(false);
    });
  };

  render() {
    return (
      <LayoutContent className={styles.projects}>
        <Typography.Title>Projects list</Typography.Title>
        <Button type='primary' onClick={() => this.setVisible(true)}>
          Create project
        </Button>
        <List
          className={styles.list}
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.projects}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.title} className={styles.card}>
                <div className={styles.info}>
                  <div>{item.description}</div>
                  <div>{item.issues.length}</div>
                </div>
                <Link to={ROUTES.PROJECTS.DETAIL.ROUTE(item.id)}>View board</Link>
              </Card>
            </List.Item>
          )}
        />
        <ProjectModal
          title='Create project'
          buttonText='Create'
          visible={this.state.visible}
          setVisible={this.setVisible}
          values={{
            title: '',
            description: '',
          }}
          onSubmit={this.onSubmit}
        />
      </LayoutContent>
    );
  }
}
