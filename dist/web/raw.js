import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import { Auth, logger } from "../helpers/internals.js";
import { validateCookie } from "../helpers/internals.js";
import { Challenges } from "./raw/challenges.js";
export class Raw extends Auth {
    constructor(auth) {
        super(auth);
        this.challenges = new Challenges(this);
    }
    challenges;
    async core(api, method, path, options = {}, authorization) {
        const endpoint = "https://" + api + (options.version !== 0 ? `/v${options.version ?? 1}` : "") + path;
        logger.info("web core calling: " + endpoint);
        const request = new Request(options.params ? endpoint.concat("?" + new URLSearchParams(options.params)) : endpoint, {
            method,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        request.headers.set("CONTENT-TYPE", "application/json");
        request.headers.set("ACCEPT", "*/*");
        request.headers.set("USER-AGENT", "Mozilla/5.0 (Linux x86_64)");
        if (options.TSV === true)
            options.cookie = true;
        if (validateCookie(this.auth.cookie))
            request.headers.set(Roblox.WebModels.Headers.Cookie, `.ROBLOSECURITY=` + this.auth.cookie);
        else if (!options.cookie)
            logger.warn("cookie not supplied, service not authenticated");
        else if (!this.auth.cookie)
            throw new AppError({
                code: "UNAUTHORIZED",
                context: "Roblox web module requires authentication\n%d",
            });
        else
            throw new AppError({
                code: "INVALID",
                context: "Provided Roblox cookie is invalid",
            });
        if (options.TSV && !this.auth.TSV)
            throw new AppError({
                code: "UNAUTHORIZED",
                context: "Roblox web module requires TSV\nThe Roblox web API core expected a TSV secret.\n%d",
            });
        if (options.TSV && !this.auth.me)
            throw new AppError({
                code: "UNAUTHORIZED",
                context: "Roblox web module requires TSV\nThe Roblox web API core expected logged in account data.\n",
            });
        if (authorization?.CSRF)
            request.headers.set(Roblox.WebModels.Headers.CSRF, authorization.CSRF);
        if (authorization?.TSV) {
            request.headers.set(Roblox.WebModels.Headers.ChallengeType, authorization.TSV.type);
            request.headers.set(Roblox.WebModels.Headers.ChallengeID, authorization.TSV.id);
            request.headers.set(Roblox.WebModels.Headers.ChallengeMetadata, Buffer.from(JSON.stringify(authorization.TSV.metadata)).toString("base64"));
        }
        let response = await fetch(request).catch((error) => {
            logger.error(error, "web core");
            throw new AppError({
                code: "INTERNAL",
                context: "Roblox service encountered an internal error\nPlease try again shortly. `WEB.CORE` fetch failed.",
            });
        });
        if (options.CSRF === true && !authorization?.CSRF && response.status === 403) {
            logger.warn("attempting CSRF token validation, retrying request...");
            const CSRFToken = response.headers.get(Roblox.WebModels.Headers.CSRF);
            if (typeof CSRFToken !== "string")
                throw new AppError({
                    code: "INTERNAL",
                    context: "Roblox service CSRF failed",
                });
            response = await this.core(api, method, path, options, { CSRF: CSRFToken });
        }
        if (options.TSV === true &&
            !authorization?.TSV &&
            authorization?.CSRF &&
            response.status === 403) {
            logger.warn("attempting two step verification...");
            const encodedMetadata = response.headers.get(Roblox.WebModels.Headers.ChallengeMetadata);
            if (!encodedMetadata)
                throw new AppError();
            const challenge = {
                id: response.headers.get(Roblox.WebModels.Headers.ChallengeID),
                type: response.headers.get(Roblox.WebModels.Headers.ChallengeType),
                metadata: JSON.parse(String(Buffer.from(encodedMetadata, "base64"))),
            };
            if (Object.values(challenge).some((header) => typeof header === "undefined"))
                throw new AppError({
                    code: "UNKNOWN",
                    context: "Roblox service TSV failed",
                });
            const metadata = this.challenges.metadata(await this.challenges.verify(challenge.metadata.challengeId, Roblox.WebModels.TSVActionType[challenge.metadata.actionType]), challenge.metadata.challengeId, challenge.metadata.actionType);
            const challengeAnswer = {
                id: challenge.id,
                type: challenge.type,
                metadata,
            };
            await this.challenges.continue(challengeAnswer);
            response = await this.core(api, method, path, options, {
                TSV: challengeAnswer,
                CSRF: authorization.CSRF,
            });
        }
        const resolved = response;
        resolved.data = resolved.data ?? (await resolved.json());
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
    auth;
    request;
    handle;
    constructor(raw) {
        this.auth = raw["auth"];
        this.request = raw.request;
        this.handle = raw.handle;
    }
}
export class SubModule extends Module {
    constructor(module) {
        super(new Raw(module["auth"]));
    }
}
