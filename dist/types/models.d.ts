type ArrayResponse<R> = {
    data: R[];
};
type PageResponse = {
    nextPageCursor: string | null;
    previousPageCursor: string | null;
};
export interface ErrorModel {
    errors: {
        code: number;
        message?: string;
        userFacingMessage?: string;
    }[];
}
export interface AuthenticatedUserResponse {
    id: number;
    name: string;
    displayName: string;
}
export interface GetUserResponse {
    description: string;
    created: string;
    isBanned: boolean;
    externalAppDisplayName: string | null;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}
export type MultiGetUserByNameResponse = ArrayResponse<{
    requestedUsername: string;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}>;
export type VerifiedBadgeUserResponse = ArrayResponse<{
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}>;
export type UserSearchResponse = PageResponse & ArrayResponse<{
    previousUsernames: string[];
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
}>;
export type ThumbnailsResponse = ArrayResponse<{
    targetId: number;
    state: "Error" | "Completed" | "InReview" | "Pending" | "Blocked" | "TemporarilyUnavailable";
    imageUrl: string;
    version: string;
}>;
export {};
