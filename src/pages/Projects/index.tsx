import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, Card } from 'antd';
import { LayoutContent } from '../../components/LayoutContent';
import { IProject } from '../../definitions';
import { API } from '../../constants/api';
import { ROUTES } from '../../constants/routes';
import { ProjectsRepository } from '../../services/repositories';
import { IProjectWithIssue } from './types';
import styles from './styles.module.scss';

export const Projects: React.FC = () => {
  const [projects, setProjects] = React.useState<IProjectWithIssue[] | null>(null);

  React.useEffect(() => {
    ProjectsRepository.getAll<IProjectWithIssue>({
      [API.RELATIONSHIPS.EMBED]: 'issues',
    }).then((res) => setProjects(res));
  }, []);

  if (!projects) {
    return null;
  }

  return (
    <LayoutContent className={styles.projects}>
      <Typography.Title>Projects list</Typography.Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={projects}
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
    </LayoutContent>
  );
};
