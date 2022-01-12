import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../icecream-finance/ERC20';
import useIceCreamFinance from './useIceCreamFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
        try {
            setBalance(await icecreamFinance.getBondsPurchasable());
        }
        catch(err) {
            console.error(err);
        }
      }
    fetchBondsPurchasable();
  }, [setBalance, icecreamFinance]);

  return balance;
};

export default useBondsPurchasable;
