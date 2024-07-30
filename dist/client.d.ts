import * as Web from "./web/web.js";
import * as Cloud from "./cloud/cloud.js";
import { Secrets } from "./helpers/internals.js";
export declare class Client extends Secrets {
    constructor(secrets?: Secrets["secrets"]);
    login(): Promise<void>;
    private raw;
    users: Web.Users;
    groups: Web.Groups;
    cloud: {
        users: Cloud.Users;
        OAuth2: Cloud.OAuth2;
    };
}
export * from "./helpers/utility.js";
export * from "./web/types/service.js";
export * as Cloud from "./cloud/types/service.js";
export * as WebModels from "./web/types/models.js";
export * as CloudModels from "./cloud/types/models.js";
