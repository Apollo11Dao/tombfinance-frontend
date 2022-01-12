import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { TokenStat } from '../icecream-finance/types';
import useRefresh from './useRefresh';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const icecreamFinance = useIceCreamFinance();
  const { slowRefresh } = useRefresh(); 

  useEffect(() => {
    async function fetchCashPrice() {
      try {
        setStat(await icecreamFinance.getCreamStatInEstimatedTWAP());
      }catch(err) {
        console.error(err);
      }
    }
    fetchCashPrice();
  }, [setStat, icecreamFinance, slowRefresh]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
