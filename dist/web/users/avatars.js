import { AppError } from "helpers";
import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
import { logger } from "../../helpers/internals.js";
export class UserAvatars extends Web.SubModule {
    /** Return full body avatar shots by user IDs, defaults to `420x420` and `PNG` */
    async full(
    /** The user IDs to query */
    query, options) {
        // @ts-ignore
        return await this.request
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
                            context: "An invalid user ID was queried",
                        });
                }
            }
            return this.handle(response).data.data;
        })
            .then((avatars) => {
            return avatars.map((avatar) => ({
                id: BigInt(avatar.targetId),
                state: Roblox.AvatarStates[avatar.state],
                url: avatar.imageUrl || undefined,
                version: avatar.version,
            }));
        })
            .then(async (avatars) => {
            if (options?.retry !== false) {
                const pending = avatars
                    .filter((avatar) => avatar.state === Roblox.AvatarStates.Pending)
                    .map((avatar) => avatar.id);
                avatars = avatars.filter((avatar) => avatar.state !== Roblox.AvatarStates.Pending);
                if (pending.length !== 0) {
                    logger.warn(`Retrying ${pending.length} pending avatar(s)...`);
                    // @ts-ignore
                    avatars.push(...(await this.full(pending, options)));
                }
            }
            return avatars;
        });
    }
    /** Return bust avatar shots (head, neck, and a variable portion of chest and shoulders) by user IDs, defaults to `420x420`, `PNG` and not circular */
    async bust(
    /** The user IDs to query */
    query, options) {
        // @ts-ignore
        return await this.request
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
                            context: "An invalid user ID was queried",
                        });
                }
            }
            return this.handle(response).data.data;
        })
            .then((avatars) => {
            return avatars.map((avatar) => ({
                id: BigInt(avatar.targetId),
                state: Roblox.AvatarStates[avatar.state],
                url: avatar.imageUrl || undefined,
                version: avatar.version,
            }));
        })
            .then(async (avatars) => {
            if (options?.retry !== false) {
                const pending = avatars
                    .filter((avatar) => avatar.state === Roblox.AvatarStates.Pending)
                    .map((avatar) => avatar.id);
                avatars = avatars.filter((avatar) => avatar.state !== Roblox.AvatarStates.Pending);
                if (pending.length !== 0) {
                    logger.warn(`Retrying ${pending.length} pending avatar(s)...`);
                    // @ts-ignore
                    avatars.push(...(await this.bust(pending, options)));
                }
            }
            return avatars;
        });
    }
    /** Return avatar head shots by user IDs, defaults to `420x420`, `PNG` and not circular */
    async head(
    /** The user IDs to query */
    query, options) {
        // @ts-ignore
        return await this.request
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
                            context: "An invalid user ID was queried",
                        });
                }
            }
            return this.handle(response).data.data;
        })
            .then((avatars) => {
            return avatars.map((avatar) => ({
                id: BigInt(avatar.targetId),
                state: Roblox.AvatarStates[avatar.state],
                url: avatar.imageUrl || undefined,
                version: avatar.version,
            }));
        })
            .then(async (avatars) => {
            if (options?.retry !== false) {
                const pending = avatars
                    .filter((avatar) => avatar.state === Roblox.AvatarStates.Pending)
                    .map((avatar) => avatar.id);
                avatars = avatars.filter((avatar) => avatar.state !== Roblox.AvatarStates.Pending);
                if (pending.length !== 0) {
                    logger.warn(`Retrying ${pending.length} pending avatar(s)...`);
                    // @ts-ignore
                    avatars.push(...(await this.head(pending, options)));
                }
            }
            return avatars;
        });
    }
}
