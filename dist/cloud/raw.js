import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import { Secrets, logger } from "../helpers/internals.js";
export class Raw extends Secrets {
    constructor(secrets) {
        super(secrets);
    }
    hostname = "apis.roblox.com";
    async core(route, method, path, options = {}, retries) {
        const endpoint = "https://" +
            this.hostname +
            route +
            (options.version !== 0 ? `/v${options.version ?? 1}` : "") +
            path;
        logger.info("cloud core calling: " + endpoint);
        const request = new Request(options.params ? endpoint.concat("?" + new URLSearchParams(options.params)) : endpoint, {
            method,
            body: options.body
                ? JSON.stringify(options.body, (_, value) => typeof value === "bigint" ? Number(value) : value)
                : options.form
                    ? new URLSearchParams(options.form).toString()
                    : undefined,
        });
        request.headers.set("CONTENT-TYPE", typeof options.form === "undefined" ? "application/json" : "application/x-www-form-urlencoded");
        request.headers.set("ACCEPT", "*/*");
        request.headers.set("USER-AGENT", "Mozilla/5.0 (Linux x86_64)");
        if (options.key) {
            if (this.secrets.cloud?.key)
                request.headers.set(Roblox.CloudModels.Headers.Key, this.secrets.cloud.key);
            else
                throw new AppError({ context: "Roblox open cloud module requires key authentication" });
        }
        if (options.client) {
            if (this.secrets.cloud?.client)
                request.headers.set(Roblox.CloudModels.Headers.Authorization, "Basic " +
                    Buffer.from(`${this.secrets.cloud.client.id}:${this.secrets.cloud.client.secret}`).toString("base64"));
            else
                throw new AppError({ context: "Roblox open cloud module requires an OAuth2 client" });
        }
        if (options.bearer)
            request.headers.set(Roblox.CloudModels.Headers.Authorization, "Bearer " + options.bearer);
        const response = (await fetch(request).catch((error) => {
            logger.error(error, "cloud core");
            throw new AppError({
                code: "INTERNAL",
                context: "Roblox service encountered an internal error\nPlease try again shortly. `CLOUD.CORE` fetch failed.",
            });
        }));
        try {
            if (response.headers.get("CONTENT-TYPE")?.startsWith("application/json"))
                response.data = response.data ?? (await response.json());
        }
        catch (error) {
            logger.error(error, "cloud core JSON parser");
        }
        return response;
    }
    request = Object.fromEntries(Object.entries(Roblox.Cloud.CloudAPIs).map(([key, api]) => [
        key,
        (method, path, options) => this.core(api, method, path, options),
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
            logger.error(response.data, "cloud handler, status " + response.status);
            throw new AppError({
                code: "UNKNOWN",
                context: "Roblox service has encountered an unexpected error\n%d",
            });
        }
    }
}
export class Module {
    secrets;
    request;
    handle;
    constructor(raw) {
        this.secrets = raw["secrets"];
        this.request = raw.request;
        this.handle = raw.handle;
    }
}
export class SubModule extends Module {
    constructor(module) {
        super(new Raw(module["secrets"]));
    }
}
