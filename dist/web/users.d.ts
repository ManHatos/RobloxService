import { Arrays } from "helpers";
import * as Web from "./raw.js";
import { Roblox } from "../roblox.js";
import { UserAvatars } from "./users/avatars.js";
export default class Users extends Web.Module {
    me(): Promise<Roblox.User>;
    full(query: Roblox.User["id"] | Roblox.User["name"]): Promise<Roblox.FullUser>;
    bulk(query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        banned?: true;
    }): Promise<Arrays.AtLeast<Roblox.BatchUser>>;
    bulk(query: Arrays.AtLeast<Roblox.User["name"]>, options?: {
        banned?: true;
        strict?: true;
    }): Promise<Arrays.AtLeast<Roblox.BatchUser & {
        queried: string;
    }>>;
    search: (query: string, options?: {
        limit?: 10 | 25 | 50 | 100;
    }) => Promise<Arrays.AtLeast<Roblox.SeachUser>>;
    avatars: UserAvatars;
}
