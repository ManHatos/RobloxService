export var WebAPIs;
(function (WebAPIs) {
    WebAPIs["core"] = "apis.roblox.com";
    WebAPIs["users"] = "users.roblox.com";
    WebAPIs["thumbnails"] = "thumbnails.roblox.com";
    WebAPIs["groups"] = "groups.roblox.com";
    WebAPIs["TSV"] = "twostepverification.roblox.com";
    WebAPIs["economy"] = "economy.roblox.com";
})(WebAPIs || (WebAPIs = {}));
export var AvatarStates;
(function (AvatarStates) {
    AvatarStates[AvatarStates["Error"] = 0] = "Error";
    AvatarStates[AvatarStates["Completed"] = 1] = "Completed";
    AvatarStates[AvatarStates["InReview"] = 2] = "InReview";
    AvatarStates[AvatarStates["Pending"] = 3] = "Pending";
    AvatarStates[AvatarStates["Blocked"] = 4] = "Blocked";
    AvatarStates[AvatarStates["TemporarilyUnavailable"] = 5] = "TemporarilyUnavailable";
})(AvatarStates || (AvatarStates = {}));
export var GroupOwnerTypes;
(function (GroupOwnerTypes) {
    GroupOwnerTypes[GroupOwnerTypes["User"] = 0] = "User";
})(GroupOwnerTypes || (GroupOwnerTypes = {}));
export var GroupSaleAgentTypes;
(function (GroupSaleAgentTypes) {
    GroupSaleAgentTypes[GroupSaleAgentTypes["User"] = 0] = "User";
    GroupSaleAgentTypes[GroupSaleAgentTypes["Group"] = 1] = "Group";
})(GroupSaleAgentTypes || (GroupSaleAgentTypes = {}));
export var GroupSaleItemTypes;
(function (GroupSaleItemTypes) {
    GroupSaleItemTypes[GroupSaleItemTypes["Other"] = 0] = "Other";
    GroupSaleItemTypes[GroupSaleItemTypes["GamePass"] = 1] = "GamePass";
    GroupSaleItemTypes[GroupSaleItemTypes["Asset"] = 2] = "Asset";
    GroupSaleItemTypes[GroupSaleItemTypes["DeveloperProduct"] = 3] = "DeveloperProduct";
})(GroupSaleItemTypes || (GroupSaleItemTypes = {}));
export var GroupPayoutTypes;
(function (GroupPayoutTypes) {
    GroupPayoutTypes[GroupPayoutTypes["Fixed"] = 1] = "Fixed";
    GroupPayoutTypes[GroupPayoutTypes["Percentage"] = 2] = "Percentage";
})(GroupPayoutTypes || (GroupPayoutTypes = {}));
export var GroupPayoutRecipientTypes;
(function (GroupPayoutRecipientTypes) {
    GroupPayoutRecipientTypes[GroupPayoutRecipientTypes["User"] = 0] = "User";
    GroupPayoutRecipientTypes[GroupPayoutRecipientTypes["Group"] = 1] = "Group";
})(GroupPayoutRecipientTypes || (GroupPayoutRecipientTypes = {}));
