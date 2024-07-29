import { Arrays } from "helpers";
import { Roblox } from "../../roblox.js";
import { Groups } from "../groups.js";
import * as Web from "../raw.js";
export declare class GroupsRevenue extends Web.SubModule<Groups> {
    sales(id: Roblox.Group["id"], options?: {
        limit?: 10 | 25 | 50 | 100;
    }): Promise<Arrays.AtLeast<Roblox.GroupSale>>;
    eligible(group: Roblox.Group["id"], user: Roblox.User["id"], options?: {
        throw?: false;
    }): Promise<boolean>;
    pay(group: Roblox.Group["id"], user: Roblox.User["id"], amount: number): Promise<void>;
}
