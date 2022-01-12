import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdrawFromParlour = () => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        icecreamFinance.withdrawShareFromParlour(amount),
        `Withdraw ${amount} CSHARE from the parlour`,
      );
    },
    [icecreamFinance, handleTransactionReceipt],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdrawFromParlour;
