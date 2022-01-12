import { useCallback } from 'react';
import useIceCreamFinance from '../useIceCreamFinance';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';
// import { BigNumber } from "ethers";
import { parseUnits } from 'ethers/lib/utils';


const useSwapCBondToCShare = () => {
  const icecreamFinance = useIceCreamFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleSwapCShare = useCallback(
  	(cbondAmount: string) => {
	  	const cbondAmountBn = parseUnits(cbondAmount, 18);
	  	handleTransactionReceipt(
	  		icecreamFinance.swapCBondToCShare(cbondAmountBn),
	  		`Swap ${cbondAmount} CBond to CShare`
	  	);
  	},
  	[icecreamFinance, handleTransactionReceipt]
  );
  return { onSwapCShare: handleSwapCShare };
};

export default useSwapCBondToCShare;