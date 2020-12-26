import { IIssue } from '../../../../definitions';

export const convertTimeObjectToMinutes = (time: IIssue['originalEstimate']): number => {
  const hours = time.d * 24 + time.h;

  return hours * 60 + time.m;
};

export const convertMinutesToTimeObject = (minutes: number): IIssue['originalEstimate'] => {
  const d = Math.trunc(minutes / 1440);
  const h = Math.trunc((minutes - d * 1440) / 60);
  const m = Math.trunc(minutes % 60);

  return {
    d,
    h,
    m,
  };
};

export const getTimeAsString = (time: IIssue['originalEstimate']): string => {
  return (Object.keys(time) as Array<keyof typeof time>)
    .map((key) => {
      const value = time[key];

      return value ? `${value}${key}` : null;
    })
    .filter((item) => item)
    .join(' ');
};
