import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useIceCreamFinance from './useIceCreamFinance';
import useRefresh from './useRefresh';

const useTotalStakedOnParlour = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();
  const { slowRefresh } = useRefresh();
  const isUnlocked = icecreamFinance?.isUnlocked;

  useEffect(() => {
    async function fetchTotalStaked() {
      try {
        setTotalStaked(await icecreamFinance.getTotalStakedInParlour());
      } catch(err) {
        console.error(err);
      }
    }
    if (isUnlocked) {
     fetchTotalStaked();
    }
  }, [isUnlocked, slowRefresh, icecreamFinance]);

  return totalStaked;
};

export default useTotalStakedOnParlour;
