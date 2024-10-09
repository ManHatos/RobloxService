import { AppError } from "helpers";
import { Roblox } from "../roblox.js";
import * as Cloud from "./raw.js";
export class Users extends Cloud.Module {
    /** Return detailed user information by ID
     * @note Banned users will result in an error
     */
    async get(
    /** The user ID to query */
    user) {
        return await this.request
            .users("GET", "/users/" + user, {
            version: 2,
            key: true,
        })
            .then((response) => {
            if (!response.ok && response.data.code === Roblox.CloudModels.ErrorCodes.NOT_FOUND)
                throw new AppError({
                    context: `The user ID \` ${user} \` was not found\nThe user may have been banned from Roblox`,
                });
            return this.handle(response).data;
        })
            .then((user) => ({
            id: BigInt(user.id),
            name: user.name,
            displayName: user.displayName,
            description: user.about,
            locale: user.locale,
            premium: user.premium,
            biometrics: user.idVerified,
            createdAt: new Date(user.createTime),
        }));
    }
}
