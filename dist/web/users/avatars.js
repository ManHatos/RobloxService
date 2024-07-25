import { AppError } from "helpers";
import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
import { logger } from "../../helpers/internals.js";
export class UserAvatars extends Web.SubModule {
    async full(query, options) {
        const avatars = await this.request
            .thumbnails("GET", "/users/avatar", {
            params: {
                userIds: String(query),
                size: options?.size ?? "420x420",
                format: options?.format ?? "PNG",
                isCircular: false,
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 400) {
                switch (response.data.errors?.[0]?.code) {
                    case 1:
                        throw new AppError({
                            code: "INVALID",
                            context: `Too many avatars requested (${query.length})`,
                        });
                    case 4:
                        throw new AppError({
                            code: "INVALID",
                            context: "An invalid user ID was requested",
                        });
                }
            }
            return this.handle(response).data.data;
        });
        let transformed = avatars.map((avatar) => ({
            id: avatar.targetId,
            state: avatar.state,
            url: avatar.imageUrl || undefined,
            version: avatar.version,
        }));
        if (options?.retry !== false) {
            const pending = transformed
                .filter((avatar) => avatar.state === Roblox.AvatarState.Pending)
                .map((avatar) => avatar.id);
            transformed = transformed.filter((avatar) => avatar.state !== Roblox.AvatarState.Pending);
            if (pending.length !== 0) {
                logger.warn(`Retrying ${pending.length} pending avatar(s)...`);
                transformed.push(...(await this.full(pending, options)));
            }
        }
        return transformed;
    }
    async bust(query, options) {
        const avatars = await this.request
            .thumbnails("GET", "/users/avatar-bust", {
            params: {
                userIds: String(query),
                size: options?.size ?? "420x420",
                format: options?.format ?? "PNG",
                isCircular: options?.circular ?? false,
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 400) {
                switch (response.data.errors?.[0]?.code) {
                    case 1:
                        throw new AppError({
                            code: "INVALID",
                            context: `Too many avatars requested (${query.length})`,
                        });
                    case 4:
                        throw new AppError({
                            code: "INVALID",
                            context: "An invalid user ID was requested",
                        });
                }
            }
            return this.handle(response).data.data;
        });
        let transformed = avatars.map((avatar) => ({
            id: avatar.targetId,
            state: avatar.state,
            url: avatar.imageUrl || undefined,
            version: avatar.version,
        }));
        if (options?.retry !== false) {
            const pending = transformed
                .filter((avatar) => avatar.state === Roblox.AvatarState.Pending)
                .map((avatar) => avatar.id);
            transformed = transformed.filter((avatar) => avatar.state !== Roblox.AvatarState.Pending);
            if (pending.length !== 0) {
                logger.warn(`Retrying ${pending.length} pending avatar(s)...`);
                transformed.push(...(await this.full(pending, options)));
            }
        }
        return transformed;
    }
    async head(query, options) {
        const avatars = await this.request
            .thumbnails("GET", "/users/avatar-headshot", {
            params: {
                userIds: String(query),
                size: options?.size ?? "420x420",
                format: options?.format ?? "PNG",
                isCircular: options?.circular ?? false,
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 400) {
                switch (response.data.errors?.[0]?.code) {
                    case 1:
                        throw new AppError({
                            code: "INVALID",
                            context: `Too many avatars requested (${query.length})`,
                        });
                    case 4:
                        throw new AppError({
                            code: "INVALID",
                            context: "An invalid user ID was requested",
                        });
                }
            }
            return this.handle(response).data.data;
        });
        let transformed = avatars.map((avatar) => ({
            id: avatar.targetId,
            state: avatar.state,
            url: avatar.imageUrl || undefined,
            version: avatar.version,
        }));
        if (options?.retry !== false) {
            const pending = transformed
                .filter((avatar) => avatar.state === Roblox.AvatarState.Pending)
                .map((avatar) => avatar.id);
            transformed = transformed.filter((avatar) => avatar.state !== Roblox.AvatarState.Pending);
            if (pending.length !== 0) {
                logger.warn(`Retrying ${pending.length} pending avatar(s)...`);
                transformed.push(...(await this.full(pending, options)));
            }
        }
        return transformed;
    }
}
