export var Headers;
(function (Headers) {
    Headers["Cookie"] = "COOKIE";
    Headers["CSRF"] = "X-CSRF-TOKEN";
    Headers["ChallengeID"] = "RBLX-CHALLENGE-ID";
    Headers["ChallengeType"] = "RBLX-CHALLENGE-TYPE";
    Headers["ChallengeMetadata"] = "RBLX-CHALLENGE-METADATA";
})(Headers || (Headers = {}));
export var ChallengeTypes;
(function (ChallengeTypes) {
    ChallengeTypes["Captcha"] = "captcha";
    ChallengeTypes["TSV"] = "twostepverification";
})(ChallengeTypes || (ChallengeTypes = {}));
export var TSVActionType;
(function (TSVActionType) {
    TSVActionType[TSVActionType["Unknown"] = 0] = "Unknown";
    TSVActionType[TSVActionType["Login"] = 1] = "Login";
    TSVActionType[TSVActionType["RobuxSpend"] = 2] = "RobuxSpend";
    TSVActionType[TSVActionType["ItemTrade"] = 3] = "ItemTrade";
    TSVActionType[TSVActionType["Resale"] = 4] = "Resale";
    TSVActionType[TSVActionType["PasswordReset"] = 5] = "PasswordReset";
    TSVActionType[TSVActionType["RevertAccount"] = 6] = "RevertAccount";
    TSVActionType[TSVActionType["Generic"] = 7] = "Generic";
    TSVActionType[TSVActionType["GenericWithRecoveryCodes"] = 8] = "GenericWithRecoveryCodes";
})(TSVActionType || (TSVActionType = {}));
export var GroupOwnerTypes;
(function (GroupOwnerTypes) {
    GroupOwnerTypes["User"] = "User";
})(GroupOwnerTypes || (GroupOwnerTypes = {}));