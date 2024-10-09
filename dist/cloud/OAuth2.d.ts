import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export declare class OAuth2 extends Cloud.Module {
    /** Exchange an authorization code for an access token
     * @note The access token is valid for only 15 minutes
     * @note The access token can be invalidated before it expires if a user revokes the authorization
     */
    exchange(
    /** The authorization code */
    code: string, security?: {
        /** For PCKE implementations, the code verifier that was used to generate the `code_challenge` */
        verifier?: string;
    }): Promise<Roblox.Cloud.TokenExhange>;
    /** Return a bearer access token's authorized user ID */
    authorized(
    /** The bearer access token */
    bearer: Roblox.Cloud.TokenExhange["bearer"]): Promise<Roblox.Cloud.User["id"]>;
    /** Revoke an authorization session using a refresh token
     * @note This endpoint is a mess and always returns an empty `200` response, so the promise will always resolve even if the token was not revoked or does not exist
     */
    revoke(
    /** The refresh token */
    token: Roblox.Cloud.TokenExhange["refresh"]): Promise<void>;
}
