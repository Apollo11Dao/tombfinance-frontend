import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/parlour/useWithdrawCheck';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useIceCreamFinance from '../../../hooks/useIceCreamFinance';
import ProgressCountdown from './ProgressCountdown';
import useStakedBalanceOnParlour from '../../../hooks/useStakedBalanceOnParlour';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerParlour from '../../../hooks/parlour/useUnstakeTimerParlour';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToParlour from '../../../hooks/useStakeToParlour';
import useWithdrawFromParlour from '../../../hooks/useWithdrawFromParlour';

const Stake: React.FC = () => {
  const icecreamFinance = useIceCreamFinance();
  const [approveStatus, approve] = useApprove(icecreamFinance.CSHARE, icecreamFinance.contracts.Parlour.address);

  const tokenBalance = useTokenBalance(icecreamFinance.CSHARE);
  const stakedBalance = useStakedBalanceOnParlour();
  const { from, to } = useUnstakeTimerParlour();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('CSHARE', icecreamFinance.CSHARE);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToParlour();
  const { onWithdraw } = useWithdrawFromParlour();
  const canWithdrawFromParlour = useWithdrawCheck();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'CShare'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'CShare'}
    />,
  );

  return (
    <Box>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol="CSHARE" />
              </CardIcon>
              <Value value={getDisplayBalance(stakedBalance)} />
              <Label text={`≈ $${tokenPriceInDollars}`} />
              <Label text={'CSHARE Staked'} />
            </StyledCardHeader>
            <StyledCardActions>
              {approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  onClick={approve}
                >
                  Approve CSHARE
                </Button>
              ) : (
                <>
                  <IconButton disabled={!canWithdrawFromParlour} onClick={onPresentWithdraw}>
                    <RemoveIcon />
                  </IconButton>
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                </>
              )}
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canWithdrawFromParlour ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Withdraw possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
