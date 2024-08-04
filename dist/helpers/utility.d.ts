import { Roblox } from "../roblox.js";
export declare const profileURL: (id: string | number | bigint) => string;
export declare const groupURL: (id: string | number | bigint) => string;
export declare const placeURL: (id: string | number | bigint) => string;
export declare const authorizationURL: (id: string, redirect: string, scopes: Roblox.Cloud.OAuth2Scopes[], grant?: "none" | "code", security?: {
    state?: string;
    challenge?: string;
    nonce?: string;
}) => string;
