import { AppError } from "helpers";
import * as Web from "./raw.js";
import { UserAvatars } from "./users/avatars.js";
export default class Users extends Web.Module {
    async me() {
        return await this.request
            .users("GET", "/users/authenticated", {
            cookie: true,
        })
            .then((response) => {
            if (response.status === 401)
                throw new AppError({
                    code: "UNAUTHORIZED",
                    context: "Roblox service authentication failed\n%d",
                });
            return this.handle(response).data;
        });
    }
    async full(query) {
        if (typeof query === "string") {
            if (query.length < 3)
                throw new AppError({
                    code: "INVALID",
                    context: `The username \` ${query} \` is too short.`,
                });
            if (!/^(?=^[^_\n]+_?[^_\n]+$)\w{3,}$/.test(query))
                throw new AppError({
                    code: "INVALID",
                    context: `The username \` ${query} \` is invalid.`,
                });
            await this.bulk([query]).then(([user]) => {
                query = user.id;
            });
        }
        if (typeof query !== "number")
            throw new AppError();
        if (!isFinite(query) || query === 0)
            throw new AppError({
                code: "INVALID",
                context: `The user ID \` ${query} \` is invalid.`,
            });
        return await this.request
            .users("GET", "/users/" + query)
            .then((response) => {
            if (response.status === 404)
                throw new AppError({
                    code: "NOT_FOUND",
                    context: `The user ID \` ${query} \` was not found`,
                });
            return this.handle(response).data;
        })
            .then((user) => ({
            id: user.id,
            banned: user.isBanned,
            createdAt: new Date(user.created),
            description: user.description || undefined,
            displayName: user.displayName,
            name: user.name,
            verified: user.hasVerifiedBadge,
        }));
    }
    async bulk(query, options) {
        if (query.length === 0)
            throw new AppError({
                code: "INVALID",
                context: "Query is too short",
            });
        else if (query.every((name) => typeof name === "string")) {
            const users = (await this.request
                .users("POST", "/usernames/users", {
                body: {
                    usernames: query,
                    excludeBannedUsers: options?.banned ? false : true,
                },
            })
                .then((response) => {
                if (response.status === 400)
                    throw new AppError({
                        code: "BAD_REQUEST",
                        context: "Too many usernames queried",
                    });
                return this.handle(response).data?.data;
            })).filter((user) => options?.strict
                ? user.name.toLowerCase() === user.requestedUsername.toLocaleLowerCase()
                : true);
            if (users.length === 0)
                throw new AppError({
                    code: "NOT_FOUND",
                    context: "No users found",
                });
            return users.map((user) => ({
                id: user.id,
                displayName: user.displayName,
                name: user.name,
                verified: user.hasVerifiedBadge,
                queried: user.requestedUsername,
            }));
        }
        else if (query.every((id) => typeof id === "number")) {
            const users = await this.request
                .users("POST", "/users", {
                body: {
                    userIds: query,
                    excludeBannedUsers: options?.banned ? false : true,
                },
            })
                .then((response) => {
                if (response.status === 400)
                    throw new AppError({
                        code: "BAD_REQUEST",
                        context: "Too many usernames queried",
                    });
                return this.handle(response).data?.data;
            });
            if (users.length === 0)
                throw new AppError({
                    code: "NOT_FOUND",
                    context: "No users found",
                });
            return users.map((user) => ({
                id: user.id,
                displayName: user.displayName,
                name: user.name,
                verified: user.hasVerifiedBadge,
            }));
        }
        else
            throw new AppError({
                code: "BAD_REQUEST",
                context: "Query is of invalid type\nAll array members must be of type `Roblox.User`'s `id` or `name`.",
            });
    }
    search = async (query, options) => {
        if (query.length < 3)
            throw new AppError({
                code: "INVALID",
                context: `The query \` ${query} \` is too short`,
            });
        const users = await this.request
            .users("GET", "/users/search", {
            params: {
                keyword: query,
                limit: options?.limit ?? 25,
            },
        })
            .then((response) => {
            if (response.status === 400)
                throw new AppError({
                    code: "FORBIDDEN",
                    context: "The query was filtered",
                });
            return this.handle(response).data.data;
        });
        if (users.length === 0)
            throw new AppError({
                code: "NOT_FOUND",
                context: "No users found",
            });
        return users.map((user) => ({
            displayName: user.displayName,
            id: user.id,
            name: user.name,
            nameHistory: user.previousUsernames,
            verified: user.hasVerifiedBadge,
        }));
    };
    avatars = new UserAvatars(this);
}
