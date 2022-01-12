import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { TokenStat } from '../icecream-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await icecreamFinance.getBondStat());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, icecreamFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
