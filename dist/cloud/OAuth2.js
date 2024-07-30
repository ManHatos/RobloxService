import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export class OAuth2 extends Cloud.Module {
    async exchange(code, security) {
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
    async authorized(bearer) {
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
    async revoke(token) {
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
