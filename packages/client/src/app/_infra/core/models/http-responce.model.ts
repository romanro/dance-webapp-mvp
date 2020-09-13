import { AuthTokens } from './auth.model';
import { Figure } from './figure.model';
import { Star } from './star.model';
import { User } from './user.model';
import {Practice} from "@models/practices.model";

// export type RegistrationErrorCode = 'PASSWORD_SHORT' | 'INVALID_EMAIL' | 'PASSWORD_MISMATCH' | 'USER_EXISTS';
// export type LoginErrorCode = 'INVALID_EMAIL' | 'BLANK_PASSWORD' | 'SIGN_PROVIDER_NO_CREDENTIALS';
// export type ForgotPasswordErrorCode = 'INVALID_EMAIL' | 'NON_EXISTING_USER';


export interface RestResponse {
    success: boolean;
    message?: string;
    data?: any;
}

export interface AuthRestResponse extends RestResponse {
    data?: AuthTokens;
}

export interface UserRestResponse extends RestResponse {
    data?: User;
}

export interface StarsRestResponse extends RestResponse {
    data?: Array<Star>;
}

export interface FiguresRestResponse extends RestResponse {
    data?: Array<Figure>;
}
export interface SingleFigureRestResponse extends RestResponse {
    data?: Figure;
}
export interface PracticeItemsRestResponse extends RestResponse {
    data?: Array<Practice>;
}