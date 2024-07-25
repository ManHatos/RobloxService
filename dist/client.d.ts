import Users from "./web/users.js";
export declare class Client {
    constructor(auth?: Client["auth"]);
    protected auth: {
        cookie?: string;
        TSV?: string;
    };
    private raw;
    users: Users;
}
export * from "./types/service.js";
export * as WebModels from "./types/models.js";
