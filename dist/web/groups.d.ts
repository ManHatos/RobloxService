import { Roblox } from "../roblox.js";
import * as Web from "./raw.js";
import { GroupsMemberships } from "./groups/memberships.js";
import { GroupsRevenue } from "./groups/revenue.js";
export declare class Groups extends Web.Module {
    get(id: Roblox.Group["id"]): Promise<Roblox.Group>;
    get(id: Roblox.Group["id"], options?: GroupsOptions): Promise<Roblox.FullGroup>;
    currency(id: Roblox.Group["id"]): Promise<number>;
    memberships: GroupsMemberships;
    revenue: GroupsRevenue;
}
type GroupsOptions = {
    full?: true;
};
export {};
