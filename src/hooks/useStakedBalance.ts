import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useIceCreamFinance from './useIceCreamFinance';
import { ContractName } from '../icecream-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();
  const isUnlocked = icecreamFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await icecreamFinance.stakedBalanceOnBank(poolName, poolId, icecreamFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, icecreamFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, icecreamFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
