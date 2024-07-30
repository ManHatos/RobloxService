export interface ErrorModel {
    code: ErrorCodes;
    message: string;
    details?: object[];
}
export declare enum ErrorCodes {
    INVALID_ARGUMENT = "INVALID_ARGUMENT",
    PERMISSION_DENIED = "PERMISSION_DENIED",
    NOT_FOUND = "NOT_FOUND",
    ABORTED = "ABORTED",
    RESOURCE_EXHAUSTED = "RESOURCE_EXHAUSTED",
    CANCELLED = "CANCELLED",
    INTERNAL = "INTERNAL",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    UNAVAILABLE = "UNAVAILABLE"
}
export declare enum Headers {
    Key = "X-API-KEY",
    Authorization = "AUTHORIZATION"
}
export interface User {
    path: string;
    createTime: string;
    id: string;
    name: string;
    displayName: string;
    about: string;
    locale: string;
    premium: boolean;
    idVerified: boolean;
}
export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}
export declare enum GrantTypes {
    Exchange = "authorization_code",
    Refresh = "refresh_token"
}
export interface UserMetadata {
    sub: string;
}
