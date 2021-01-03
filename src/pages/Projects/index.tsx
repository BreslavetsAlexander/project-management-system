import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Card, Typography } from 'antd';
import { ProjectModal } from '../../components/ProjectModal';
import { IWithLoaderProps, withLoader, withAuthorization } from '../../components/hoc';
import { ProjectsRepository } from '../../services/repositories';
import { ROUTES } from '../../constants/routes';
import { IProject } from '../../definitions';
import { prepareData } from '../../utils';
import { IState } from './types';
import styles from './styles.module.scss';

class _Projects extends React.Component<IWithLoaderProps, IState> {
  state: IState = {
    projects: [],
    visible: false,
  };

  componentDidMount() {
    this.props.fetching(ProjectsRepository.getAll()).then((res) => {
      const projects = prepareData(res).map((item) => {
        return {
          ...item,
          issues: prepareData(item.issues),
        };
      });

      this.setState({ projects });
    });
  }

  setVisible = (visible: boolean) => this.setState({ visible });

  onSubmit = (values: Pick<IProject, 'title' | 'description'>) => {
    const project = {
      title: values.title,
      description: values.description,
    };
    ProjectsRepository.create(project).then((res) => {
      const projects = [...this.state.projects];
      projects.push({
        ...project,
        id: res.name,
        issues: [],
      });
      this.setState({ projects });
      this.setVisible(false);
    });
  };

  render() {
    return (
      <div className={styles.projects}>
        <Typography.Title>Projects list</Typography.Title>
        <Button type='primary' onClick={() => this.setVisible(true)}>
          Create project
        </Button>
        <List
          className={styles.list}
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.projects}
          loading={false}
          loadMore={false}
          locale={{ emptyText: null }}
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
      </div>
    );
  }
}

export const Projects = withAuthorization(withLoader(_Projects));
