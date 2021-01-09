import { API } from './../constants/api';
import { getUrlWithParams } from '../utils';
import { IEmployee } from '../definitions';
import { HttpProvider } from './httpProvider';

interface IPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface IError {
  error: {
    code: number;
    message: string;
    errors: {
      domain: string;
      message: string;
      reason: string;
    }[];
  };
}

export interface IResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

type UpdateInfo = Partial<Pick<IEmployee, 'email' | 'password' | 'idToken'>>;

class _AuthService {
  register(payload: Pick<IPayload, 'email' | 'password'>) {
    const url = getUrlWithParams(API.REGISTER, { key: API.KEY });

    return HttpProvider.post<IPayload, IResponse | IError>(url, {
      returnSecureToken: true,
      ...payload,
    });
  }

  logIn(payload: Pick<IPayload, 'email' | 'password'>) {
    const url = getUrlWithParams(API.LOG_IN, { key: API.KEY });

    return HttpProvider.post<IPayload, IResponse | IError>(url, {
      returnSecureToken: true,
      ...payload,
    });
  }

  updateEmailOrPassword(data: UpdateInfo) {
    const url = getUrlWithParams(API.UPDATE_EMAIL_OR_PASSWORD, { key: API.KEY });

    return HttpProvider.post<
      UpdateInfo & { returnSecureToken: boolean },
      Pick<IEmployee, 'idToken'>
    >(url, {
      returnSecureToken: true,
      ...data,
    });
  }
}

export const AuthService = new _AuthService();
