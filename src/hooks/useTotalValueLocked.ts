import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useRefresh from './useRefresh';

const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const { slowRefresh } = useRefresh();
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    async function fetchTVL() {
      try {
        setTotalValueLocked(await icecreamFinance.getTotalValueLocked());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTVL();
  }, [setTotalValueLocked, icecreamFinance, slowRefresh]);

  return totalValueLocked;
};

export default useTotalValueLocked;
