import { LoginMethod } from './user.model';

export class AuthData {
  token: string;
  loginMethod: LoginMethod;
  userId: string;
}
