import { getUrlWithParams, IParams } from '../utils';

class _HttpProvider {
  get<T>(url: string, params?: IParams): Promise<T> {
    const newUrl = getUrlWithParams(url, params);
    return this.send(newUrl, 'GET');
  }

  post<T>(url: string, data: Partial<T>): Promise<T> {
    return this.send(url, 'POST', data);
  }

  patch<T>(url: string, data: Partial<T>): Promise<T> {
    return this.send(url, 'PATCH', data);
  }

  delete(url: string): Promise<{}> {
    return this.send(url, 'DELETE');
  }

  private send<T>(url: string, method: string, data?: T) {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
}

export const HttpProvider = new _HttpProvider();
