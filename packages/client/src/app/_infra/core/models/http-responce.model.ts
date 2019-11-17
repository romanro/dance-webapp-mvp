export interface RegistrationResponse {
    success: boolean;
    errors?: RegistrationError[];
    token?: string;
}

export type RegistrationErrorCode = 'PASSWORD_SHORT' | 'INVALID_EMAIL' | 'PASSWORD_MISMATCH' | 'USER_EXISTS';
export interface RegistrationError { msg?: string; code: RegistrationErrorCode; }


export interface LoginResponse {
    success: boolean;
    errors?: LoginError[];
    token?: string;
}

export type LoginErrorCode = 'INVALID_EMAIL' | 'BLANK_PASSWORD' | 'SIGN_PROVIDER_NO_CREDENTIALS';
export interface LoginError { msg?: string; code: LoginErrorCode; }


export interface ForgotPasswordResponse {
    success: boolean;
    errors?: ForgotPasswordError[];
}

export type ForgotPasswordErrorCode = 'INVALID_EMAIL' | 'NON_EXISTING_USER';
export interface ForgotPasswordError { msg?: string; code: ForgotPasswordErrorCode; }