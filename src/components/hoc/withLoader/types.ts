export interface IState {
  loading: boolean;
}

export interface IWithLoaderProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetching: <TPromise>(promise: Promise<TPromise>) => Promise<TPromise>;
}
