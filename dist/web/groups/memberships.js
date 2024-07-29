import { AppError } from "helpers";
import * as Web from "../raw.js";
export class GroupsMemberships extends Web.SubModule {
    async get(user, group, options) {
        if (typeof group === "object")
            options = group;
        return await this.request
            .groups("GET", "/users/" + user + "/groups/roles", {
            params: {
                includeLocked: options?.locked ?? true,
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 400)
                switch (response.data.errors[0]?.code) {
                    case 3:
                        throw new AppError({
                            code: "NOT_FOUND",
                            context: `The user ID \` ${user} \` was not found`,
                        });
                }
            return this.handle(response).data.data;
        })
            .then((memberships) => {
            return memberships.map((membership) => ({
                group: {
                    id: membership.group.id,
                    name: membership.group.name,
                    description: membership.group.description || undefined,
                    memberCount: membership.group.memberCount,
                    owner: {
                        id: membership.group.owner.userId,
                        name: membership.group.owner.username,
                        displayName: membership.group.owner.displayName,
                        verified: membership.group.owner.hasVerifiedBadge,
                    },
                    public: membership.group.publicEntryAllowed,
                    verified: membership.group.hasVerifiedBadge,
                },
                role: {
                    id: membership.role.id,
                    name: membership.role.name,
                    rank: membership.role.rank,
                },
                primary: membership.isPrimaryGroup ?? false,
            }));
        })
            .then((memberships) => {
            if (memberships.length === 0)
                throw new AppError({
                    code: "NOT_FOUND",
                    context: `The user ID \` ${user} \` is not a member of any group`,
                });
            if (typeof group === "number") {
                const membership = memberships.find((membership) => membership.group.id === group);
                if (!membership)
                    throw new AppError({
                        code: "NOT_FOUND",
                        context: `The user ID \` ${user} \` is not a member of the group ID \` ${group} \``,
                    });
                return membership;
            }
            return memberships;
        });
    }
    async update(group, user, role) {
        if (user === this.auth.me)
            throw new AppError({ context: "Cannot change the group role of the logged in user" });
        await this.request
            .groups("PATCH", "/groups/" + group + "/users/" + user, {
            cookie: true,
            CSRF: true,
            body: {
                roleId: role,
            },
        })
            .then((response) => {
            if (!response.ok) {
                const code = response.data.errors[0]?.code;
                if (response.status === 400)
                    switch (code) {
                        case 1:
                            throw new AppError({ context: `The group ID \` ${group} \` was not found` });
                        case 2:
                            throw new AppError({ context: `The role ID \` ${role} \` was not found` });
                        case 3:
                            throw new AppError({ context: `The user ID \` ${user} \` was not found` });
                        case 23:
                            throw new AppError({
                                context: "Cannot change the group role of the logged in user",
                            });
                        case 26:
                            throw new AppError({
                                context: `The user ID \` ${user} \` already has the \` ${role} \` role`,
                            });
                    }
                else if (response.status === 403)
                    switch (code) {
                        case 4:
                            throw new AppError({
                                context: `Missing access to either assigning the \` ${role} \` role or to manage \` ${user} \` in the group`,
                            });
                    }
            }
        });
    }
}
