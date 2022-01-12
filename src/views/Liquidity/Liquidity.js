import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/home.png';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useCreamStats from '../../hooks/useCreamStats';
import TokenInput from '../../components/TokenInput';
import useCreamFinance from '../../hooks/useIceCreamFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvideCreamFtmLP from '../../hooks/useProvideCreamFtmLP';
import { Alert } from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [creamAmount, setCreamAmount] = useState(0);
  const [ftmAmount, setFtmAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const creamStats = useCreamStats();
  const creamFinance = useCreamFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const creamBalance = useTokenBalance(creamFinance.CREAM);
  const ftmBalance = (balance / 1e18).toFixed(4);
  const { onProvideCreamFtmLP } = useProvideCreamFtmLP();
  const creamFtmLpStats = useLpStats('CREAM-FTM-LP');

  const creamLPStats = useMemo(() => (creamFtmLpStats ? creamFtmLpStats : null), [creamFtmLpStats]);
  const creamPriceInFTM = useMemo(() => (creamStats ? Number(creamStats.tokenInFtm).toFixed(2) : null), [creamStats]);
  const ftmPriceInCREAM = useMemo(() => (creamStats ? Number(1 / creamStats.tokenInFtm).toFixed(2) : null), [creamStats]);
  // const classes = useStyles();

  const handleCreamChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setCreamAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setCreamAmount(e.currentTarget.value);
    const quoteFromSpooky = await creamFinance.quoteFromSpooky(e.currentTarget.value, 'CREAM');
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / creamLPStats.ftmAmount);
  };

  const handleFtmChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setFtmAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setFtmAmount(e.currentTarget.value);
    const quoteFromSpooky = await creamFinance.quoteFromSpooky(e.currentTarget.value, 'FTM');
    setCreamAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / creamLPStats.tokenAmount);
  };
  const handleCreamSelectMax = async () => {
    const quoteFromSpooky = await creamFinance.quoteFromSpooky(getDisplayBalance(creamBalance), 'CREAM');
    setCreamAmount(getDisplayBalance(creamBalance));
    setFtmAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / creamLPStats.ftmAmount);
  };
  const handleFtmSelectMax = async () => {
    const quoteFromSpooky = await creamFinance.quoteFromSpooky(ftmBalance, 'FTM');
    setFtmAmount(ftmBalance);
    setCreamAmount(quoteFromSpooky);
    setLpTokensAmount(ftmBalance / creamLPStats.ftmAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justify="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>This and <a href="https://spookyswap.finance/"  rel="noopener noreferrer" target="_blank">Spookyswap</a> are the only ways to provide Liquidity on CREAM-FTM pair without paying tax.</b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleCreamSelectMax}
                          onChange={handleCreamChange}
                          value={creamAmount}
                          max={getDisplayBalance(creamBalance)}
                          symbol={'CREAM'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleFtmSelectMax}
                          onChange={handleFtmChange}
                          value={ftmAmount}
                          max={ftmBalance}
                          symbol={'FTM'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 CREAM = {creamPriceInFTM} FTM</p>
                        <p>1 FTM = {ftmPriceInCREAM} CREAM</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideCreamFtmLP(ftmAmount.toString(), creamAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{ margin: '0 10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
