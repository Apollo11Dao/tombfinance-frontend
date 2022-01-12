import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeemOnParlour = (description?: string) => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    const alertDesc = description || 'Redeem CSHARE from Parlour';
    handleTransactionReceipt(icecreamFinance.exitFromParlour(), alertDesc);
  }, [icecreamFinance, description, handleTransactionReceipt]);
  return { onRedeem: handleRedeem };
};

export default useRedeemOnParlour;
