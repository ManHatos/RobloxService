export declare enum CloudAPIs {
    OAuth2 = "/oauth",
    users = "/cloud"
}
export type User = {
    id: bigint;
    name: string;
    displayName: string;
    createdAt: Date;
    description?: string;
    locale: string;
    premium: boolean;
    biometrics: boolean;
};
export declare enum OAuth2Scopes {
    OpenID = "openid",
    Profile = "profile"
}
export type TokenExhange = {
    bearer: string;
    refresh: string;
    scopes: OAuth2Scopes[];
    expiresAt: Date;
};
