import { useCallback, useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCashPriceInLastTWAP = () => {
  const [price, setPrice] = useState<BigNumber>(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();

  const fetchCashPrice = useCallback(async () => {
    setPrice(await icecreamFinance.getCreamPriceInLastTWAP());
  }, [icecreamFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch CREAM price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setPrice, icecreamFinance, fetchCashPrice]);

  return price;
};

export default useCashPriceInLastTWAP;
