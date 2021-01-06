import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { Typography, Button } from 'antd';
import { EditOutlined, ArrowLeftOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { withLoader } from './../../components/hoc';
import { IssueStatus, IssuePeople, Tabs, LogWorkModal } from './../../components/Issue';
import { IssueModal } from './../../components/IssueModal';
import { ISSUES } from './../../constants/issues';
import { ACTIVITY } from './../../constants/activity';
import { DATES_FORMATS } from './../../constants/datesFormats';
import { ROUTES } from './../../constants/routes';
import { IIssue, IComment, IWorkLog } from './../../definitions';
import { EmployeeContext } from './../../context';
import {
  IssuesRepository,
  EmployeesRepository,
  WorkLogsRepository,
  ActivityRepository,
  CommentsRepository,
} from './../../services/repositories';
import { BUTTON_STATUS_TEXT, TRANSFORM_STATUS } from './constants';
import { IProps, IState } from './types';
import styles from './styles.module.scss';
import { prepareData } from '../../utils';

class _Issue extends React.Component<IProps, IState> {
  static contextType = EmployeeContext;
  context!: React.ContextType<typeof EmployeeContext>;

  state: IState = {
    issue: null,
    employees: [],
    editVisible: false,
    logWorkVisible: false,
  };

  getEmployee() {
    return {
      id: this.context.employee?.id!,
      firstName: this.context.employee?.firstName!,
      lastName: this.context.employee?.lastName!,
    };
  }

  componentDidMount() {
    const { projectId, issueId } = this.props.match.params;

    const issuePromise = IssuesRepository.getById(projectId, issueId);
    const employeePromise = EmployeesRepository.getAll();
    this.props.fetching(Promise.all([issuePromise, employeePromise])).then(([issue, employees]) => {
      this.setState({
        issue: {
          ...issue,
          id: issueId,
          comments: prepareData(issue.comments),
          worklogs: prepareData(issue.worklogs),
        },
        employees: prepareData(employees),
      });
    });
  }

  updateStatus(status: string) {
    const { projectId, issueId } = this.props.match.params;
    const issuePromise = IssuesRepository.update(projectId, issueId, { status });

    const activityPromise = ActivityRepository.create({
      employee: this.getEmployee(),
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      entity: {
        id: this.state.issue?.id!,
        name: this.state.issue?.title!,
      },
      text: ACTIVITY.ISSUES.CHANGED_STATUS,
      type: 'issue',
    });

    this.props.fetching(Promise.all([issuePromise, activityPromise])).then(() =>
      this.setState({
        issue: {
          ...this.state.issue,
          status,
        } as IIssue,
      }),
    );
  }

  onChange = () => {
    if (!this.state.issue) {
      return;
    }

    this.updateStatus(TRANSFORM_STATUS[this.state.issue.status]);
  };

  onChangeStep = (current: number) => this.updateStatus(Object.values(ISSUES.STATUSES)[current]);

  onChangeAssignee = (assignee: IIssue['assignee']) => {
    const { projectId, issueId } = this.props.match.params;
    const activityPromise = ActivityRepository.create({
      employee: this.getEmployee(),
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      entity: {
        id: this.state.issue?.id!,
        name: this.state.issue?.title!,
      },
      text: ACTIVITY.ISSUES.CHANGED_ASSIGNEE,
      type: 'issue',
    });
    this.props.fetching(
      Promise.all([IssuesRepository.update(projectId, issueId, { assignee }), activityPromise]),
    );
  };

  setEditVisible = (editVisible: boolean) => this.setState({ editVisible });

  setLogWorkVisible = (logWorkVisible: boolean) => this.setState({ logWorkVisible });

  onEdit = (values: Pick<IIssue, 'title' | 'description' | 'priority' | 'originalEstimate'>) => {
    const { projectId, issueId } = this.props.match.params;
    const issuePromise = IssuesRepository.update(projectId, issueId, values);

    const activityPromise = ActivityRepository.create({
      employee: this.getEmployee(),
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      entity: {
        id: this.state.issue?.id!,
        name: this.state.issue?.title!,
      },
      text: ACTIVITY.ISSUES.UPDATED,
      type: 'issue',
    });

    this.props.fetching(Promise.all([issuePromise, activityPromise])).then(() => {
      this.setState({
        issue: {
          ...(this.state.issue as IIssue),
          ...values,
        },
      });
      this.setEditVisible(false);
    });
  };

  onLogWork = (values: Pick<IWorkLog, 'date' | 'time'>) => {
    const employee = this.getEmployee();
    const { projectId, issueId } = this.props.match.params;
    const activityPromise = ActivityRepository.create({
      employee: this.getEmployee(),
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      entity: {
        id: this.state.issue?.id!,
        name: this.state.issue?.title!,
      },
      text: ACTIVITY.ISSUES.LOGGED_TIME,
      type: 'issue',
    });

    const worklog = {
      ...values,
      employee,
    };
    const workLogPromise = WorkLogsRepository.create(projectId, issueId, worklog);

    Promise.all([workLogPromise, activityPromise]).then(([res, _]) => {
      const worklogs = [...this.state.issue?.worklogs!];
      worklogs.push({
        ...worklog,
        id: res.name,
      });
      this.setState({
        issue: {
          ...(this.state.issue as IIssue),
          worklogs,
        },
      });
      this.setLogWorkVisible(false);
    });
  };

  addComment = (text: IComment['text']) => {
    const { projectId, issueId } = this.props.match.params;
    const date = moment().format(DATES_FORMATS.FULL_FORMAT);
    const employee = this.getEmployee();
    const comment = {
      text,
      date,
      author: employee,
    };

    this.props
      .fetching(
        Promise.all([
          CommentsRepository.create(projectId, issueId, comment),
          ActivityRepository.create({
            employee: this.getEmployee(),
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            entity: {
              id: this.state.issue?.id!,
              name: this.state.issue?.title!,
            },
            text: ACTIVITY.ISSUES.ADDED_COMMENT,
            type: 'issue',
          }),
        ]),
      )
      .then(([res]) => {
        const comments = [...this.state.issue?.comments!];
        comments.push({
          ...comment,
          id: res.name,
        });
        this.setState({
          issue: {
            ...this.state.issue,
            comments,
          } as IIssue,
        });
      });
  };

  editComment = (id: IComment['id'], text: IComment['text']) => {
    const { projectId, issueId } = this.props.match.params;
    const date = moment().format(DATES_FORMATS.FULL_FORMAT);

    this.props
      .fetching(
        Promise.all([
          CommentsRepository.update(projectId, issueId, id, {
            text,
            date,
          }),
          ActivityRepository.create({
            employee: this.getEmployee(),
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            entity: {
              id: this.state.issue?.id!,
              name: this.state.issue?.title!,
            },
            text: ACTIVITY.ISSUES.UPDATED_COMMENT,
            type: 'issue',
          }),
        ]),
      )
      .then(([]) => {
        const comment = this.state.issue?.comments.find((item) => item.id === id)!;
        const comments = this.state.issue?.comments.map((item) => {
          if (item.id === id) {
            return {
              ...comment,
              text,
              date,
            };
          }

          return item;
        })!;

        this.setState({
          issue: {
            ...this.state.issue,
            comments,
          } as IIssue,
        });
      });
  };

  deleteComment = (id: IComment['id']) => {
    const { projectId, issueId } = this.props.match.params;

    this.props
      .fetching(
        Promise.all([
          CommentsRepository.delete(projectId, issueId, id),
          ActivityRepository.create({
            employee: this.getEmployee(),
            date: moment().format(DATES_FORMATS.FULL_FORMAT),
            entity: {
              id: this.state.issue?.id!,
              name: this.state.issue?.title!,
            },
            text: ACTIVITY.ISSUES.DELETED_COMMENT,
            type: 'issue',
          }),
        ]),
      )
      .then(([_]) => {
        const comments = this.state.issue?.comments.filter((item) => item.id !== id)!;

        this.setState({
          issue: {
            ...this.state.issue,
            comments,
          } as IIssue,
        });
      });
  };

  deleteWorkLog = (id: IWorkLog['id']) => {
    const { projectId, issueId } = this.props.match.params;
    this.props.fetching(WorkLogsRepository.delete(projectId, issueId, id)).then(() => {
      const worklogs = this.state.issue?.worklogs.filter((item) => item.id !== id)!;

      this.setState({
        issue: {
          ...this.state.issue,
          worklogs,
        } as IIssue,
      });
    });
  };

  render() {
    if (!this.state.issue) {
      return null;
    }

    return (
      <div className={styles.layoutContent}>
        <div className={styles.projectName}>
          <Link to={ROUTES.PROJECTS.DETAIL.ROUTE(this.props.match.params.projectId)}>
            <ArrowLeftOutlined className={styles.icon} />
            <span>{this.state.issue.project.title}</span>
          </Link>
        </div>
        <Typography.Title>{`[${this.state.issue.project.title}] - ${this.state.issue.title}`}</Typography.Title>
        <div className={styles.buttons}>
          <Button icon={<EditOutlined />} onClick={() => this.setEditVisible(true)}>
            Edit
          </Button>
          <Button className={styles.changeIssueStatus} onClick={this.onChange}>
            {BUTTON_STATUS_TEXT[this.state.issue.status]}
          </Button>
          <Button icon={<ClockCircleOutlined />} onClick={() => this.setLogWorkVisible(true)}>
            Log Work
          </Button>
        </div>
        <IssueStatus issueStatus={this.state.issue.status} onChange={this.onChangeStep} />
        <IssuePeople
          assignee={this.state.issue.assignee}
          author={this.state.issue.author}
          employees={this.state.employees}
          onChangeAssignee={this.onChangeAssignee}
        />
        <Tabs
          className={styles.tabs}
          employee={this.context.employee}
          issue={this.state.issue}
          comments={this.state.issue.comments}
          addComment={this.addComment}
          editComment={this.editComment}
          deleteComment={this.deleteComment}
          worklogs={this.state.issue.worklogs}
          deleteWorkLog={this.deleteWorkLog}
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
            originalEstimate: this.state.issue.originalEstimate,
          }}
          onSubmit={this.onEdit}
          loading={this.props.loading}
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
