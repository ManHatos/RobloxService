import * as Web from "./web/web.js";
import * as Cloud from "./cloud/cloud.js";
import { Secrets, logger } from "./helpers/internals.js";
export class Client extends Secrets {
    constructor(secrets) {
        super(secrets);
        this.raw = { web: new Web.Raw(this.secrets), cloud: new Cloud.Raw(this.secrets) };
        this.users = new Web.Users(this.raw.web);
        this.groups = new Web.Groups(this.raw.web);
        this.cloud = {
            users: new Cloud.Users(this.raw.cloud),
            OAuth2: new Cloud.OAuth2(this.raw.cloud),
        };
    }
    async login() {
        const me = await this.users.me();
        if (this.secrets.web)
            this.secrets.web.me = me.id;
        logger.info(`Logged in as @${me.name}, #${me.id}`);
    }
    raw;
    users;
    groups;
    cloud;
}
export * from "./helpers/utility.js";
export * from "./web/types/service.js";
export * as Cloud from "./cloud/types/service.js";
export * as WebModels from "./web/types/models.js";
export * as CloudModels from "./cloud/types/models.js";
