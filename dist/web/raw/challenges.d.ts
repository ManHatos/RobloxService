import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
export declare class Challenges {
    protected secrets: Web.Raw["secrets"];
    protected request: Web.Raw["request"];
    protected handle: Web.Raw["handle"];
    constructor(raw: Web.Raw);
    /** Continue a challenge after successfully verifying, Roblox requires calling this endpoint after any successful challenge completion */
    continue(
    /** The challenge answer metadata */
    challenge: Roblox.WebModels.ChallengeAnswer): Promise<void>;
    /** Verifies a TSV challenge using a TOTP
     * @note Service web API account info must be set or fetched
     * @note Service web API TSV secret must be set
     * @note `TSV.continue` must be called before finally retrying the challenged request
     */
    verify(
    /** The TSV challenge metadata ID */
    id: string, 
    /** The TSV metadata action type */
    action: Roblox.WebModels.TSVActionType): Promise<string>;
    /** Generate verification challenge metadata, by default does not remember device` */
    metadata(
    /** The verification token from successful exchange */
    token: string, 
    /** The TSV challenge metadata ID */
    id: string, 
    /** The TSV challenge action type */
    type: keyof typeof Roblox.WebModels.TSVActionType, options?: {
        /** Whether to remember the device */
        remember?: boolean;
    }): Roblox.WebModels.VerificationChallengeMetadata;
}
