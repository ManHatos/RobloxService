export const profileURL = (id) => "https://roblox.com/users/" + id;
export const groupURL = (id) => "https://roblox.com/groups/" + id;
export const placeURL = (id) => "https://roblox.com/games/" + id;
export const authorizationURL = (id, redirect, scopes, grant = "code", security) => "https://apis.roblox.com/oauth/v1/authorize?" +
    new URLSearchParams({
        client_id: id,
        redirect_uri: redirect,
        scope: scopes.join(" "),
        response_type: grant,
        ...(security?.state ? { state: security.state } : {}),
        ...(security?.challenge
            ? { code_challenge: security.challenge, code_challenge_method: "S256" }
            : {}),
    });
