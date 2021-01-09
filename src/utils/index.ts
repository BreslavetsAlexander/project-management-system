export interface IParams {
  [key: string]: string | number;
}

export const getUrlWithParams = (url: string, params?: IParams) => {
  if (!params) {
    return url;
  }

  const questionIndex = url.indexOf('?');
  let paramsStr = '';

  if (questionIndex === -1) {
    paramsStr += '?';
  }

  paramsStr += Object.keys(params)
    .map((key) => {
      if (params[key]) {
        return `${key}=${encodeURIComponent(params[key])}`;
      }

      return null;
    })
    .filter((item) => item)
    .join('&');

  return url + paramsStr;
};

export const getUrlWithJsonExtension = (url: string): string => `${url}.json`;

export const prepareData = <T>(data: T) => {
  if (!data) {
    return [];
  }

  return (Object.keys(data) as Array<keyof typeof data>).map((key) => {
    return {
      ...data[key],
      id: key as string,
    };
  });
};
