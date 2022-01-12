import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { Bank } from '../icecream-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (bank: Bank) => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(icecreamFinance.exit(bank.contract, bank.poolId), `Redeem ${bank.contract}`);
  }, [bank, icecreamFinance, handleTransactionReceipt]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
