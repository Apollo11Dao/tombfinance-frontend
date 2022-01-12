import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import IceCreamFinance from '../../icecream-finance';
import config from '../../config';

export interface IceCreamFinanceContext {
  icecreamFinance?: IceCreamFinance;
}

export const Context = createContext<IceCreamFinanceContext>({ icecreamFinance: null });

export const IceCreamFinanceProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [icecreamFinance, setIceCreamFinance] = useState<IceCreamFinance>();

  useEffect(() => {
    if (!icecreamFinance) {
      const cream = new IceCreamFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        cream.unlockWallet(ethereum, account);
      }
      setIceCreamFinance(cream);
    } else if (account) {
      icecreamFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, icecreamFinance]);

  return <Context.Provider value={{ icecreamFinance }}>{children}</Context.Provider>;
};
