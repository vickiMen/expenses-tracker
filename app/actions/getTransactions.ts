'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Transaction } from "@/types/transactions";

const getTransactions = async (): Promise<{
    transactions?: Transaction[],
    error?: string,
}> => {
    const { userId } = auth();

    if (!userId) {
        return { error: 'user not found' }
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
        
        return { transactions };

    } catch (error) {
        return { error: 'Something went wrong, pleae try again.' }
    }
};

export default getTransactions;