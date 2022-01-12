import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useIceCreamFinance from './useIceCreamFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const icecreamFinance = useIceCreamFinance();

  useEffect(() => {
    if (icecreamFinance) {
      const { Treasury } = icecreamFinance.contracts;
      icecreamFinance.CREAM.balanceOf(Treasury.address).then(setAmount);
    }
  }, [icecreamFinance]);
  return amount;
};

export default useTreasuryAmount;
