import { Arrays } from "helpers";
import { Roblox } from "../../roblox.js";
import { Groups } from "../groups.js";
import * as Web from "../raw.js";
export declare class GroupsMemberships extends Web.SubModule<Groups> {
    /** Return a user's membership information for all of their groups, specify `group` to view a specific group, by default includes locked groups */
    get(
    /** The user ID to query */
    user: Roblox.User["id"], options?: MembershipsOptions): Promise<Arrays.AtLeast<Roblox.GroupMembership>>;
    /** Return a user's specific group's membership information, by default includes locked groups
     * @note This will fetch all groups the user is a member of and search for the specified group
     */
    get(
    /** The user ID to query */
    user: Roblox.User["id"], 
    /** The group ID to query */
    group: Roblox.Group["id"], options?: MembershipsOptions): Promise<Roblox.GroupMembership>;
    /** Update a group member's role */
    update(
    /** The group ID to manage */
    group: Roblox.Group["id"], 
    /** The user ID to manage */
    user: Roblox.User["id"], 
    /** The role ID to manage */
    role: Roblox.GroupRole["id"]): Promise<void>;
}
type MembershipsOptions = {
    /** Whether to include locked groups
     * @default true
     */
    locked?: false;
};
export {};
