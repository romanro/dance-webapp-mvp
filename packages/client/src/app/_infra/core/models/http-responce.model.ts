import { AuthTokens } from './auth.model';
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