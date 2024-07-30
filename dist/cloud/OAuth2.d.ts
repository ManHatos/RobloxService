import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export declare class OAuth2 extends Cloud.Module {
    exchange(code: string, security?: {
        verifier?: string;
    }): Promise<Roblox.Cloud.TokenExhange>;
    authorized(bearer: Roblox.Cloud.TokenExhange["bearer"]): Promise<Roblox.Cloud.User["id"]>;
    revoke(token: Roblox.Cloud.TokenExhange["refresh"]): Promise<void>;
}
