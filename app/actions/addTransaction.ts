'use server';

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string,
    amount: number,
}

interface TransactionResult {
    data?: TransactionData,
    error?: string,
}

const addTransaction = async (formData: FormData): Promise<TransactionResult> => {

    console.log('formData', formData);
    const textValue = formData.get('text');
    const amountValue = formData.get('amount');

    // check for input values
    if (!textValue || textValue === '' || !amountValue) {
        return { error: 'Text or amount is missing' }
    }

    const text: string = textValue.toString(); // ensure text is a string
    const amount: number = parseFloat(amountValue.toString()); // parse amount as number

    // get logged in user
    const { userId } = auth();
    console.log('userId', userId);

    // check for user
    if (!userId) {
        return { error: 'User not found' };
    }

    try {
        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId,
            }
        })
        revalidatePath('/');
        return { data: transactionData }
    } catch (error) {
        return { error: 'Transaction not added' }
    }

};

export default addTransaction;
