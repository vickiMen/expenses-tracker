import React from 'react'
import getUserBalance from '@/app/actions/getUserBalance';
import { addCommas } from '@/lib/utils';

const Balance = async () => {

    const { balance } = await getUserBalance();

    return (
        <>
            <h4>Your Balance:</h4>
            <h2>${addCommas(Number(balance?.toFixed(2)) ?? 0)}</h2>
        </>
    )
}

export default Balance;