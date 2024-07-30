import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export declare class Users extends Cloud.Module {
    get(user: Roblox.Cloud.User["id"]): Promise<Roblox.Cloud.User>;
}
