/** Supported Roblox web APIs */
export declare enum WebAPIs {
    "core" = "apis.roblox.com",
    "users" = "users.roblox.com",
    "thumbnails" = "thumbnails.roblox.com",
    "groups" = "groups.roblox.com",
    "TSV" = "twostepverification.roblox.com",
    "economy" = "economy.roblox.com"
}
/** Base Roblox user */
export type User = {
    /** The user's unique identifier */
    id: bigint;
    /** The user's unique alterable username */
    name: string;
    /** The user's alterable display name */
    displayName: string;
};
/** Detailed Roblox user */
export type FullUser = User & {
    /** The user's description */
    description?: string;
    /** When the user was created */
    createdAt: Date;
    /** Whether the user is banned */
    banned: boolean;
    /** Whether the user has a [verified badge](https://en.help.roblox.com/hc/en-us/articles/7997207259156-Verified-Badge-FAQ) */
    verified: boolean;
};
/** Basic Roblox user with a `verified` badge indicator */
export type BadgeUser = User & Pick<FullUser, "verified">;
/** Basic Roblox user with username history and a `verified` indicator */
export type SearchUser = BadgeUser & {
    /** The user's previous usernames history */
    nameHistory: string[];
};
/** Roblox user avatar */
export type Avatar = Pick<User, "id"> & {
    /** The avatar image's state */
    state: AvatarStates;
    /** The avatar's Roblox CDN image URL */
    url?: string;
    /** The avatar's version */
    version: string;
};
/** Roblox user avatar states */
export declare enum AvatarStates {
    Error = 0,
    Completed = 1,
    InReview = 2,
    Pending = 3,
    Blocked = 4,
    TemporarilyUnavailable = 5
}
/** Base Roblox group */
export type Group = {
    /** The group's unique identifier */
    id: bigint;
    /** The group's unique alterable name */
    name: string;
    /** The group's public description */
    description?: string;
    /** The group's owner user */
    owner: Pick<User, "id"> & {
        /** The group owner's type */
        type: GroupOwnerTypes;
    };
    /** Whether the group has a [verified badge](https://en.help.roblox.com/hc/en-us/articles/7997207259156-Verified-Badge-FAQ) */
    verified: boolean;
    /** When the group was created */
    createdAt: Date;
};
/** Roblox group owner types */
export declare enum GroupOwnerTypes {
    User = 0
}
/** Detailed Roblox group */
export type FullGroup = Group & {
    owner: Group["owner"] & Pick<FullUser, "name" | "displayName" | "verified">;
    /** The group's member count */
    memberCount: number;
    /** The group's shout
     * @note Will be `undefined` if the `shout.message` is empty, the group has never set a shout or the logged in account does not have access to view the group's shout
     */
    shout?: {
        /** The shout's body/message */
        message: string;
        /** The shout's author */
        author: Omit<FullGroup["owner"], "type">;
        /** When the shout was last updated */
        updatedAt: Date;
        /** When the shout was first created */
        createdAt: Date;
    };
    /** Whether the group requires join requests */
    public: boolean;
};
/** Roblox user's group membership */
export type GroupMembership = {
    /** The related group */
    group: Omit<FullGroup, "shout" | "createdAt" | "owner"> & {
        owner: BadgeUser;
    };
    /** The member's role in the related group */
    role: GroupRole;
    /** Whether the group is the user's primary group */
    primary: boolean;
};
/** Basic Roblox group role */
export type GroupRole = {
    /** The role's unique identifier */
    id: bigint;
    /** The role's unique alterable name */
    name: string;
    /** The role's rank, roles with higher rank values can manage ones with lower rank values
     * @note All groups have at least 2 roles with ranks `255` and `0`
     * @note `255` represents the group owner's role, this role can have 1 member only (the owner)
     * @note `0` represents a guest role, this role always has 0 members and is returned in contexts where the user is not a member of the group
     */
    rank: number;
};
/** Roblox group sales history */
export type GroupSale = {
    /** The sale's unique identifier hash */
    hash: string;
    /** The sale's unique purchase token, can be matched to a user's purchase history token */
    token: string;
    /** Whether the sale is pending */
    pending: boolean;
    /** The sale's agent, represents a basic Roblox user [or group] */
    agent: {
        /** The agent's unique identifier */
        id: bigint;
        /** The agent's type */
        type: GroupSaleAgentTypes;
        /** The agent's user display name [or group name] */
        name: string;
    };
    /** The sale's purchased item details */
    item: {
        /** The item's unqiue identifier */
        id: bigint;
        /** The item's name */
        name: string;
        /** The item's type */
        type: GroupSaleItemTypes;
        /** The item's associated place, if item is a game pass */
        place?: {
            /** The place's unique identifier */
            id: bigint;
            /** The place universe's unique identifier */
            universe: bigint;
            /** The place's name */
            name: string;
        };
    };
    /** The sale's currency details */
    currency: {
        /** The currency type, `Robux` is the only known type */
        type: "Robux";
        /** The final currency amount deposited to the group after [marketplace fees](https://create.roblox.com/docs/marketplace/marketplace-fees-and-commissions)
         * @note Whether the group can access this amount is dependent on `GroupSale.pending`
         */
        amount: number;
    };
    /** When the sale was made */
    createdAt: Date;
};
/** Roblox group sales agent types */
export declare enum GroupSaleAgentTypes {
    User = 0,
    Group = 1
}
/** Roblox group sales item types */
export declare enum GroupSaleItemTypes {
    Other = 0,
    GamePass = 1,
    Asset = 2,
    DeveloperProduct = 3
}
/** Roblox group payout types */
export declare enum GroupPayoutTypes {
    Fixed = 1,
    Percentage = 2
}
/** Roblox group payout recipient types */
export declare enum GroupPayoutRecipientTypes {
    User = 0,
    Group = 1
}
