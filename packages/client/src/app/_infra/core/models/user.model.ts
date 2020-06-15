import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Language } from './language.model';
import { Name } from './star.model';
import { Tag } from './tag.model';

export class UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UserLoginData {
  token: string;
  user: User;
}

export class User {
  email: string;
  name: Name;
  language: Language = Language.english;
  permissions?: UserPermissions[];
  gender?: Gender | '';
  location?: Location;
  birthDate?: BirthDate;
  picture?: string = null;
  about?: string;
}

export enum UserPermissions {
  USER = 'user',
  ADMIN = 'admin'
}

export class Location {
  city?: string;
  country?: string;
  lat?: string;
  long?: string;
}

export interface BirthDate {
  date: NgbDateStruct;
  group: AgeGroup;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum AgeGroup {
  CHILD = 'child',
  YOUNG = 'young',
  ADULT = 'adult'
}

export enum LoginMethod {
  REGULAR = 'regular',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

export enum UserError {
  GET = 'USER.ERRORS.getUserError',
  UPDATE = 'USER.ERRORS.updateUserError',
  GENERAL = 'ERRORS.GeneralBackendError'
}


