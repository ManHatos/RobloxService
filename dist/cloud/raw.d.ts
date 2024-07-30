import { Records } from "helpers";
import { Roblox } from "../roblox.js";
import { Secrets } from "../helpers/internals.js";
export declare class Raw extends Secrets {
    constructor(secrets: Secrets["secrets"]);
    private readonly hostname;
    private core;
    readonly request: Record<keyof typeof Roblox.Cloud.CloudAPIs, <M = any>(method: Methods, path: string, options?: Options) => Promise<ResolvedResponse<M>>>;
    handle<M>(response: ResolvedResponse<M>): ResolvedResponse<M> & {
        ok: true;
    };
}
type Methods = "GET" | "POST";
type ResolvedResponse<Model = any> = (Response & {
    ok: true;
    data: Model;
}) | (Response & {
    ok: false;
    data: Roblox.CloudModels.ErrorModel;
});
type Options = {
    version?: 0 | 1 | 2 | 3;
    key?: true;
    client?: true;
    bearer?: string;
    params?: Record<string, any>;
} & Partial<Records.OnlyOne<{
    form: Record<string, any>;
    body: Record<string, any>;
}>>;
export declare class Module {
    protected secrets: Raw["secrets"];
    protected request: Raw["request"];
    protected handle: Raw["handle"];
    constructor(raw: Raw);
}
export declare class SubModule<M extends Module> extends Module {
    constructor(module: M);
}
export {};
