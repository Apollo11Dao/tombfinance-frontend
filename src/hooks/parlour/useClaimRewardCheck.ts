import { useEffect, useState } from 'react';
import useRefresh from '../useRefresh';
import useIceCreamFinance from '../useIceCreamFinance';

const useClaimRewardCheck = () => {
  const  { slowRefresh } = useRefresh();
  const [canClaimReward, setCanClaimReward] = useState(false);
  const icecreamFinance = useIceCreamFinance();
  const isUnlocked = icecreamFinance?.isUnlocked;

  useEffect(() => {
    async function canUserClaimReward() {
      try {
        setCanClaimReward(await icecreamFinance.canUserClaimRewardFromParlour());
      } catch(err){
        console.error(err);
      };
    }
    if (isUnlocked) {
      canUserClaimReward();
    }
  }, [isUnlocked, slowRefresh, icecreamFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
