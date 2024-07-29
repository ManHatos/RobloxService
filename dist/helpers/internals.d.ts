import { Logger } from "helpers";
import { Roblox } from "../roblox.js";
export declare function validateCookie(cookie?: string): boolean;
export declare const logger: Logger;
export declare class Auth {
    protected auth: {
        cookie?: string;
        TSV?: string;
        me?: Roblox.User["id"];
    };
    constructor(auth?: Auth["auth"]);
}
