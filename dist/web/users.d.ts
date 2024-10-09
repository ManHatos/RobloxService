import { Arrays } from "helpers";
import * as Web from "./raw.js";
import { Roblox } from "../roblox.js";
import { UserAvatars } from "./users/avatars.js";
export declare class Users extends Web.Module {
    /** Return the current authenticated base user */
    me(): Promise<Roblox.User>;
    /** Return detailed user information by username or ID
     * @warning Using usernames will make 2 requests to fetch the full user, use `users.batch` for basic user information
     */
    get(
    /** The user ID or username to query */
    query: Roblox.User["id"] | Roblox.User["name"]): Promise<Roblox.FullUser>;
    /** Return multiple users' basic information by IDs, by default excludes banner users */
    batch(
    /** The user IDs to query */
    query: Arrays.AtLeast<Roblox.User["id"]>, options?: Omit<BulkOptions, "strict">): Promise<Arrays.AtLeast<Roblox.BadgeUser>>;
    /** Return multiple users' basic information by usernames, by default excludes banned users
     * @note Roblox always checks previous usernames, use `options.strict` to change this behavior
     */
    batch(
    /** The usernames to query */
    query: Arrays.AtLeast<Roblox.User["name"]>, options?: BulkOptions): Promise<Arrays.AtLeast<Roblox.BadgeUser & {
        /** The queried username
         * @note May not be equal to `User.name` unless `options.strict` is `true`
         */
        queried: string;
    }>>;
    /** Search for Roblox users by keyword, by default limited to `25`
     * @warning This endpoint has extremely high rate limits for unauthenticated requests, authentication is advised
     */
    search(
    /** The keyword to query */
    query: string, options?: {
        /** @default 25 */
        limit?: 10 | 25 | 50 | 100;
    }): Promise<Arrays.AtLeast<Roblox.SearchUser>>;
    /** Return users' avatars */
    avatars: UserAvatars;
}
type BulkOptions = {
    /** Whether to return banned users
     * @note You cannot tell the difference between banned and unbanned users if `true`
     */
    banned?: true;
    /** Whether to strictly match queried usernames and ignore previous usernames check by Roblox */
    strict?: true;
};
export {};
