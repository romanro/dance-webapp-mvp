import { User } from '@core/models';

export class UserState {
  user: User;
  error: Error | string | null; // track errors
}
