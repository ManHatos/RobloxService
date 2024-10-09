/** Supported Roblox open cloud API routes */
export declare enum CloudAPIs {
    OAuth2 = "/oauth",
    users = "/cloud"
}
/** Base Roblox user */
export type User = {
    /** The user's unique identifier */
    id: bigint;
    /** The user's unique alterable username */
    name: string;
    /** The user's alterable display name */
    displayName: string;
    /** When the user was created */
    createdAt: Date;
    /** The user's description */
    description?: string;
    /** The user's locale as an IETF language code */
    locale: string;
    /** Whether the user is a premium subscriber */
    premium: boolean;
    /** Whether the user is ID verified */
    biometrics: boolean;
};
/** Roblox OAuth2 scopes */
export declare enum OAuth2Scopes {
    OpenID = "openid",
    Profile = "profile"
}
/** Roblox OAuth2 token exchange response */
export type TokenExhange = {
    /** The generated bearer access token
     * @note Valid for 15 minutes only
     */
    bearer: string;
    /** The refresh token, can be used to obtain new access tokens */
    refresh: string;
    /** The scopes of access granted by the token. */
    scopes: OAuth2Scopes[];
    /** When the `token` will expire */
    expiresAt: Date;
};
