import { useCallback, useEffect, useState } from 'react';
import useIceCreamFinance from '../useIceCreamFinance';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

const useEstimateCShare = (cbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const { account } = useWallet();
  const icecreamFinance = useIceCreamFinance();

  const estimateAmountOfCShare = useCallback(async () => {
    const cbondAmountBn = parseUnits(cbondAmount);
    const amount = await icecreamFinance.estimateAmountOfCShare(cbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfCShare().catch((err) => console.error(`Failed to get estimateAmountOfCShare: ${err.stack}`));
    }
  }, [account, estimateAmountOfCShare]);

  return estimateAmount;
};

export default useEstimateCShare;