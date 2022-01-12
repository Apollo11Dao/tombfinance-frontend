import { useCallback, useEffect, useState } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useStakedBalanceOnParlour from './useStakedBalanceOnParlour';

const useParlourVersion = () => {
  const [parlourVersion, setParlourVersion] = useState('latest');
  const icecreamFinance = useIceCreamFinance();
  const stakedBalance = useStakedBalanceOnParlour();

  const updateState = useCallback(async () => {
    setParlourVersion(await icecreamFinance.fetchParlourVersionOfUser());
  }, [icecreamFinance?.isUnlocked, stakedBalance]);

  useEffect(() => {
    if (icecreamFinance?.isUnlocked) {
      updateState().catch((err) => console.error(err.stack));
    }
  }, [icecreamFinance?.isUnlocked, stakedBalance]);

  return parlourVersion;
};

export default useParlourVersion;
