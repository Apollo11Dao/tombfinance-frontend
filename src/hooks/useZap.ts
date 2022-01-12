import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import { Bank } from '../icecream-finance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useZap = (bank: Bank) => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleZap = useCallback(
    (zappingToken: string, tokenName: string, amount: string) => {
      handleTransactionReceipt(
        icecreamFinance.zapIn(zappingToken, tokenName, amount),
        `Zap ${amount} in ${bank.depositTokenName}.`,
      );
    },
    [bank, icecreamFinance, handleTransactionReceipt],
  );
  return { onZap: handleZap };
};

export default useZap;
