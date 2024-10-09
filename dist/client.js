import * as Web from "./web/web.js";
import * as Cloud from "./cloud/cloud.js";
import { Secrets, logger } from "./helpers/internals.js";
/** The Roblox service allows you to interact with various Roblox web APIs */
export class Client extends Secrets {
    constructor(
    /** Credentials to be stored and used by the Roblox service */
    secrets) {
        super(secrets);
        // initialize web modules
        this.raw = { web: new Web.Raw(this.secrets), cloud: new Cloud.Raw(this.secrets) };
        this.users = new Web.Users(this.raw.web);
        this.groups = new Web.Groups(this.raw.web);
        // initialize open cloud modules
        this.cloud = {
            users: new Cloud.Users(this.raw.cloud),
            OAuth2: new Cloud.OAuth2(this.raw.cloud),
        };
    }
    /** Fetch and save the Roblox web API account */
    async login() {
        const me = await this.users.me();
        if (this.secrets.web)
            this.secrets.web.me = me.id;
        logger.info(`Logged in as @${me.name}, #${me.id}`);
    }
    raw;
    /** Roblox web user-related APIs */
    users;
    /** Roblox web group-related APIs */
    groups;
    /** Roblox open cloud client */
    cloud;
}
export * from "./helpers/utility.js";
export * from "./web/types/service.js";
export * as Cloud from "./cloud/types/service.js";
export * as WebModels from "./web/types/models.js";
export * as CloudModels from "./cloud/types/models.js";
