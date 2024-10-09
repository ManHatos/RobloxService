/** Return a Roblox user's profile page */
export const profileURL = (
/** The user ID */
id) => "https://roblox.com/users/" + id;
/** Return a Roblox group's home page */
export const groupURL = (
/** The group ID */
id) => "https://roblox.com/groups/" + id;
/** Return a Roblox place (game)'s home page */
export const placeURL = (
/** The place ID */
id) => "https://roblox.com/games/" + id;
/** Return an OAuth2 authorization URL */
export const authorizationURL = (
/** The client ID */
id, 
/** The redirect URI */
redirect, 
/** The scopes to request */
scopes, 
/** The response grant type */
grant = "code", security) => "https://apis.roblox.com/oauth/v1/authorize?" +
    new URLSearchParams({
        client_id: id,
        redirect_uri: redirect,
        scope: scopes.join(" "),
        response_type: grant,
        ...(security?.state ? { state: security.state } : {}),
        ...(security?.nonce ? { nonce: security.nonce } : {}),
        ...(security?.challenge
            ? { code_challenge: security.challenge, code_challenge_method: "S256" }
            : {}),
    });
