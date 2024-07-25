import { AppError } from "helpers";
import { validateCookie } from "./helpers/utility.js";
import * as Web from "./web/raw.js";
import Users from "./web/users.js";
export class Client {
    constructor(auth) {
        if (auth?.cookie && !validateCookie(auth.cookie))
            throw new AppError({
                code: "INVALID",
                context: "Provided Roblox cookie is invalid",
            });
        this.auth = auth ?? {};
        this.raw = { web: new Web.Raw(this.auth) };
        this.users = new Users(this.raw.web);
    }
    auth = {};
    raw;
    users;
}
export * from "./types/service.js";
export * as WebModels from "./types/models.js";
