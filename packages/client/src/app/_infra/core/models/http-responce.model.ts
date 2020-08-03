import { AuthTokens } from './auth.model';
import { Figure } from './figure.model';
import { Star } from './star.model';
import { User } from './user.model';

// export type RegistrationErrorCode = 'PASSWORD_SHORT' | 'INVALID_EMAIL' | 'PASSWORD_MISMATCH' | 'USER_EXISTS';
// export type LoginErrorCode = 'INVALID_EMAIL' | 'BLANK_PASSWORD' | 'SIGN_PROVIDER_NO_CREDENTIALS';
// export type ForgotPasswordErrorCode = 'INVALID_EMAIL' | 'NON_EXISTING_USER';


export interface RestResponse {
    message: string;
}

export interface AuthRestResponse {
    message: string;
    tokens?: AuthTokens;
}

export interface UserRestResponse {
    success: boolean;
    user: User;
}

export interface StarsRestResponse {
    success?: boolean;
    stars: Array<Star>;
}

export interface FiguresRestResponse {
    success?: boolean;
    figures: Array<Figure>;
}