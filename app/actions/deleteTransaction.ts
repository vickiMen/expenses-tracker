'use server';

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const deleteTransaction = async (transactionId: string): Promise<{
    message?: string,
    error?: string,
}> => {
    const { userId } = auth();

    if (!userId) {
        return { error: 'user not found' }
    }

    try {
        await db.transaction.delete({
            where: {
                id: transactionId,
                userId
            }
        })
        revalidatePath('/');
        return { message: 'Transaction deleted successfully' };
    } catch (error) {
        return { error: 'Something went wrong, pleae try again.' }
    }
};

export default deleteTransaction;