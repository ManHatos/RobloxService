export var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    ErrorCodes["PERMISSION_DENIED"] = "PERMISSION_DENIED";
    ErrorCodes["NOT_FOUND"] = "NOT_FOUND";
    ErrorCodes["ABORTED"] = "ABORTED";
    ErrorCodes["RESOURCE_EXHAUSTED"] = "RESOURCE_EXHAUSTED";
    ErrorCodes["CANCELLED"] = "CANCELLED";
    ErrorCodes["INTERNAL"] = "INTERNAL";
    ErrorCodes["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    ErrorCodes["UNAVAILABLE"] = "UNAVAILABLE";
})(ErrorCodes || (ErrorCodes = {}));
export var Headers;
(function (Headers) {
    Headers["Key"] = "X-API-KEY";
    Headers["Authorization"] = "AUTHORIZATION";
})(Headers || (Headers = {}));
export var GrantTypes;
(function (GrantTypes) {
    GrantTypes["Exchange"] = "authorization_code";
    GrantTypes["Refresh"] = "refresh_token";
})(GrantTypes || (GrantTypes = {}));
