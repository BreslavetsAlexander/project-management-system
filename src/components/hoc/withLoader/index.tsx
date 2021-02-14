import React from 'react';
import { Spin, message, Button } from 'antd';
import { Loader } from '../../Loader';
import { MESSAGES } from '../../../constants/messages';
import { ServerError } from '../../../components/ServerError';
import { IWithLoaderProps, IState } from './types';
import styles from './styles.module.scss';

export const withLoader = <TProps extends IWithLoaderProps>(
  Component: React.ComponentType<TProps>,
) => {
  return class extends React.Component<Omit<TProps, keyof IWithLoaderProps>, IState> {
    state: IState = {
      loading: false,
      error: false,
    };

    setLoading = (loading: boolean) => this.setState({ loading });

    fetching = <TPromise extends {}>(promise: Promise<TPromise>): Promise<TPromise> => {
      this.setLoading(true);

      return promise
        .catch(() => {
          message.error(MESSAGES.SOMETHING_WENT_WRONG);
          this.setState({ error: true });
          return promise;
        })
        .finally(() => this.setLoading(false));
    };

    render() {
      if (this.state.error) {
        const extra = (
          <Button type='primary' onClick={() => window.location.reload()}>
            Reload the page
          </Button>
        );

        return <ServerError className={styles.serverError} extra={extra} />;
      }

      return (
        <Spin
          className={styles.spin}
          wrapperClassName={styles.wrapper}
          indicator={<Loader className={styles.loader} />}
          spinning={this.state.loading}>
          <Component
            {...(this.props as TProps)}
            fetching={this.fetching}
            loading={this.state.loading}
            setLoading={this.setLoading}
          />
        </Spin>
      );
    }
  };
};
