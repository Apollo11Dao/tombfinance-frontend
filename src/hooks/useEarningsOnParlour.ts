import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useIceCreamFinance from './useIceCreamFinance';
import useRefresh from './useRefresh';

const useEarningsOnParlour = () => {
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();
  const isUnlocked = icecreamFinance?.isUnlocked;

  useEffect(() => {
    async function fetchBalance() {
      try {
        setBalance(await icecreamFinance.getEarningsOnParlour());
      } catch (e) {
        console.error(e);
      }
    }
    if (isUnlocked) {
      fetchBalance();
    }
  }, [isUnlocked, icecreamFinance, slowRefresh]);

  return balance;
};

export default useEarningsOnParlour;
