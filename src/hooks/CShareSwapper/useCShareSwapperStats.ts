import { useEffect, useState } from 'react';
import useIceCreamFinance from '../useIceCreamFinance';
import { CShareSwapperStat } from '../../icecream-finance/types';
import useRefresh from '../useRefresh';

const useCShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<CShareSwapperStat>();
  const { fastRefresh/*, slowRefresh*/ } = useRefresh();
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchCShareSwapperStat() {
      try{
        if(icecreamFinance.myAccount) {
          setStat(await icecreamFinance.getCShareSwapperStat(account));
        }
      }
      catch(err){
        console.error(err);
      }
    }
    fetchCShareSwapperStat();
  }, [setStat, icecreamFinance, fastRefresh, account]);

  return stat;
};

export default useCShareSwapperStats;