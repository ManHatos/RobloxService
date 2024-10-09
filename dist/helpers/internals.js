import { AppError, Logger } from "helpers";
/** Validate a Roblox cookie, only tests patterns */
export function validateCookie(cookie) {
    const label = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_";
    if (!cookie)
        return false;
    if (!cookie.startsWith(label))
        return false;
    return new RegExp(/^[0-9a-f]+$/i).test(cookie.replace(label, ""));
}
/** Roblox service logger */
export const logger = new Logger("Roblox");
export class Secrets {
    /** Roblox service secrets store */
    secrets = {};
    constructor(secrets) {
        if (secrets?.web?.cookie && !validateCookie(secrets.web.cookie))
            throw new AppError({
                code: "INVALID",
                context: "Provided Roblox cookie is invalid",
            });
        this.secrets = secrets ?? {};
    }
}
