import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToParlour = () => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(icecreamFinance.stakeShareToParlour(amount), `Stake ${amount} CSHARE to the parlour`);
    },
    [icecreamFinance, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToParlour;
