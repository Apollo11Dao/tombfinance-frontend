import { useEffect, useState } from 'react';
import useIceCreamFinance from '../useIceCreamFinance';
import { AllocationTime } from '../../icecream-finance/types';

const useUnstakeTimerParlour = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    if (icecreamFinance) {
      icecreamFinance.getUserUnstakeTime().then(setTime);
    }
  }, [icecreamFinance]);
  return time;
};

export default useUnstakeTimerParlour;
