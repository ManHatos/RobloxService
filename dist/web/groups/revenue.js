import { AppError } from "helpers";
import { Roblox } from "../../roblox.js";
import * as Web from "../raw.js";
export class GroupsRevenue extends Web.SubModule {
    /** Return a group's latest sales, by default limited to 10
     * @note Uses an undocumented endpoint with unknown behaviour, use at risk
     * @note This endpoint is extremely slow and may take a couple of seconds to fetch, increase `limit` with caution
     */
    async sales(
    /** The group ID to query */
    id, options) {
        // @ts-ignore
        return this.request
            .economy("GET", "/groups/" + id + "/transactions", {
            version: 2,
            cookie: true,
            params: {
                limit: options?.limit ?? 10,
                transactionType: "Sale",
            },
        })
            .then((response) => {
            if (!response.ok && response.status === 403)
                switch (response.data.errors[0]?.code) {
                    case 3:
                        throw new AppError({
                            context: `Missing access to group \` ${id} \`'s sales history`,
                        });
                }
            return this.handle(response).data.data;
        })
            .then((sales) => {
            if (sales.length === 0)
                throw new AppError({ context: "No sales found" });
            return sales.map((sale) => ({
                hash: sale.idHash,
                token: sale.purchaseToken,
                pending: sale.isPending,
                agent: {
                    id: BigInt(sale.agent.id),
                    type: Roblox.GroupSaleAgentTypes[sale.agent.type],
                    name: sale.agent.name,
                },
                currency: sale.currency,
                item: {
                    id: BigInt(sale.details.id),
                    type: Roblox.GroupSaleItemTypes[sale.details.type] ?? Roblox.GroupSaleItemTypes.Other,
                    name: sale.details.name,
                    place: sale.details.place
                        ? {
                            id: BigInt(sale.details.place.placeId),
                            universe: BigInt(sale.details.place.universeId),
                            name: sale.details.place.name,
                        }
                        : undefined,
                },
                createdAt: new Date(sale.created),
            }));
        });
    }
    /** Check whether a group member is eligible for payouts, by defaults throws if they are not a member of the group
     * @note Reqiures the logged in user to have payout permissions
     */
    async eligible(
    /** The group ID to fetch */
    group, 
    /** The user ID to fetch */
    user, options) {
        return await this.request
            .economy("GET", "/groups/" + group + "/users-payout-eligibility", {
            cookie: true,
            params: {
                userIds: user,
            },
        })
            .then((response) => {
            if (!response.ok) {
                if (response.status === 400 || user === 0n)
                    throw new AppError({ context: `The user ID \` ${user} \` was not found` });
                if (response.status === 403)
                    switch (response.data.errors[0]?.code) {
                        case 17:
                            throw new AppError({ context: `Missing payouts access to group \` ${group} \`` });
                    }
            }
            return Object.values(this.handle(response).data.usersGroupPayoutEligibility)[0];
        })
            .then((eligibility) => {
            if (!eligibility)
                throw new AppError();
            if (eligibility === "Eligible")
                return true;
            else if (eligibility === "NotInGroup" && (options?.throw ?? true))
                throw new AppError({
                    context: `The user ID \` ${user} \` is not a member of the group ID \` ${group} \``,
                });
            else
                return false;
        });
    }
    /** Pay out a group member in Robux from group funds
     * @note The recipient user must have been a member of the group for at least 14 days, use `revenue.eligible` to check eligibility
     * @note The current implementation only supports `GroupPayoutTypes.FixedAmount` and is limited to 1 recipient of type `GroupPayoutRecipientTypes.User`
     */
    async pay(
    /** The group ID to pay from */
    group, 
    /** The user ID to pay */
    user, 
    /** The amount of Robux to pay */
    amount) {
        if (amount <= 0)
            throw new AppError({ context: `The amount \` ${amount} \` is invalid` });
        await this.request
            .groups("POST", "/groups/" + group + "/payouts", {
            cookie: true,
            CSRF: true,
            TSV: true,
            body: {
                PayoutType: Roblox.GroupPayoutTypes.Fixed,
                Recipients: [
                    {
                        recipientId: user,
                        recipientType: Roblox.GroupPayoutRecipientTypes.User,
                        amount: amount,
                    },
                ],
            },
        })
            .then((response) => {
            if (!response.ok) {
                const code = response.data.errors[0]?.code;
                if (response.status === 400)
                    switch (code) {
                        case 1:
                            throw new AppError({ context: `The group ID \` ${group} \` was not found` });
                        case 12:
                            throw new AppError({
                                context: `The group \` ${group} \` does not have enough funds (${amount})`,
                            });
                        case 27:
                            throw new AppError({
                                context: `The user ID \` ${user} \` was not found\nMake sure they are a member of the group`,
                            });
                    }
                if (response.status === 403)
                    switch (code) {
                        case 23:
                            throw new AppError({ context: `Missing payouts access to group \` ${group} \`` });
                        case 28:
                            throw new AppError({
                                context: `The group \` ${group} \` has paid out recently\n%d`,
                            });
                    }
                if (response.status === 503)
                    switch (code) {
                        case 22:
                            throw new AppError({
                                context: `The payouts feature is disabled for group \` ${group} \`\nThis is usually due to Roblox locking the group. Please contact support.`,
                            });
                    }
            }
            return this.handle(response).data;
        });
    }
}
