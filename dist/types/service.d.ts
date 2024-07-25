export declare enum WebAPIs {
    "core" = "apis.roblox.com",
    "users" = "users.roblox.com",
    "thumbnails" = "thumbnails.roblox.com",
    "groups" = "groups.roblox.com",
    "TSV" = "twostepverification.roblox.com"
}
export declare enum CloudAPIs {
}
export interface User {
    id: number;
    name: string;
    displayName: string;
}
export type FullUser = User & {
    description?: string;
    createdAt: Date;
    banned: boolean;
    verified: boolean;
};
export type BatchUser = User & Pick<FullUser, "verified">;
export type SeachUser = User & Pick<FullUser, "verified"> & {
    nameHistory: string[];
};
export type Avatar = Pick<User, "id"> & {
    state: AvatarState;
    url?: string;
    version: string;
};
export declare enum AvatarState {
    Error = "Error",
    Completed = "Completed",
    InReview = "InReview",
    Pending = "Pending",
    Blocked = "Blocked",
    TemporarilyUnavailable = "TemporarilyUnavailable"
}
