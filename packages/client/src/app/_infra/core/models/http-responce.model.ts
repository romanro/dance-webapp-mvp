export type RegistrationErrorCode = 'PASSWORD_SHORT' | 'INVALID_EMAIL' | 'PASSWORD_MISMATCH' | 'USER_EXISTS';
export type LoginErrorCode = 'INVALID_EMAIL' | 'BLANK_PASSWORD' | 'SIGN_PROVIDER_NO_CREDENTIALS';
export type ForgotPasswordErrorCode = 'INVALID_EMAIL' | 'NON_EXISTING_USER';


export interface RestResponse {
    success: boolean;
    errors?: RestError[];
    token?: string;
}

export interface RestError {
    msg?: string;
    code: ForgotPasswordErrorCode | RegistrationErrorCode | LoginErrorCode;
}
