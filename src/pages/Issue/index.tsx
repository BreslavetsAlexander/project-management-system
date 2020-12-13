import React from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button, Form } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { withLoader } from './../../components/hoc';
import { FormSelect } from './../../components/FormSelect';
import { IssueStatus } from './../../components/Issue/Status';
import { Tabs } from './../../components/Issue/Tabs';
import { IssueModal } from './../../components/IssueModal';
import { LogWorkModal } from './../../components/Issue/LogWorkModal';
import { ISSUES } from './../../constants/issues';
import { DATES_FORMATS } from './../../constants/datesFormats';
import {
  IssuesRepository,
  EmployeesRepository,
  WorkLogsRepository,
} from './../../services/repositories';
import { BUTTON_STATUS_TEXT, TRANSFORM_STATUS } from './constants';
import { IProps, IState, IFormEditValues, IFormLogWorkValues } from './types';
import styles from './styles.module.scss';

class _Issue extends React.Component<IProps, IState> {
  state: IState = {
    issue: null,
    employees: null,
    editVisible: false,
    logWorkVisible: false,
  };

  componentDidMount() {
    this.props
      .fetching(
        Promise.all([
          IssuesRepository.getById(this.props.match.params.id),
          EmployeesRepository.getAll(),
        ]),
      )
      .then(([issue, employees]) => {
        this.setState({ issue, employees });
      });
  }

  updateStatus(status: string) {
    this.props
      .fetching(IssuesRepository.update(this.state.issue?.id!, { status }))
      .then((issue) => this.setState({ issue }));
  }

  onChange = () => {
    if (!this.state.issue) {
      return;
    }

    this.updateStatus(TRANSFORM_STATUS[this.state.issue.status]);
  };

  onSelect = (changedValues: { currentEmployeeId: number }) => {
    IssuesRepository.update(this.state.issue?.id!, {
      currentEmployeeId: changedValues.currentEmployeeId,
    }).then((res) => console.log(res));
  };

  onChangeStep = (current: number) => {
    this.updateStatus(Object.values(ISSUES.STATUSES)[current]);
  };

  renderSelect() {
    const selectOptions = this.state.employees?.map((item) => {
      return {
        title: item.name,
        value: item.id,
      };
    });

    const assignee = this.state.employees?.find(
      (item) => item.id === this.state.issue?.currentEmployeeId,
    );

    return (
      <Form
        className={styles.form}
        initialValues={{ currentEmployeeId: assignee?.id }}
        onValuesChange={this.onSelect}>
        <FormSelect name='currentEmployeeId' options={selectOptions || []} />
      </Form>
    );
  }

  renderPeople() {
    const author = this.state.employees?.find((item) => item.id === this.state.issue?.authorId);

    return (
      <div className={styles.people}>
        <Typography.Title level={3}>People</Typography.Title>
        <div className={styles.assignee}>
          <span>Assignee:</span>
          {this.renderSelect()}
        </div>
        <div className={styles.author}>Author: {author?.name}</div>
      </div>
    );
  }

  setEditVisible = (editVisible: boolean) => this.setState({ editVisible });

  setLogWorkVisible = (logWorkVisible: boolean) => this.setState({ logWorkVisible });

  onEdit = (values: IFormEditValues) => {
    IssuesRepository.update(this.state.issue?.id!, {
      title: values.title,
      description: values.description,
      priority: values.priority,
    }).then((issue) => {
      this.setState({ issue });
      this.setEditVisible(false);
    });
  };

  onLogWork = (values: IFormLogWorkValues) => {
    const date = values.date.format(DATES_FORMATS.DAY_MONTH_YEAR);
    const time = values.time.format(DATES_FORMATS.HOURS_MINUTES);
    const issueId = this.state.issue?.id;
    WorkLogsRepository.create({ date, time, issueId }).then((res) => {
      console.log(res);
      this.setLogWorkVisible(false);
    });
  };

  render() {
    if (!this.state.issue) {
      return null;
    }

    return (
      <div className={styles.layoutContent}>
        <h4 className={styles.projectName}>Project name</h4>
        <Typography.Title>
          {`[Project name - ${this.state.issue.id}]`} {this.state.issue.title}
        </Typography.Title>
        <div className={styles.buttons}>
          <Button icon={<EditOutlined />} onClick={() => this.setEditVisible(true)}>
            Edit
          </Button>
          <Button className={styles.changeIssueStatus} onClick={this.onChange}>
            {BUTTON_STATUS_TEXT[this.state.issue.status]}
          </Button>
          <Button onClick={() => this.setLogWorkVisible(true)}>Log Work</Button>
        </div>
        <IssueStatus issueStatus={this.state.issue.status} onChange={this.onChangeStep} />
        {this.renderPeople()}
        <Tabs
          className={styles.tabs}
          priority={this.state.issue.priority}
          description={this.state.issue.description}
        />
        <IssueModal
          title='Edit issue'
          buttonText='Edit'
          visible={this.state.editVisible}
          setVisible={this.setEditVisible}
          values={{
            title: this.state.issue.title,
            description: this.state.issue.description,
            priority: this.state.issue.priority,
          }}
          onSubmit={this.onEdit}
        />
        <LogWorkModal
          visible={this.state.logWorkVisible}
          setVisible={this.setLogWorkVisible}
          onSubmit={this.onLogWork}
        />
      </div>
    );
  }
}

export const Issue = withRouter(withLoader(_Issue));
