import * as Web from "./web/raw.js";
import Users from "./web/users.js";
import { Auth, logger } from "./helpers/internals.js";
import { Groups } from "./web/groups.js";
export class Client extends Auth {
    constructor(auth) {
        super(auth);
        this.raw = { web: new Web.Raw(this.auth) };
        this.users = new Users(this.raw.web);
        this.groups = new Groups(this.raw.web);
    }
    async login() {
        const me = await this.users.me();
        this.auth.me = me.id;
        logger.info(`Logged in as @${me.name}, #${me.id}`);
    }
    raw;
    users;
    groups;
}
export * from "./helpers/utility.js";
export * from "./web/types/service.js";
export * as WebModels from "./web/types/models.js";
