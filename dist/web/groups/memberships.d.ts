import { Arrays } from "helpers";
import { Roblox } from "../../roblox.js";
import { Groups } from "../groups.js";
import * as Web from "../raw.js";
export declare class GroupsMemberships extends Web.SubModule<Groups> {
    get(user: Roblox.User["id"], options?: MembershipsOptions): Promise<Arrays.AtLeast<Roblox.GroupMembership>>;
    get(user: Roblox.User["id"], group: Roblox.Group["id"], options?: MembershipsOptions): Promise<Roblox.GroupMembership>;
    update(group: Roblox.Group["id"], user: Roblox.User["id"], role: Roblox.GroupRole["id"]): Promise<void>;
}
type MembershipsOptions = {
    locked?: false;
};
export {};
