import * as Web from "./web/web.js";
import * as Cloud from "./cloud/cloud.js";
import { Secrets } from "./helpers/internals.js";
/** The Roblox service allows you to interact with various Roblox web APIs */
export declare class Client extends Secrets {
    constructor(
    /** Credentials to be stored and used by the Roblox service */
    secrets?: Secrets["secrets"]);
    /** Fetch and save the Roblox web API account */
    login(): Promise<void>;
    private raw;
    /** Roblox web user-related APIs */
    users: Web.Users;
    /** Roblox web group-related APIs */
    groups: Web.Groups;
    /** Roblox open cloud client */
    cloud: {
        /** Roblox open cloud user-related APIs */
        users: Cloud.Users;
        /** Roblox open cloud OAuth2-related APIs */
        OAuth2: Cloud.OAuth2;
    };
}
export * from "./helpers/utility.js";
export * from "./web/types/service.js";
export * as Cloud from "./cloud/types/service.js";
export * as WebModels from "./web/types/models.js";
export * as CloudModels from "./cloud/types/models.js";
