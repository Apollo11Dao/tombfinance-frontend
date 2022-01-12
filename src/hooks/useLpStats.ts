import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { LPStat } from '../icecream-finance/types';
import useRefresh from './useRefresh';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const { slowRefresh } = useRefresh();
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchLpPrice() {
      try{
        setStat(await icecreamFinance.getLPStat(lpTicker));
      }
      catch(err){
        console.error(err);
      }
    }
    fetchLpPrice();
  }, [setStat, icecreamFinance, slowRefresh, lpTicker]);

  return stat;
};

export default useLpStats;
