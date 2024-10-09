import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import * as Web from "./raw.js";
import { GroupsMemberships } from "./groups/memberships.js";
import { GroupsRevenue } from "./groups/revenue.js";
export class Groups extends Web.Module {
    async get(id, options) {
        return await this.request
            .groups("GET", "/groups/", {
            version: 2,
            params: {
                groupIds: id,
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 400)
                switch (response.data.errors[0]?.code) {
                    case 2:
                        throw new AppError({
                            code: "BAD_REQUEST",
                            context: "Too many groups queried",
                        });
                    case 3:
                        throw new AppError({
                            code: "NOT_FOUND",
                            context: `The group ID \` ${id} \` was not found`,
                        });
                }
            return this.handle(response).data.data;
        })
            .then((groups) => {
            const group = groups[0];
            if (!group)
                throw new AppError({
                    code: "NOT_FOUND",
                    context: `The group ID \` ${id} \` was not found`,
                });
            return {
                id: BigInt(group.id),
                name: group.name,
                description: group.description || undefined,
                owner: {
                    id: BigInt(group.owner.id),
                    type: Roblox.GroupOwnerTypes[group.owner.type],
                },
                verified: group.hasVerifiedBadge,
                createdAt: new Date(group.created),
            };
        })
            .then(async (group) => {
            if (options?.full === true)
                return await this.request
                    .groups("GET", "/groups/" + id)
                    .then((response) => {
                    return this.handle(response).data;
                })
                    .then((full) => ({
                    ...group,
                    memberCount: full.memberCount,
                    public: full.publicEntryAllowed,
                    owner: {
                        ...group.owner,
                        name: full.owner.username,
                        displayName: full.owner.displayName,
                        verified: full.owner.hasVerifiedBadge,
                    },
                    shout: full.shout && full.shout.body
                        ? {
                            message: full.shout.body,
                            author: {
                                id: BigInt(full.shout.poster.userId),
                                name: full.shout.poster.username,
                                displayName: full.shout.poster.displayName,
                                verified: full.shout.poster.hasVerifiedBadge,
                            },
                            updatedAt: new Date(full.shout.updated),
                            createdAt: new Date(full.shout.created),
                        }
                        : undefined,
                }));
            else
                return group;
        });
    }
    /** Return a group's currency (Robux) amount */
    async currency(
    /** The group ID to query */
    id) {
        return this.request
            .economy("GET", "/groups/" + id + "/currency", {
            cookie: true,
        })
            .then((response) => {
            if (!response.ok && response.status === 403)
                switch (response.data.errors[0]?.code) {
                    case 3:
                        throw new AppError({
                            code: "UNAUTHORIZED",
                            context: `Missing currency access to group \` ${id} \``,
                        });
                }
            return this.handle(response).data.robux ?? 0;
        });
    }
    /** Interact with group memberships */
    memberships = new GroupsMemberships(this);
    /** Interact with group revenue */
    revenue = new GroupsRevenue(this);
}
