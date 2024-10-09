import { Logger, Records } from "helpers";
import { Roblox } from "../roblox.js";
/** Validate a Roblox cookie, only tests patterns */
export declare function validateCookie(cookie?: string): boolean;
/** Roblox service logger */
export declare const logger: Logger;
export declare class Secrets {
    /** Roblox service secrets store */
    protected secrets: {
        /** Roblox web secrets */
        web?: {
            /** Roblox account `.ROBLOSECURITY` cookie */
            cookie: string;
            /** Roblox account 2FA secret */
            TSV?: string;
            /** Roblox account ID, if not supplied use `Client.login` to fetch */
            me?: Roblox.User["id"];
        };
        /** Roblox open cloud secrets */
        cloud?: Records.AtLeastOne<{
            /** Roblox open cloud API key */
            key?: string;
            /** Roblox open cloud OAuth2 client */
            client?: {
                /** Roblox open cloud OAuth2 client secret */
                secret: string;
                /** Roblox open cloud OAuth2 client ID */
                id: string;
            };
        }>;
    };
    constructor(secrets?: Secrets["secrets"]);
}
