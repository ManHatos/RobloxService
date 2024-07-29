export declare enum WebAPIs {
    "core" = "apis.roblox.com",
    "users" = "users.roblox.com",
    "thumbnails" = "thumbnails.roblox.com",
    "groups" = "groups.roblox.com",
    "TSV" = "twostepverification.roblox.com",
    "economy" = "economy.roblox.com"
}
export type User = {
    id: number;
    name: string;
    displayName: string;
};
export type FullUser = User & {
    description?: string;
    createdAt: Date;
    banned: boolean;
    verified: boolean;
};
export type BadgeUser = User & Pick<FullUser, "verified">;
export type SearchUser = BadgeUser & {
    nameHistory: string[];
};
export type Avatar = Pick<User, "id"> & {
    state: AvatarStates;
    url?: string;
    version: string;
};
export declare enum AvatarStates {
    Error = 0,
    Completed = 1,
    InReview = 2,
    Pending = 3,
    Blocked = 4,
    TemporarilyUnavailable = 5
}
export type Group = {
    id: number;
    name: string;
    description?: string;
    owner: Pick<User, "id"> & {
        type: GroupOwnerTypes;
    };
    verified: boolean;
    createdAt: Date;
};
export declare enum GroupOwnerTypes {
    User = 0
}
export type FullGroup = Group & {
    owner: Group["owner"] & Pick<FullUser, "name" | "displayName" | "verified">;
    memberCount: number;
    shout?: {
        message: string;
        author: Omit<FullGroup["owner"], "type">;
        updatedAt: Date;
        createdAt: Date;
    };
    public: boolean;
};
export type GroupMembership = {
    group: Omit<FullGroup, "shout" | "createdAt" | "owner"> & {
        owner: BadgeUser;
    };
    role: GroupRole;
    primary: boolean;
};
export type GroupRole = {
    id: number;
    name: string;
    rank: number;
};
export type GroupSale = {
    hash: string;
    token: string;
    pending: boolean;
    agent: {
        id: number;
        type: GroupSaleAgentTypes;
        name: string;
    };
    item: {
        id: number;
        name: string;
        type: GroupSaleItemTypes;
        place?: {
            id: number;
            universe: number;
            name: string;
        };
    };
    currency: {
        type: "Robux";
        amount: number;
    };
    createdAt: Date;
};
export declare enum GroupSaleAgentTypes {
    User = 0,
    Group = 1
}
export declare enum GroupSaleItemTypes {
    Other = 0,
    GamePass = 1,
    Asset = 2,
    DeveloperProduct = 3
}
export declare enum GroupPayoutTypes {
    Fixed = 1,
    Percentage = 2
}
export declare enum GroupPayoutRecipientTypes {
    User = 0,
    Group = 1
}
