import { useEffect, useState } from 'react';
import useIceCreamFinance from '../useIceCreamFinance';
import useRefresh from '../useRefresh';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const icecreamFinance = useIceCreamFinance();
  const { slowRefresh } = useRefresh();
  const isUnlocked = icecreamFinance?.isUnlocked;

  useEffect(() => {
    async function canUserWithdraw() {
      try {
        setCanWithdraw(await icecreamFinance.canUserUnstakeFromParlour());
      } catch (err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
      canUserWithdraw();
    }
  }, [isUnlocked, icecreamFinance, slowRefresh]);

  return canWithdraw;
};

export default useWithdrawCheck;
