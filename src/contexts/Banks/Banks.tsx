import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useIceCreamFinance from '../../hooks/useIceCreamFinance';
import { Bank } from '../../icecream-finance';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const icecreamFinance = useIceCreamFinance();
  const isUnlocked = icecreamFinance?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!icecreamFinance.isUnlocked) continue;

        // only show pools staked by user
        const balance = await icecreamFinance.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          icecreamFinance.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: icecreamFinance.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'CREAM' ? icecreamFinance.CREAM : icecreamFinance.CSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [icecreamFinance, setBanks]);

  useEffect(() => {
    if (icecreamFinance) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, icecreamFinance, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
