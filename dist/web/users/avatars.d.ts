import { Arrays } from "helpers";
import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
import { Users } from "../users.js";
export declare class UserAvatars extends Web.SubModule<Users> {
    /** Return full body avatar shots by user IDs, defaults to `420x420` and `PNG` */
    full(
    /** The user IDs to query */
    query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        /** @default "420x420" */
        size?: "30x30" | "48x48" | "60x60" | "75x75" | "100x100" | "110x110" | "140x140" | "150x150" | "150x200" | "180x180" | "250x250" | "352x352" | "420x420" | "720x720";
        /** @default "PNG" */
        format?: "PNG" | "JPEG" | "WEBP";
        /** Whether to retry pending avatars
         * @default true
         */
        retry?: false;
    }): Promise<Arrays.AtLeast<Roblox.Avatar>>;
    /** Return bust avatar shots (head, neck, and a variable portion of chest and shoulders) by user IDs, defaults to `420x420`, `PNG` and not circular */
    bust(
    /** The user IDs to query */
    query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        /** @default "420x420" */
        size?: "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "150x150" | "180x180" | "352x352" | "420x420";
        /** @default "PNG" */
        format?: "PNG" | "WEBP";
        /** @default false */
        circular?: true;
        /** Whether to retry pending avatars
         * @default true
         */
        retry?: false;
    }): Promise<Arrays.AtLeast<Roblox.Avatar>>;
    /** Return avatar head shots by user IDs, defaults to `420x420`, `PNG` and not circular */
    head(
    /** The user IDs to query */
    query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        /** @default "420x420" */
        size?: "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "110x110" | "150x150" | "180x180" | "352x352" | "420x420" | "720x720";
        /** @default "PNG" */
        format?: "PNG" | "JPEG" | "WEBP";
        /** @default false */
        circular?: true;
        /** Whether to retry pending avatars
         * @default true
         */
        retry?: false;
    }): Promise<Arrays.AtLeast<Roblox.Avatar>>;
}
