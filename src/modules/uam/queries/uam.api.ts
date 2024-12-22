import { newCancelToken } from '@core/common';
import { httpService } from '@core/common/services/http';
import {
  IConfirmSignUpCodePayload,
  IForgotPasswordPayload,
  IResetPasswordPayload,
  ISignInPayload,
  ISignUpCodePayload,
  ISignUpPayload,
} from '.';

const signIn = (body: ISignInPayload) =>
  httpService.post(
    '/uam/login',
    { username: body.email, password: body.password },
    newCancelToken(),
  );

const signUp = (body: ISignUpPayload) => httpService.post('/uam/signup', body, newCancelToken());

const getSignUpCode = (payload: ISignUpCodePayload) =>
  httpService.post('/uam/signup-code', payload, newCancelToken());

const confirmSignUpCode = (payload: IConfirmSignUpCodePayload) =>
  httpService.post('/uam/confirm-signup', payload, newCancelToken());

const forgotPassword = (payload: IForgotPasswordPayload) =>
  httpService.post('/uam/forgot-password', payload, newCancelToken());

const resetPassword = (payload: IResetPasswordPayload) =>
  httpService.post('/uam/reset-password', payload, newCancelToken());

export { confirmSignUpCode, forgotPassword, getSignUpCode, resetPassword, signIn, signUp };
