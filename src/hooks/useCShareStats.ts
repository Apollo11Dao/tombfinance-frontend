import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { TokenStat } from '../icecream-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await icecreamFinance.getShareStat());
      } catch(err){
        console.error(err)
      }
    }
    fetchSharePrice();
  }, [setStat, icecreamFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
