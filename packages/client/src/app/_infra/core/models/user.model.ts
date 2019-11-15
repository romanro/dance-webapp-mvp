import { Language } from './language.model';
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
  id?: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  language: Language = Language.english;
  gender?: Gender | '';
  location?: Location;
  birthDate?: string;
  tags?: Tag[];
  userPic?: string = null;
  about?: string;
}

export class Location {
  city?: string;
  country?: string;
}

export enum LoginMethod {
  REGULAR = 'regular',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}
