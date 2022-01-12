import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useIceCreamFinance from './useIceCreamFinance';
import useRefresh from './useRefresh';

const useStakedBalanceOnParlour = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();
  const isUnlocked =icecreamFinance?.isUnlocked;
  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await icecreamFinance.getStakedSharesOnParlour());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [slowRefresh, isUnlocked, icecreamFinance]);
  return balance;
};

export default useStakedBalanceOnParlour;
