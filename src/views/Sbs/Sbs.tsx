import React, { /*useCallback, useEffect, */useMemo, useState } from 'react';
import Page from '../../components/Page';
import FactoryImage from '../../assets/img/factory.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import { Box,/* Paper, Typography,*/ Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useIceCreamFinance from '../../hooks/useIceCreamFinance';
import { getDisplayBalance/*, getBalance*/ } from '../../utils/formatBalance';
import { BigNumber/*, ethers*/ } from 'ethers';
import useSwapCBondToCShare from '../../hooks/CShareSwapper/useSwapCBondToCShare';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useCShareSwapperStats from '../../hooks/CShareSwapper/useCShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${FactoryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const icecreamFinance = useIceCreamFinance();
  const [cbondAmount, setCbondAmount] = useState('');
  const [cshareAmount, setCshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(icecreamFinance.CBOND, icecreamFinance.contracts.CShareSwapper.address);
  const { onSwapCShare } = useSwapCBondToCShare();
  const cshareSwapperStat = useCShareSwapperStats(account);

  const cshareBalance = useMemo(() => (cshareSwapperStat ? Number(cshareSwapperStat.cshareBalance) : 0), [cshareSwapperStat]);
  const bondBalance = useMemo(() => (cshareSwapperStat ? Number(cshareSwapperStat.cbondBalance) : 0), [cshareSwapperStat]);

  const handleCBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setCbondAmount('');
      setCshareAmount('');
      return
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setCbondAmount(e.currentTarget.value);
    const updateCShareAmount = await icecreamFinance.estimateAmountOfCShare(e.currentTarget.value);
    setCshareAmount(updateCShareAmount);  
  };

  const handleCBondSelectMax = async () => {
    setCbondAmount(String(bondBalance));
    const updateCShareAmount = await icecreamFinance.estimateAmountOfCShare(String(bondBalance));
    setCshareAmount(updateCShareAmount); 
  };

  const handleCShareSelectMax = async () => {
    setCshareAmount(String(cshareBalance));
    const rateCSharePerCream = (await icecreamFinance.getCShareSwapperStat(account)).rateCSharePerCream;
    const updateCBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateCSharePerCream))).mul(Number(cshareBalance) * 1e6);
    setCbondAmount(getDisplayBalance(updateCBondAmount, 18, 6));
  };

  const handleCShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setCshareAmount('');
      setCbondAmount('');
      return
    }
    if (!isNumeric(inputData)) return;
    setCshareAmount(inputData);
    const rateCSharePerCream = (await icecreamFinance.getCShareSwapperStat(account)).rateCSharePerCream;
    const updateCBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateCSharePerCream))).mul(Number(inputData) * 1e6);
    setCbondAmount(getDisplayBalance(updateCBondAmount, 18, 6));
  }

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="CBond -> CShare Swap" subtitle="Swap CBond to CShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>CBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={icecreamFinance.CBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleCBondSelectMax}
                                onChange={handleCBondChange}
                                value={cbondAmount}
                                max={bondBalance}
                                symbol="CBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} CBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg"/>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>CShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={icecreamFinance.CSHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleCShareSelectMax}
                                onChange={handleCShareChange}
                                value={cshareAmount}
                                max={cshareBalance}
                                symbol="CShare"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${cshareBalance} CSHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
              
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                      {approveStatus !== ApprovalState.APPROVED ? (
                        <Button
                          disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                          color="primary"
                          variant="contained"
                          onClick={approve}
                          size="medium"
                        >
                          Approve CBOND
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => onSwapCShare(cbondAmount.toString())}
                          size="medium"
                        >
                          Swap
                        </Button>
                      )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
