import { Roblox } from "../roblox.js";
export declare class Raw {
    constructor(auth: Raw["auth"]);
    private auth;
    private core;
    readonly request: Record<keyof typeof Roblox.WebAPIs, <M = any>(method: Methods, path: string, options?: Options) => Promise<ResolvedResponse<M>>>;
    handle<M>(response: ResolvedResponse<M>): ResolvedResponse<M> & {
        ok: true;
    };
}
type Methods = "GET" | "POST" | "PATCH" | "HEAD" | "PUT" | "DELETE";
type Options = {
    version?: 0 | 1 | 2 | 3;
    cookie?: true;
    csrf?: true;
    tsv?: true;
    body?: Record<string, any>;
    params?: Record<string, any>;
};
type ResolvedResponse<Model = any> = (Response & {
    ok: true;
} & {
    data: Model;
}) | (Response & {
    ok: false;
} & {
    data: Roblox.WebModels.ErrorModel;
});
export declare class Module {
    protected request: Raw["request"];
    protected handle: Raw["handle"];
    constructor({ request, handle }: Raw);
}
export declare class SubModule<M extends Module> {
    protected request: Raw["request"];
    protected handle: Raw["handle"];
    constructor(module: M);
}
export {};
