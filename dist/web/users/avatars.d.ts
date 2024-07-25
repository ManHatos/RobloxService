import { Arrays } from "helpers";
import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
import Users from "../users.js";
export declare class UserAvatars extends Web.SubModule<Users> {
    full(query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        size?: "30x30" | "48x48" | "60x60" | "75x75" | "100x100" | "110x110" | "140x140" | "150x150" | "150x200" | "180x180" | "250x250" | "352x352" | "420x420" | "720x720";
        format?: "PNG" | "JPEG" | "WEBP";
        retry?: false;
    }): Promise<Arrays.AtLeast<Roblox.Avatar>>;
    bust(query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        size?: "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "150x150" | "180x180" | "352x352" | "420x420";
        format?: "PNG" | "WEBP";
        circular?: boolean;
        retry?: false;
    }): Promise<Arrays.AtLeast<Roblox.Avatar>>;
    head(query: Arrays.AtLeast<Roblox.User["id"]>, options?: {
        size?: "48x48" | "50x50" | "60x60" | "75x75" | "100x100" | "110x110" | "150x150" | "180x180" | "352x352" | "420x420" | "720x720";
        format?: "PNG" | "JPEG" | "WEBP";
        circular?: boolean;
        retry?: false;
    }): Promise<Arrays.AtLeast<Roblox.Avatar>>;
}
