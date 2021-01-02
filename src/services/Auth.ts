import { API, API_KEY } from './../constants/api';
import { getUrlWithParams } from '../utils';
import { HttpProvider } from './httpProvider';

interface IPayload {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

interface IResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

class _AuthService {
  register(payload: Pick<IPayload, 'email' | 'password'>) {
    const url = getUrlWithParams(API.REGISTER, { key: API_KEY });

    return HttpProvider.post<IPayload, IResponse>(url, {
      returnSecureToken: true,
      ...payload,
    });
  }

  logIn(payload: Pick<IPayload, 'email' | 'password'>) {
    const url = getUrlWithParams(API.LOG_IN, { key: API_KEY });

    return HttpProvider.post<IPayload, IResponse>(url, {
      returnSecureToken: true,
      ...payload,
    });
  }
}

export const AuthService = new _AuthService();
