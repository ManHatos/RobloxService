import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export declare class Users extends Cloud.Module {
    /** Return detailed user information by ID
     * @note Banned users will result in an error
     */
    get(
    /** The user ID to query */
    user: Roblox.Cloud.User["id"]): Promise<Roblox.Cloud.User>;
}
