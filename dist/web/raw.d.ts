import { Roblox } from "../roblox.js";
import { Secrets } from "../helpers/internals.js";
export declare class Raw extends Secrets {
    constructor(secrets: Secrets["secrets"]);
    /** Internal module for dealing with challenges */
    private challenges;
    /** The heart of the web API module, handles all requests to supported Roblox web APIs */
    private core;
    /** Send direct authenticated requests to supported Roblox web APIs */
    readonly request: Record<keyof typeof Roblox.WebAPIs, <M = any>(method: Methods, path: string, options?: Options) => Promise<ResolvedResponse<M>>>;
    /** Handles generic Roblox web API responses, throws on error */
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
    /** The web API's version, will be ignored if set to `0` */
    version?: 0 | 1 | 2 | 3;
    /** Whether this endpoint requires cookie authentication */
    cookie?: true;
    /** Whether this endpoint may require two step verification (TSV), `cookie` authentication will be required if `true` */
    TSV?: true;
    /** Whether this endpoint may require CSRF validation */
    CSRF?: true;
    /** JSON request body */
    body?: Record<string, any>;
    /** Query string parameters */
    params?: Record<string, any>;
};
/** Roblox web API module template */
export declare class Module {
    protected secrets: Raw["secrets"];
    protected request: Raw["request"];
    protected handle: Raw["handle"];
    constructor(raw: Raw);
}
/** Roblox web API submodule template */
export declare class SubModule<M extends Module> extends Module {
    constructor(module: M);
}
export {};
