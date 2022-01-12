import { useCallback, useState, useEffect } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { Bank } from '../icecream-finance';
import { PoolStats } from '../icecream-finance/types';
import config from '../config';

const useStatsForPool = (bank: Bank) => {
  const icecreamFinance = useIceCreamFinance();

  const [poolAPRs, setPoolAPRs] = useState<PoolStats>();

  const fetchAPRsForPool = useCallback(async () => {
    setPoolAPRs(await icecreamFinance.getPoolAPRs(bank));
  }, [icecreamFinance, bank]);

  useEffect(() => {
    fetchAPRsForPool().catch((err) => console.error(`Failed to fetch CBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchAPRsForPool, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPoolAPRs, icecreamFinance, fetchAPRsForPool]);

  return poolAPRs;
};

export default useStatsForPool;
