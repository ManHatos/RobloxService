import { Roblox } from "../roblox.js";
/** Return a Roblox user's profile page */
export declare const profileURL: (id: string | number | bigint) => string;
/** Return a Roblox group's home page */
export declare const groupURL: (id: string | number | bigint) => string;
/** Return a Roblox place (game)'s home page */
export declare const placeURL: (id: string | number | bigint) => string;
/** Return an OAuth2 authorization URL */
export declare const authorizationURL: (id: string, redirect: string, scopes: Roblox.Cloud.OAuth2Scopes[], grant?: "none" | "code", security?: {
    /** An opaque value that is passed back to the app after authorization */
    state?: string;
    /** For PKCE implementations, the result of applying a SHA-256 hashing algorithm on the `code_verifier` */
    challenge?: string;
    /** A unique value so that the generated URL cannot be reused */
    nonce?: string;
}) => string;
