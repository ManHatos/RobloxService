import { Arrays } from "helpers";
import { Roblox } from "../../roblox.js";
import { Groups } from "../groups.js";
import * as Web from "../raw.js";
export declare class GroupsRevenue extends Web.SubModule<Groups> {
    /** Return a group's latest sales, by default limited to 10
     * @note Uses an undocumented endpoint with unknown behaviour, use at risk
     * @note This endpoint is extremely slow and may take a couple of seconds to fetch, increase `limit` with caution
     */
    sales(
    /** The group ID to query */
    id: Roblox.Group["id"], options?: {
        /** @default 10 */
        limit?: 10 | 25 | 50 | 100;
    }): Promise<Arrays.AtLeast<Roblox.GroupSale>>;
    /** Check whether a group member is eligible for payouts, by defaults throws if they are not a member of the group
     * @note Reqiures the logged in user to have payout permissions
     */
    eligible(
    /** The group ID to fetch */
    group: Roblox.Group["id"], 
    /** The user ID to fetch */
    user: Roblox.User["id"], options?: {
        /** Whether to throw if they are not a member of the group
         * @default true
         */
        throw?: false;
    }): Promise<boolean>;
    /** Pay out a group member in Robux from group funds
     * @note The recipient user must have been a member of the group for at least 14 days, use `revenue.eligible` to check eligibility
     * @note The current implementation only supports `GroupPayoutTypes.FixedAmount` and is limited to 1 recipient of type `GroupPayoutRecipientTypes.User`
     */
    pay(
    /** The group ID to pay from */
    group: Roblox.Group["id"], 
    /** The user ID to pay */
    user: Roblox.User["id"], 
    /** The amount of Robux to pay */
    amount: number): Promise<void>;
}
