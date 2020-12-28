import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { Typography, Button } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { withLoader } from './../../components/hoc';
import { IssueStatus, IssuePeople, Tabs, LogWorkModal } from './../../components/Issue';
import { IssueModal } from './../../components/IssueModal';
import { ISSUES } from './../../constants/issues';
import { ACTIVITY } from './../../constants/activity';
import { DATES_FORMATS } from './../../constants/datesFormats';
import { ROUTES } from './../../constants/routes';
import { IIssue, IComment, IWorkLog } from './../../definitions';
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

class _Issue extends React.Component<IProps, IState> {
  state: IState = {
    issue: null,
    comments: [],
    worklogs: [],
    employees: [],
    editVisible: false,
    logWorkVisible: false,
  };

  componentDidMount() {
    this.props
      .fetching(
        Promise.all([
          IssuesRepository.getById(this.props.match.params.id),
          EmployeesRepository.getAll(),
          CommentsRepository.getAll(),
          WorkLogsRepository.getByIssueId(this.props.match.params.id),
        ]),
      )
      .then(([issue, employees, comments, worklogs]) => {
        const isIssueNotFound = JSON.stringify(issue) === '{}';

        if (isIssueNotFound) {
          this.props.history.push(ROUTES.NOT_FOUND);
          return;
        }

        this.setState({ issue, employees, comments, worklogs });
      });
  }

  updateStatus(status: string) {
    const issuePromise = IssuesRepository.update(this.state.issue?.id!, { status });

    const activityPromise = ActivityRepository.create({
      type: 'issue',
      text: ACTIVITY.ISSUES.CHANGED_STATUS,
      date: moment().format(`${DATES_FORMATS.DAY_MONTH_YEAR} ${DATES_FORMATS.HOURS_MINUTES}`),
      entity: {
        id: this.state.issue?.id!,
        name: this.state.issue?.title!,
      },
      employee: {
        id: 1,
        firstName: 'Vang',
        lastName: 'Moss',
      },
    });

    this.props
      .fetching(Promise.all([issuePromise, activityPromise]))
      .then(([issue, _]) => this.setState({ issue }));
  }

  onChange = () => {
    if (!this.state.issue) {
      return;
    }

    this.updateStatus(TRANSFORM_STATUS[this.state.issue.status]);
  };

  onChangeStep = (current: number) => this.updateStatus(Object.values(ISSUES.STATUSES)[current]);

  onChangeAssignee = (assignee: IIssue['assignee']) => {
    if (!this.state.issue) {
      return;
    }

    this.props.fetching(IssuesRepository.update(this.state.issue.id, { assignee }));
  };

  setEditVisible = (editVisible: boolean) => this.setState({ editVisible });

  setLogWorkVisible = (logWorkVisible: boolean) => this.setState({ logWorkVisible });

  onEdit = (values: Pick<IIssue, 'title' | 'description' | 'priority' | 'originalEstimate'>) => {
    const issuePromise = IssuesRepository.update(this.state.issue?.id!, values);

    const activityPromise = ActivityRepository.create({
      type: 'issue',
      text: ACTIVITY.ISSUES.UPDATED,
      date: moment().format(`${DATES_FORMATS.DAY_MONTH_YEAR} ${DATES_FORMATS.HOURS_MINUTES}`),
      entity: {
        id: this.state.issue?.id!,
        name: values.title,
      },
      employee: {
        id: 1,
        firstName: 'Vang',
        lastName: 'Moss',
      },
    });

    Promise.all([issuePromise, activityPromise]).then(([issue, _]) => {
      this.setState({ issue });
      this.setEditVisible(false);
    });
  };

  onLogWork = (values: Pick<IWorkLog, 'date' | 'time'>) => {
    const activityPromise = ActivityRepository.create({
      type: 'issue',
      text: ACTIVITY.ISSUES.LOGGED_TIME,
      date: moment().format(DATES_FORMATS.FULL_FORMAT),
      entity: {
        id: this.state.issue?.id!,
        name: this.state.issue?.title!,
      },
      employee: {
        id: 1,
        firstName: 'Vang',
        lastName: 'Moss',
      },
    });

    const workLogPromise = WorkLogsRepository.create({
      ...values,
      issueId: this.state.issue?.id,
      employee: {
        id: 1,
        firstName: 'Vang',
        lastName: 'Moss',
      },
    });

    Promise.all([workLogPromise, activityPromise]).then(([worklog, _]) => {
      const worklogs = [...this.state.worklogs];
      worklogs.push(worklog);
      this.setState({ worklogs });
      this.setLogWorkVisible(false);
    });
  };

  addComment = (text: IComment['text']) => {
    const date = moment().format(`${DATES_FORMATS.DAY_MONTH_YEAR} ${DATES_FORMATS.HOURS_MINUTES}`);

    this.props
      .fetching(
        Promise.all([
          CommentsRepository.create({
            text,
            date,
            author: {
              id: 1,
              firstName: 'Vang',
              lastName: 'Moss',
            },
          }),
          ActivityRepository.create({
            type: 'issue',
            text: ACTIVITY.ISSUES.ADDED_COMMENT,
            date,
            entity: {
              id: this.state.issue?.id!,
              name: this.state.issue?.title!,
            },
            employee: {
              id: 1,
              firstName: 'Vang',
              lastName: 'Moss',
            },
          }),
        ]),
      )
      .then(([comment]) => {
        const comments = [...this.state.comments];
        comments.push(comment);
        this.setState({ comments });
      });
  };

  editComment = (id: IComment['id'], text: IComment['text']) => {
    const date = moment().format(`${DATES_FORMATS.DAY_MONTH_YEAR} ${DATES_FORMATS.HOURS_MINUTES}`);

    this.props
      .fetching(
        Promise.all([
          CommentsRepository.update(id, {
            text,
            date,
          }),
          ActivityRepository.create({
            type: 'issue',
            text: ACTIVITY.ISSUES.UPDATED_COMMENT,
            date,
            entity: {
              id: this.state.issue?.id!,
              name: this.state.issue?.title!,
            },
            employee: {
              id: 1,
              firstName: 'Vang',
              lastName: 'Moss',
            },
          }),
        ]),
      )
      .then(([comment]) => {
        const comments = this.state.comments.map((item) => {
          if (item.id === id) {
            return comment;
          }

          return item;
        });

        this.setState({ comments });
      });
  };

  deleteComment = (id: IComment['id']) => {
    const date = moment().format(`${DATES_FORMATS.DAY_MONTH_YEAR} ${DATES_FORMATS.HOURS_MINUTES}`);

    this.props
      .fetching(
        Promise.all([
          CommentsRepository.delete(id),
          ActivityRepository.create({
            type: 'issue',
            text: ACTIVITY.ISSUES.DELETE_COMMENT,
            date,
            entity: {
              id: this.state.issue?.id!,
              name: this.state.issue?.title!,
            },
            employee: {
              id: 1,
              firstName: 'Vang',
              lastName: 'Moss',
            },
          }),
        ]),
      )
      .then(([_]) => {
        const comments = this.state.comments.filter((item) => item.id !== id);

        this.setState({ comments });
      });
  };

  deleteWorkLog = (id: IWorkLog['id']) => {
    this.props.fetching(WorkLogsRepository.delete(id)).then(() => {
      const worklogs = this.state.worklogs.filter((item) => item.id !== id);

      this.setState({ worklogs });
    });
  };

  render() {
    if (!this.state.issue) {
      return null;
    }

    return (
      <div className={styles.layoutContent}>
        <div className={styles.projectName}>
          <Link to={ROUTES.PROJECTS.DETAIL.ROUTE(this.state.issue.currentProjectId)}>
            <ArrowLeftOutlined className={styles.icon} />
            <span>Project name</span>
          </Link>
        </div>
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
        <IssuePeople
          assignee={this.state.issue.assignee}
          author={this.state.issue.author}
          employees={this.state.employees}
          onChangeAssignee={this.onChangeAssignee}
        />
        <Tabs
          className={styles.tabs}
          issue={this.state.issue}
          comments={this.state.comments}
          addComment={this.addComment}
          editComment={this.editComment}
          deleteComment={this.deleteComment}
          worklogs={this.state.worklogs}
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
