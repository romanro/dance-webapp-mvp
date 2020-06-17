import { User } from '@core/models';

export class UserState {
  user: User | null;
  error: Error | string | null; // track errors
}
