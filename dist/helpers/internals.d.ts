import { Logger, Records } from "helpers";
import { Roblox } from "../roblox.js";
export declare function validateCookie(cookie?: string): boolean;
export declare const logger: Logger;
export declare class Secrets {
    protected secrets: {
        web?: {
            cookie: string;
            TSV?: string;
            me?: Roblox.User["id"];
        };
        cloud?: Records.AtLeastOne<{
            key?: string;
            client?: {
                secret: string;
                id: string;
            };
        }>;
    };
    constructor(secrets?: Secrets["secrets"]);
}
