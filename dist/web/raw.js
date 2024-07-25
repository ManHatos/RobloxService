import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import { logger } from "../helpers/internals.js";
import { validateCookie } from "../helpers/utility.js";
export class Raw {
    constructor(auth) {
        this.auth = auth;
    }
    auth;
    async core(api, method, path, options = {}, authorization) {
        const endpoint = "https://" + api + (options.version !== 0 ? `/v${options.version ?? 1}` : "") + path;
        logger.info("web core calling: " + endpoint);
        const request = new Request(options.params ? endpoint.concat("?" + new URLSearchParams(options.params)) : endpoint, {
            method,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        request.headers.set("CONTENT-TYPE", "application/json");
        request.headers.set("ACCEPT", "*/*");
        if (validateCookie(this.auth.cookie))
            request.headers.set("COOKIE", `.ROBLOSECURITY=` + this.auth.cookie);
        else if (!options.cookie)
            logger.warn("cookie not supplied, service not authenticated");
        else if (this.auth.cookie && !validateCookie(this.auth.cookie))
            throw new AppError({
                code: "INVALID",
                context: "Provided Roblox cookie is invalid",
            });
        else
            throw new AppError({
                code: "UNAUTHORIZED",
                context: "Roblox module requires authentication\n%d",
            });
        if (authorization?.csrf)
            request.headers.set("X-CSRF-TOKEN", authorization.csrf);
        if (authorization?.tsv) {
            request.headers.set("RBLX-CHALLENGE-ID", authorization.tsv.id);
            request.headers.set("RBLX-CHALLENGE-TYPE", "twostepverification");
            request.headers.set("RBLX-CHALLENGE-METADATA", authorization.tsv.metadata);
        }
        let response = await fetch(request).catch((error) => {
            logger.error(error, "web core");
            throw new AppError({
                code: "INTERNAL",
                context: "Roblox service encountered an internal error\nPlease try again shortly. `WEB.CORE` fetch failed.",
            });
        });
        if (options.csrf === true && !authorization?.csrf && response.status === 403) {
            logger.warn("attempting CSRF token validation, retrying request...");
            const CSRFToken = response.headers.get("X-CSRF-TOKEN");
            if (typeof CSRFToken !== "string")
                throw new AppError({
                    code: "UNKNOWN",
                    context: "Roblox service CSRF failed",
                });
            response = await this.core(api, method, path, options, { csrf: CSRFToken });
        }
        const resolved = response.clone();
        resolved.data = await resolved.json();
        return resolved;
    }
    request = Object.fromEntries(Object.entries(Roblox.WebAPIs).map(([key, api]) => [
        key,
        (method, path, options) => this.core(api, method, path, ["core"].includes(key) ? { ...options, version: 0 } : options),
    ]));
    handle(response) {
        if (response.ok)
            return response;
        else if (response.status === 429)
            throw new AppError({
                code: "TOO_MANY_REQUESTS",
                context: "Roblox service temporarily blocked\n%d",
            });
        else if (response.status >= 500)
            throw new AppError({
                code: "EXTERNAL",
                context: "Roblox service is unavailable\nPlease try again later.",
            });
        else {
            logger.error(response.data, "web handler, status " + response.status);
            throw new AppError({
                code: "UNKNOWN",
                context: "Roblox service has encountered an unexpected error\n%d",
            });
        }
    }
}
export class Module {
    request;
    handle;
    constructor({ request, handle }) {
        this.request = request;
        this.handle = handle;
    }
}
export class SubModule {
    request;
    handle;
    constructor(module) {
        this.request = module["request"];
        this.handle = module["handle"];
    }
}
