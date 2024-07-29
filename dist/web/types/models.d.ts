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
export declare enum Headers {
    Cookie = "COOKIE",
    CSRF = "X-CSRF-TOKEN",
    ChallengeID = "RBLX-CHALLENGE-ID",
    ChallengeType = "RBLX-CHALLENGE-TYPE",
    ChallengeMetadata = "RBLX-CHALLENGE-METADATA"
}
export declare enum ChallengeTypes {
    Captcha = "captcha",
    TSV = "twostepverification"
}
export declare enum TSVActionType {
    "Unknown" = 0,
    "Login" = 1,
    "RobuxSpend" = 2,
    "ItemTrade" = 3,
    "Resale" = 4,
    "PasswordReset" = 5,
    "RevertAccount" = 6,
    "Generic" = 7,
    "GenericWithRecoveryCodes" = 8
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
export interface VerifyCodeResponse {
    verificationToken: string;
}
export interface ChallengeMetadata {
    userId: string;
    challengeId: string;
    shouldShowRememberDeviceCheckbox: boolean;
    rememberDevice: boolean;
    sessionCookie: string;
    verificationToken: string;
    actionType: keyof typeof TSVActionType;
    requestPath: string;
    requestMethod: string;
    sharedParameters: {
        shouldAnalyze: boolean;
        genericChallengeId: string;
        useContinueMode: boolean;
        renderNativeChallenge: boolean;
    };
}
export interface VerificationChallengeMetadata {
    verificationToken: string;
    rememberDevice: boolean;
    challengeId: string;
    actionType: keyof typeof TSVActionType;
}
export interface ChallengeAnswer {
    id: string;
    type: ChallengeTypes;
    metadata: VerificationChallengeMetadata;
}
export type GroupResponseV2 = ArrayResponse<{
    id: number;
    name: string;
    description: string;
    owner: RelatedEntityTypeResponse<GroupOwnerTypes>;
    created: string;
    hasVerifiedBadge: boolean;
}>;
type RelatedEntityTypeResponse<T> = {
    id: number;
    type: T;
    name: string;
};
export declare enum GroupOwnerTypes {
    User = "User"
}
type GroupUserModel = {
    hasVerifiedBadge: boolean;
    userId: number;
    username: string;
    displayName: string;
};
type ShoutResponse = {
    body: string;
    poster: GroupUserModel;
    created: string;
    updated: string;
};
export type GroupResponse = {
    id: number;
    name: string;
    description: string;
    owner: GroupUserModel;
    shout: null | ShoutResponse;
    memberCount: number;
    isBuildersClubOnly: boolean;
    publicEntryAllowed: boolean;
    hasVerifiedBadge: boolean;
};
export type GroupCurrency = {
    robux: number;
};
export type GroupMembershipDetailResponse = ArrayResponse<{
    group: {
        id: number;
        name: string;
        description: string;
        owner: GroupUserModel;
        shout: null;
        memberCount: number;
        isBuildersClubOnly: boolean;
        publicEntryAllowed: boolean;
        hasVerifiedBadge: boolean;
    };
    role: {
        id: number;
        name: string;
        rank: number;
    };
    isPrimaryGroup: null | boolean;
    isNotificationsEnabled: null | boolean;
}>;
export type GroupSalesTransactionsResponse = PageResponse & ArrayResponse<{
    id: 0;
    idHash: string;
    created: string;
    isPending: boolean;
    agent: {
        id: number;
        type: "User" | "Group";
        name: string;
    };
    details: {
        id: number;
        name: string;
        type: "DeveloperProduct" | "Asset" | "GamePass";
        place?: {
            placeId: number;
            universeId: number;
            name: string;
        };
    };
    currency: {
        amount: number;
        type: "Robux";
    };
    purchaseToken: string;
}>;
export type GroupPayoutEligibleResponse<id extends string> = {
    usersGroupPayoutEligibility: Record<id, "PayoutRestricted" | "Eligible" | "NotInGroup">;
};
export {};
