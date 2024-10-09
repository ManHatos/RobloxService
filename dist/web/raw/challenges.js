import { AppError, TOTP } from "helpers";
export class Challenges {
    secrets;
    request;
    handle;
    constructor(raw) {
        this.secrets = raw["secrets"];
        this.request = raw.request;
        this.handle = raw.handle;
    }
    /** Continue a challenge after successfully verifying, Roblox requires calling this endpoint after any successful challenge completion */
    async continue(
    /** The challenge answer metadata */
    challenge) {
        await this.request
            .core("POST", "/challenge/v1/continue", {
            body: {
                challengeId: challenge.id,
                challengeType: challenge.type,
                challengeMetadata: JSON.stringify(challenge.metadata),
            },
            CSRF: true,
        })
            .then(this.handle);
    }
    /** Verifies a TSV challenge using a TOTP
     * @note Service web API account info must be set or fetched
     * @note Service web API TSV secret must be set
     * @note `TSV.continue` must be called before finally retrying the challenged request
     */
    async verify(
    /** The TSV challenge metadata ID */
    id, 
    /** The TSV metadata action type */
    action) {
        if (!this.secrets.web?.TSV)
            throw new AppError({
                code: "UNAUTHORIZED",
                context: "Roblox service TSV secret not set",
            });
        return await this.request
            .TSV("POST", "/users/" + this.secrets.web?.me + "/challenges/authenticator/verify", {
            body: {
                challengeId: id,
                actionType: action,
                code: TOTP.generate(this.secrets.web.TSV),
            },
            CSRF: true,
        })
            .then((response) => {
            if (!response.ok) {
                const code = response.data.errors[0]?.code;
                if (response.status === 400)
                    switch (code) {
                        case 1:
                            throw new AppError({ context: `The challenge ID \` ${id} \` is invalid\n%d` });
                        case 10:
                            throw new AppError({
                                context: `The TOTP code is invalid\nPlease ensure TSV secret is valid.\n%d`,
                            });
                    }
                else if (response.status === 403)
                    switch (code) {
                        case 9:
                            throw new AppError({
                                context: `TSV configuration is invalid\nPlease make sure the account has setup a TOTP authenticator for TSV.`,
                            });
                    }
            }
            return this.handle(response).data.verificationToken;
        });
    }
    /** Generate verification challenge metadata, by default does not remember device` */
    metadata(
    /** The verification token from successful exchange */
    token, 
    /** The TSV challenge metadata ID */
    id, 
    /** The TSV challenge action type */
    type, options) {
        return {
            actionType: type,
            challengeId: id,
            rememberDevice: options?.remember ?? false,
            verificationToken: token,
        };
    }
}
