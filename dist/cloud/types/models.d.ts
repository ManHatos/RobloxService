/** Roblox open cloud API error response. */
export interface ErrorModel {
    code: ErrorCodes;
    message: string;
    details?: object[];
}
/** Roblox open cloud API error codes. */
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
/** Useful Roblox open cloud API headers used across APIs. */
export declare enum Headers {
    Key = "X-API-KEY",
    Authorization = "AUTHORIZATION"
}
/** Represents any registered user of Roblox. */
export interface User {
    /** The resource path of the user. Format: users/{user}. */
    path: string;
    /** The timestamp at which the user was created. This string is formatted as a Timestamp. Output Only. */
    createTime: string;
    /** Unique ID that identifies a user in Roblox. Output Only. */
    id: string;
    /** Unique username for a user in Roblox. */
    name: string;
    /** Display name for the user. */
    displayName: string;
    /** User-defined information about themselves. */
    about: string;
    /** Current locale selected by the user. Returns IETF language code. */
    locale: string;
    /** Whether the user is a premium user. Output Only. */
    premium: boolean;
    /** Specifies if the user is ID-verified. Output Only. */
    idVerified: boolean;
}
/** Represents an OAuth2 token response. */
export interface TokenResponse {
    /** The access token to use for authentication. */
    access_token: string;
    /** The refresh token to use for obtaining new access tokens. */
    refresh_token: string;
    /** The type of token issued. */
    token_type: string;
    /** The time in seconds until the token expires. */
    expires_in: number;
    /** The scope of access granted by the token. */
    scope: string;
}
/** OAuth2 */
export declare enum GrantTypes {
    Exchange = "authorization_code",
    Refresh = "refresh_token"
}
/** Represents an OAuth2 user metadata response. */
export interface UserMetadata {
    sub: string;
}
