import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useIceCreamFinance from '../../hooks/useIceCreamFinance';
import TokenSymbol from '../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const icecreamFinance = useIceCreamFinance();

  const creamBalance = useTokenBalance(IceCreamFinance.CREAM);
  const displayCreamBalance = useMemo(() => getDisplayBalance(creamBalance), [creamBalance]);

  const cshareBalance = useTokenBalance(icecreamFinance.CSHARE);
  const displayCshareBalance = useMemo(() => getDisplayBalance(cshareBalance), [cshareBalance]);

  const cbondBalance = useTokenBalance(icecreamFinance.CBOND);
  const displayCbondBalance = useMemo(() => getDisplayBalance(cbondBalance), [cbondBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="CREAM" />
          <StyledBalance>
            <StyledValue>{displayCreamBalance}</StyledValue>
            <Label text="CREAM Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="CSHARE" />
          <StyledBalance>
            <StyledValue>{displayCshareBalance}</StyledValue>
            <Label text="CSHARE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="CBOND" />
          <StyledBalance>
            <StyledValue>{displayCbondBalance}</StyledValue>
            <Label text="CBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
