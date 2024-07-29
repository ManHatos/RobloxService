import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
export declare class Challenges {
    protected auth: Web.Raw["auth"];
    protected request: Web.Raw["request"];
    protected handle: Web.Raw["handle"];
    constructor(raw: Web.Raw);
    continue(challenge: Roblox.WebModels.ChallengeAnswer): Promise<void>;
    verify(id: string, action: Roblox.WebModels.TSVActionType): Promise<string>;
    metadata(token: string, id: string, type: keyof typeof Roblox.WebModels.TSVActionType, options?: {
        remember?: boolean;
    }): Roblox.WebModels.VerificationChallengeMetadata;
}
