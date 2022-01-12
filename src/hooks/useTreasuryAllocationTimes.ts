import { useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { AllocationTime } from '../icecream-finance/types';
import useRefresh from './useRefresh';


const useTreasuryAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const icecreamFinance = useIceCreamFinance();
  useEffect(() => {
    if (icecreamFinance) {
      icecreamFinance.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [icecreamFinance, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
