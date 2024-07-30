import { AppError, Logger } from "helpers";
export function validateCookie(cookie) {
    const label = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_";
    if (!cookie)
        return false;
    if (!cookie.startsWith(label))
        return false;
    return new RegExp(/^[0-9a-f]+$/i).test(cookie.replace(label, ""));
}
export const logger = new Logger("Roblox");
export class Secrets {
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
