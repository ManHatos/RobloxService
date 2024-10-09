import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export class OAuth2 extends Cloud.Module {
    /** Exchange an authorization code for an access token
     * @note The access token is valid for only 15 minutes
     * @note The access token can be invalidated before it expires if a user revokes the authorization
     */
    async exchange(
    /** The authorization code */
    code, security) {
        return await this.request
            .OAuth2("POST", "/token", {
            client: true,
            form: {
                code,
                grant_type: Roblox.CloudModels.GrantTypes.Exchange,
                ...(security?.verifier ? { code_verifier: security.verifier } : {}),
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 401)
                throw new AppError({ context: "Invalid OAuth2 authorization code" });
            return { ...this.handle(response).data, date: response.headers.get("DATE") };
        })
            .then((response) => ({
            bearer: response.access_token,
            refresh: response.refresh_token,
            scopes: response.scope.split(" "),
            expiresAt: new Date(response.expires_in * 1000 + (response.date ? Date.parse(response.date) : Date.now())),
        }));
    }
    /** Return a bearer access token's authorized user ID */
    async authorized(
    /** The bearer access token */
    bearer) {
        // @ts-ignore
        return await this.request
            .OAuth2("GET", "/userinfo", {
            bearer,
        })
            .then((response) => {
            if (!response.ok)
                console.log(response.data);
            else
                return BigInt(response.data.sub);
        });
    }
    /** Revoke an authorization session using a refresh token
     * @note This endpoint is a mess and always returns an empty `200` response, so the promise will always resolve even if the token was not revoked or does not exist
     */
    async revoke(
    /** The refresh token */
    token) {
        await this.request
            .OAuth2("POST", "/token/revoke", {
            client: true,
            form: {
                token,
            },
        })
            .then(this.handle);
    }
}
