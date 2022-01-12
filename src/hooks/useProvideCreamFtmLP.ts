import { useCallback } from 'react';
import useIceCreamFinance from './useIceCreamFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from '../utils/constants'

const useProvideCreamFtmLP = () => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideCreamFtmLP = useCallback(
    (ftmAmount: string, creamAmount: string) => {
      const creamAmountBn = parseUnits(creamAmount);
      handleTransactionReceipt(
        icecreamFinance.provideCreamFtmLP(ftmAmount, creamAmountBn),
        `Provide Cream-FTM LP ${creamAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [icecreamFinance, handleTransactionReceipt],
  );
  return { onProvideCreamFtmLP: handleProvideCreamFtmLP };
};

export default useProvideCreamFtmLP;
