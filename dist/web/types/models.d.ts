type ArrayResponse<R> = {
    /** Array of responses. */
    data: R[];
};
type PageResponse = {
    /** Cursor used to fetch next page. */
    nextPageCursor: string | null;
    /** Cursor used to fetch previous page. */
    previousPageCursor: string | null;
};
/** Generic Roblox web API error response. */
export interface ErrorModel {
    errors: {
        code: number;
        message?: string;
        userFacingMessage?: string;
    }[];
}
/** Useful Roblox web API headers used across APIs. */
export declare enum Headers {
    Cookie = "COOKIE",
    CSRF = "X-CSRF-TOKEN",
    ChallengeID = "RBLX-CHALLENGE-ID",
    ChallengeType = "RBLX-CHALLENGE-TYPE",
    ChallengeMetadata = "RBLX-CHALLENGE-METADATA"
}
/** Roblox web API challenge types for various security systems. */
export declare enum ChallengeTypes {
    Captcha = "captcha",
    TSV = "twostepverification"
}
/** Roblox TSV action types. */
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
/**
 * A response model representing absolute minimal authenticating user information.
 * No new attributes should be added to this response since it is in the critical path of app launch and we want to minimize dependencies.
 */
export interface AuthenticatedUserResponse {
    /** The user Id. */
    id: number;
    /** The user name. */
    name: string;
    /** The user DisplayName. */
    displayName: string;
}
/** A response model representing user information. */
export interface GetUserResponse {
    /** The user description. */
    description: string;
    /** When the user signed up. */
    created: string;
    /** Whether the user is banned. */
    isBanned: boolean;
    /** Unused, legacy attribute. For now always null to not disturb existing client code that might rely on its existence. */
    externalAppDisplayName: string | null;
    /** The user's verified badge status. */
    hasVerifiedBadge: boolean;
    /** The user Id. */
    id: number;
    /** The user name. */
    name: string;
    /** The user DisplayName. */
    displayName: string;
}
/** A response model specific to multi-get user by name. */
export type MultiGetUserByNameResponse = ArrayResponse<{
    /** The username the user was requested with. */
    requestedUsername: string;
    /** The user's verified badge status. */
    hasVerifiedBadge: boolean;
    /** The user Id. */
    id: number;
    /** The user name. */
    name: string;
    /** The user DisplayName. */
    displayName: string;
}>;
/** A response model specific to multi-get user. */
export type VerifiedBadgeUserResponse = ArrayResponse<{
    /** The user's verified badge status. */
    hasVerifiedBadge: boolean;
    /** The user Id. */
    id: number;
    /** The user name. */
    name: string;
    /** The user DisplayName. */
    displayName: string;
}>;
/** A user response model specific to getting a user from user search. */
export type UserSearchResponse = PageResponse & ArrayResponse<{
    /** Array of previous usernames. */
    previousUsernames: string[];
    /** The user's verified badge status. */
    hasVerifiedBadge: boolean;
    /** The user Id. */
    id: number;
    /** The user name. */
    name: string;
    /** The user DisplayName. */
    displayName: string;
}>;
/** Array response model for thumbnails. */
export type ThumbnailsResponse = ArrayResponse<{
    /** The target Id. */
    targetId: number;
    /** The state of the thumbnail. */
    state: "Error" | "Completed" | "InReview" | "Pending" | "Blocked" | "TemporarilyUnavailable";
    /** The image URL of the thumbnail. */
    imageUrl: string;
    /** The version of the thumbnail. */
    version: string;
}>;
/** Result for a successful verification. */
export interface VerifyCodeResponse {
    /** The verification token. */
    verificationToken: string;
}
/** Base64 encoded challenge metadata. */
export interface ChallengeMetadata {
    /** The user Id. */
    userId: string;
    /** The challenge Id. */
    challengeId: string;
    /** Flag indicating whether to show the 'Remember Device' checkbox. */
    shouldShowRememberDeviceCheckbox: boolean;
    /** Flag indicating whether to remember the device. */
    rememberDevice: boolean;
    /** The session cookie. */
    sessionCookie: string;
    /** The verification token. */
    verificationToken: string;
    /** The type of action being performed. */
    actionType: keyof typeof TSVActionType;
    /** Base64 encoded metadata for the challenge. */
    requestPath: string;
    /** HTTP method for the request. */
    requestMethod: string;
    /** Shared parameters for the challenge request. */
    sharedParameters: {
        /** Flag indicating whether to analyze the request. */
        shouldAnalyze: boolean;
        /** Generic challenge Id. */
        genericChallengeId: string;
        /** Flag indicating whether to use continue mode. */
        useContinueMode: boolean;
        /** Flag indicating whether to render the native challenge. */
        renderNativeChallenge: boolean;
    };
}
/** TSV challege metadata. */
export interface VerificationChallengeMetadata {
    /** Verification token from successful exchange. */
    verificationToken: string;
    /** Whether to remember this device. */
    rememberDevice: boolean;
    /** Challenge ID from decoded base64 challenge metadata. */
    challengeId: string;
    /**  */
    actionType: keyof typeof TSVActionType;
}
/** The final challenge answer. */
export interface ChallengeAnswer {
    /** The challenge ID header */
    id: string;
    /** The challenge type header */
    type: ChallengeTypes;
    /** The verification challenge metadata */
    metadata: VerificationChallengeMetadata;
}
/** A detailed group response model. */
export type GroupResponseV2 = ArrayResponse<{
    /** The group Id. */
    id: number;
    /** The group name. */
    name: string;
    /** The group description. */
    description: string;
    /** The group owner. */
    owner: RelatedEntityTypeResponse<GroupOwnerTypes>;
    /** The group creation date. */
    created: string;
    /** Whether the group has a verified badge. */
    hasVerifiedBadge: boolean;
}>;
/** Represents a related entity type response with a group owner type. */
type RelatedEntityTypeResponse<T> = {
    /** The entity Id. */
    id: number;
    /** The entity type. */
    type: T;
    /** The entity name. */
    name: string;
};
/** Group owner type with possible values. */
export declare enum GroupOwnerTypes {
    User = "User"
}
/** A model representing data about a Roblox.Platform.Membership.IUser. */
type GroupUserModel = {
    /** The user's verified badge status. */
    hasVerifiedBadge: boolean;
    /** The user Id. */
    userId: number;
    /** The user name. */
    username: string;
    /** The user DisplayName. */
    displayName: string;
};
/** A model representing a shout response. */
type ShoutResponse = {
    /** The shout's message. */
    body: string;
    /** The user who posted the shout. */
    poster: GroupUserModel;
    /** The shout's created time. */
    created: string;
    /** The shout's last updated time. */
    updated: string;
};
/** A detailed group response model. */
export type GroupResponse = {
    /** The group Id. */
    id: number;
    /** The group name. */
    name: string;
    /** The group description. */
    description: string;
    /** The group owner. */
    owner: GroupUserModel;
    /** The shout information. */
    shout: null | ShoutResponse;
    /** The number of members in the group. */
    memberCount: number;
    /** Whether the group is Builders Club only. */
    isBuildersClubOnly: boolean;
    /** Whether the group is public (no approval required). */
    publicEntryAllowed: boolean;
    /** Whether the group has a verified badge. */
    hasVerifiedBadge: boolean;
};
/** A group's currency (Robux) amount. */
export type GroupCurrency = {
    /** The amount of Robux. */
    robux: number;
};
/** Array response for group membership detail response. */
export type GroupMembershipDetailResponse = ArrayResponse<{
    /** Detailed group information. */
    group: {
        /** The group Id. */
        id: number;
        /** The group name. */
        name: string;
        /** The group description. */
        description: string;
        /** The group owner. */
        owner: GroupUserModel;
        /** The shout information. */
        shout: null;
        /** The number of members in the group. */
        memberCount: number;
        /** Whether the group is Builders Club only. */
        isBuildersClubOnly: boolean;
        /** Whether the group is public (no approval required). */
        publicEntryAllowed: boolean;
        /** Whether the group has a verified badge. */
        hasVerifiedBadge: boolean;
    };
    /** Detailed role information. */
    role: {
        /** The role Id. */
        id: number;
        /** The role name. */
        name: string;
        /** The role rank. */
        rank: number;
    };
    /** Whether the group is the user's Primary Group. */
    isPrimaryGroup: null | boolean;
    /** Whether the group notification preferences are enabled for the user. */
    isNotificationsEnabled: null | boolean;
}>;
/** The undocumented economy API to return a list of group sales. */
export type GroupSalesTransactionsResponse = PageResponse & ArrayResponse<{
    /** Weird identifier that's always set to 0. */
    id: 0;
    /** Unique hash identifier likely used for internal tracking. */
    idHash: string;
    /** The creation date of the transaction. */
    created: string;
    /** Indicates if the transaction is pending. */
    isPending: boolean;
    /** Information about the agent involved in the transaction. */
    agent: {
        /** The agent's Id. */
        id: number;
        /** The agent's type. */
        type: "User" | "Group";
        /** The agent's name. */
        name: string;
    };
    /** Details about the item involved in the transaction. */
    details: {
        /** The item Id. */
        id: number;
        /** The item name. */
        name: string;
        /** The item type. */
        type: "DeveloperProduct" | "Asset" | "GamePass";
        /** Information about the place, if applicable. */
        place?: {
            /** The place Id. */
            placeId: number;
            /** The universe Id the place belongs to. */
            universeId: number;
            /** The place name. */
            name: string;
        };
    };
    /** Information about the currency used in the transaction. */
    currency: {
        /** The amount of currency. */
        amount: number;
        /** The currency type. */
        type: "Robux";
    };
    /** The purchase token for the transaction. */
    purchaseToken: string;
}>;
/** A Group user payout eligibility check response. */
export type GroupPayoutEligibleResponse<id extends string> = {
    usersGroupPayoutEligibility: Record<id, "PayoutRestricted" | "Eligible" | "NotInGroup">;
};
export {};
