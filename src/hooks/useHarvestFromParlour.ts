import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useHarvestFromParlour = () => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(icecreamFinance.harvestCashFromParlour(), 'Claim CREAM from Parlour');
  }, [icecreamFinance, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvestFromParlour;
