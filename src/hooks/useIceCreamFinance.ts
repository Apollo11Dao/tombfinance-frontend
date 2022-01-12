import { useContext } from 'react';
import { Context } from '../contexts/IceCreamFinanceProvider';

const useIceCreamFinance = () => {
  const { icecreamFinance } = useContext(Context);
  return icecreamFinance;
};

export default useIceCreamFinance;
