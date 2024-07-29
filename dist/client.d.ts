import Users from "./web/users.js";
import { Auth } from "./helpers/internals.js";
import { Groups } from "./web/groups.js";
export declare class Client extends Auth {
    constructor(auth?: Auth["auth"]);
    login(): Promise<void>;
    private raw;
    users: Users;
    groups: Groups;
}
export * from "./helpers/utility.js";
export * from "./web/types/service.js";
export * as WebModels from "./web/types/models.js";
