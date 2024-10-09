import { Records } from "helpers";
import { Roblox } from "../roblox.js";
import { Secrets } from "../helpers/internals.js";
export declare class Raw extends Secrets {
    constructor(secrets: Secrets["secrets"]);
    /** Open cloud base hostname */
    private readonly hostname;
    /** The heart of the open cloud API module, handles all requests to supported Roblox open cloud APIs */
    private core;
    /** Send direct authenticated requests to supported Roblox open cloud APIs */
    readonly request: Record<keyof typeof Roblox.Cloud.CloudAPIs, <M = any>(method: Methods, path: string, options?: Options) => Promise<ResolvedResponse<M>>>;
    /** Handles generic Roblox open cloud API responses, throws on error */
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
    /** The open cloud API's version, will be ignored if set to `0` */
    version?: 0 | 1 | 2 | 3;
    /** Whether this endpoint requires an open cloud API key */
    key?: true;
    /** Whether this endpoint requires an open cloud OAuth2 client */
    client?: true;
    /** The bearer access token to use for authentication */
    bearer?: string;
    /** Query string parameters */
    params?: Record<string, any>;
} & Partial<Records.OnlyOne<{
    /** URL encoded form data */
    form: Record<string, any>;
    /** JSON request body */
    body: Record<string, any>;
}>>;
/** Roblox open cloud API module template */
export declare class Module {
    protected secrets: Raw["secrets"];
    protected request: Raw["request"];
    protected handle: Raw["handle"];
    constructor(raw: Raw);
}
/** Roblox open cloud API submodule template */
export declare class SubModule<M extends Module> extends Module {
    constructor(module: M);
}
export {};
