import { Roblox } from "../roblox.js";
import * as Web from "./raw.js";
import { GroupsMemberships } from "./groups/memberships.js";
import { GroupsRevenue } from "./groups/revenue.js";
export declare class Groups extends Web.Module {
    /** Return a group's information using its ID, use `options.full` to return full information */
    get(
    /** The group ID to query */
    id: Roblox.Group["id"]): Promise<Roblox.Group>;
    /** Return a group's full information using its ID */
    get(
    /** The group ID to query */
    id: Roblox.Group["id"], options?: GroupsOptions): Promise<Roblox.FullGroup>;
    /** Return a group's currency (Robux) amount */
    currency(
    /** The group ID to query */
    id: Roblox.Group["id"]): Promise<number>;
    /** Interact with group memberships */
    memberships: GroupsMemberships;
    /** Interact with group revenue */
    revenue: GroupsRevenue;
}
type GroupsOptions = {
    /** Whether to return full group information
     * @note This will make 2 requests to fetch full information
     * @default false
     */
    full?: true;
};
export {};
