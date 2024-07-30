import { Arrays } from "helpers";
import * as Web from "./raw.js";
import { Roblox } from "../roblox.js";
import { UserAvatars } from "./users/avatars.js";
export declare class Users extends Web.Module {
    me(): Promise<Roblox.User>;
    get(query: Roblox.User["id"] | Roblox.User["name"]): Promise<Roblox.FullUser>;
    batch(query: Arrays.AtLeast<Roblox.User["id"]>, options?: Omit<BulkOptions, "strict">): Promise<Arrays.AtLeast<Roblox.BadgeUser>>;
    batch(query: Arrays.AtLeast<Roblox.User["name"]>, options?: BulkOptions): Promise<Arrays.AtLeast<Roblox.BadgeUser & {
        queried: string;
    }>>;
    search(query: string, options?: {
        limit?: 10 | 25 | 50 | 100;
    }): Promise<Arrays.AtLeast<Roblox.SearchUser>>;
    avatars: UserAvatars;
}
type BulkOptions = {
    banned?: true;
    strict?: true;
};
export {};
