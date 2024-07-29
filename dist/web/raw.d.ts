import { Roblox } from "../roblox.js";
import { Auth } from "../helpers/internals.js";
export declare class Raw extends Auth {
    constructor(auth: Auth["auth"]);
    private challenges;
    private core;
    readonly request: Record<keyof typeof Roblox.WebAPIs, <M = any>(method: Methods, path: string, options?: Options) => Promise<ResolvedResponse<M>>>;
    handle<M>(response: ResolvedResponse<M>): ResolvedResponse<M> & {
        ok: true;
    };
}
type Methods = "GET" | "POST" | "PATCH" | "HEAD" | "PUT" | "DELETE";
type ResolvedResponse<Model = any> = (Response & {
    ok: true;
    data: Model;
}) | (Response & {
    ok: false;
    data: Roblox.WebModels.ErrorModel;
});
type Options = {
    version?: 0 | 1 | 2 | 3;
    cookie?: true;
    TSV?: true;
    CSRF?: true;
    body?: Record<string, any>;
    params?: Record<string, any>;
};
export declare class Module {
    protected auth: Raw["auth"];
    protected request: Raw["request"];
    protected handle: Raw["handle"];
    constructor(raw: Raw);
}
export declare class SubModule<M extends Module> extends Module {
    constructor(module: M);
}
export {};
