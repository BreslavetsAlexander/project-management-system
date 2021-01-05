import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Collapse, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AccordionContent } from './../../components/Board/AccordionContent';
import { ProfileForm } from './../../components/ProfileForm';
import { withAuthorization, withLoader } from './../../components/hoc';
import { ROUTES } from './../../constants/routes';
import { EmployeeContext } from '../../context';
import { IEmployee } from '../../definitions';
import { EmployeesRepository, ProjectsRepository } from '../../services/repositories';
import { AuthService } from '../../services/Auth';
import { prepareData } from '../../utils';
import { Props, IState } from './types';
import styles from './styles.module.scss';

class _Profile extends React.Component<Props, IState> {
  state: IState = {
    project: null,
  };

  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  componentDidMount() {
    const { projectId } = this.context.employee!;

    if (!projectId) {
      return;
    }

    this.props.fetching(ProjectsRepository.getById(projectId)).then((res) => {
      this.setState({
        project: {
          ...res,
          issues: prepareData(res.issues),
          id: projectId,
        },
      });
    });
  }

  saveInfo = (field: string, value: string) => {
    const { employee } = this.context;
    const obj = {
      [field]: value,
    };

    const isEmailOrPassword = ['email', 'password'].includes(field);
    const prevIdToken = employee?.idToken;
    // AuthService.updateEmailOrPassword({
    //   ...obj,
    //   idToken: employee?.idToken
    // }).then(res => this.context.setEmployee({
    //   ...employee,
    //   idToken: res.idToken
    // } as IEmployee));
    const employeePromise = EmployeesRepository.update(this.context.employee?.id!, obj);
    const authPromise = isEmailOrPassword
      ? AuthService.updateEmailOrPassword({
          ...obj,
          idToken: prevIdToken,
        })
      : Promise.resolve(null);

    this.props.fetching(Promise.all([employeePromise, authPromise])).then(([_, authRes]) => {
      const idToken = authRes ? authRes.idToken : prevIdToken;

      this.context.setEmployee({
        ...employee,
        ...obj,
        idToken,
      } as IEmployee);
    });
  };

  onLogOut = () => {
    this.context.setEmployee(null);
    this.props.history.push(ROUTES.HOME);
  };

  getProject() {
    if (!this.state.project) {
      return <div>You don't have a project yet</div>;
    }

    return (
      <Collapse defaultActiveKey={this.state.project.id}>
        <Collapse.Panel
          className={styles.collapsePanel}
          key={this.state.project.id}
          header={this.state.project.title}
          showArrow={false}
          collapsible='disabled'>
          <AccordionContent issues={this.state.project.issues} />
        </Collapse.Panel>
      </Collapse>
    );
  }

  render() {
    const employeeName = `${this.context.employee?.firstName} ${this.context.employee?.lastName}`;

    return (
      <div className={styles.profile}>
        <div className={styles.header}>
          <UserOutlined className={styles.icon} />
          <div className={styles.info}>
            <div className={styles.name}>{employeeName}</div>
            <div className={styles.username}>@{this.context.employee?.username}</div>
          </div>
        </div>
        <Tabs defaultActiveKey='Information'>
          <Tabs.TabPane tab='Information' key='Information'>
            <ProfileForm employee={this.context.employee!} saveInfo={this.saveInfo} />
            <Button type='primary' danger onClick={this.onLogOut}>
              Log Out
            </Button>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Issues' key='Issues'>
            {this.getProject()}
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export const Profile = withAuthorization(withLoader(withRouter(_Profile)));
