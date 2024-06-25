'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const getUserBalance = async (): Promise<{
    balance?: number,
    error?: string,
}> => {
    const { userId } = auth();

    if (!userId) {
        return { error: 'user not found' }
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { userId }
        })
        const balance = transactions.reduce((sum, transactions) => sum + transactions.amount, 0);
        return { balance };
    } catch (error) {
        return { error: 'Something went wrong, pleae try again.' }
    }
};

export default getUserBalance;