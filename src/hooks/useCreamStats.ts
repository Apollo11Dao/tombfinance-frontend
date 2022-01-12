import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { TokenStat } from '../icecream-finance/types';
import useRefresh from './useRefresh';

const useCreamStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { fastRefresh } = useRefresh();
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchCreamPrice(){
      try {
        setStat(await icecreamFinance.getCreamStat());
      }
      catch(err){
        console.error(err)
      }
    }
    fetchCreamPrice();
  }, [setStat, icecreamFinance, fastRefresh]);

  return stat;
};

export default useCreamStats;
