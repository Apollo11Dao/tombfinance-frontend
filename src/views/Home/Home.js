import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_icecream_cash.png';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useCreamStats from '../../hooks/useCreamStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usecShareStats from '../../hooks/useCShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { cream as creamTesting, cShare as cShareTesting } from '../../icecream-finance/deployments/deployments.testing.json';
import { cream as creamProd, cShare as cShareProd } from '../../icecream-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useIceCreamFinance from '../../hooks/useIceCreamFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const creamFtmLpStats = useLpStats('CREAM-FTM-LP');
  const cShareFtmLpStats = useLpStats('CSHARE-FTM-LP');
  const creamStats = useCreamStats();
  const cShareStats = usecShareStats();
  const cBondStats = useBondStats();
  const icecreamFinance = useIceCreamFinance();

  let cream;
  let cShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    cream = creamTesting;
    cShare = cShareTesting;
  } else {
    cream = creamProd;
    cShare = cShareProd;
  }

  const buyCreamAddress = 'https://spookyswap.finance/swap?outputCurrency=' + cream.address;
  const buyCshareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + cShare.address;

  const creamLPStats = useMemo(() => (creamFtmLpStats ? creamFtmLpStats : null), [creamFtmLpStats]);
  const cshareLPStats = useMemo(() => (cShareFtmLpStats ? cShareFtmLpStats : null), [cShareFtmLpStats]);
  const creamPriceInDollars = useMemo(
    () => (creamStats ? Number(creamStats.priceInDollars).toFixed(2) : null),
    [creamStats],
  );
  const creamPriceInFTM = useMemo(() => (creamStats ? Number(creamStats.tokenInFtm).toFixed(4) : null), [creamStats]);
  const creamCirculatingSupply = useMemo(() => (creamStats ? String(creamStats.circulatingSupply) : null), [creamStats]);
  const creamTotalSupply = useMemo(() => (creamStats ? String(creamStats.totalSupply) : null), [creamStats]);

  const cSharePriceInDollars = useMemo(
    () => (cShareStats ? Number(cShareStats.priceInDollars).toFixed(2) : null),
    [cShareStats],
  );
  const cSharePriceInFTM = useMemo(
    () => (cShareStats ? Number(cShareStats.tokenInFtm).toFixed(4) : null),
    [cShareStats],
  );
  const cShareCirculatingSupply = useMemo(
    () => (cShareStats ? String(cShareStats.circulatingSupply) : null),
    [cShareStats],
  );
  const cShareTotalSupply = useMemo(() => (cShareStats ? String(cShareStats.totalSupply) : null), [cShareStats]);

  const cBondPriceInDollars = useMemo(
    () => (cBondStats ? Number(cBondStats.priceInDollars).toFixed(2) : null),
    [cBondStats],
  );
  const cBondPriceInFTM = useMemo(() => (cBondStats ? Number(cBondStats.tokenInFtm).toFixed(4) : null), [cBondStats]);
  const cBondCirculatingSupply = useMemo(
    () => (cBondStats ? String(cBondStats.circulatingSupply) : null),
    [cBondStats],
  );
  const cBondTotalSupply = useMemo(() => (cBondStats ? String(cBondStats.totalSupply) : null), [cBondStats]);

  const creamLpZap = useZap({ depositTokenName: 'CREAM-FTM-LP' });
  const cshareLpZap = useZap({ depositTokenName: 'CSHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentCreamZap, onDissmissCreamZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        creamLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissCreamZap();
      }}
      tokenName={'CREAM-FTM-LP'}
    />,
  );

  // eslint-disable-next-line no-unused-vars
  const [onPresentCshareZap, onDissmisscShareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        cshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmisscShareZap();
      }}
      tokenName={'CSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4}>
              <h2>Welcome to IceCream Finance</h2>
              <p>The first algorithmic stablecoin on Fantom Opera, pegged to the price of 1 FTM via seigniorage.</p>
              <p>
                Stake your CREAM-FTM LP in the Creamery to earn CSHARE rewards.
                Then stake your earned CSHARE in the Parlour to earn more CREAM!
              </p>
            </Box>
          </Paper>



        </Grid>

        <Grid container spacing={3}>
    <Grid item  xs={12} sm={12} justify="center"  style={{ margin: '12px', display: 'flex' }}>
            <Alert variant="filled" severity="warning">
              <b>
      Please visit our <StyledLink target="_blank" href="https://docs.icecream.finance">documentation</StyledLink> before purchasing CREAM or CSHARE!</b>
            </Alert>
        </Grid>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/parlour" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button href="/creamery" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyCreamAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy CREAM
              </Button>
              <Button variant="contained" target="_blank" href={buyCshareAddress} className={classes.button}>
                Buy CSHARE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* CREAM */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CREAM</h2>
              <Button
                onClick={() => {
                  icecreamFinance.watchAssetInMetamask('CREAM');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CREAM" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{creamPriceInFTM ? creamPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${creamPriceInDollars ? creamPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(creamCirculatingSupply * creamPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {creamCirculatingSupply} <br />
                Total Supply: {creamTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* CSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CSHARE</h2>
              <Button
                onClick={() => {
                  icecreamFinance.watchAssetInMetamask('CSHARE');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{cSharePriceInFTM ? cSharePriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${cSharePriceInDollars ? cSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(cShareCirculatingSupply * cSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {cShareCirculatingSupply} <br />
                Total Supply: {cShareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* CBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>CBOND</h2>
              <Button
                onClick={() => {
                  icecreamFinance.watchAssetInMetamask('CBOND');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{cBondPriceInFTM ? cBondPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${cBondPriceInDollars ? cBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(cBondCirculatingSupply * cBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {cBondCirculatingSupply} <br />
                Total Supply: {cBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>CREAM-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CREAM-FTM-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" disabled={true} onClick={onPresentCreamZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {creamLPStats?.tokenAmount ? creamLPStats?.tokenAmount : '-.--'} CREAM /{' '}
                  {creamLPStats?.ftmAmount ? creamLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${creamLPStats?.priceOfOne ? creamLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${creamLPStats?.totalLiquidity ? creamLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {creamLPStats?.totalSupply ? creamLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>CSHARE-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="CSHARE-FTM-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentCshareZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {cshareLPStats?.tokenAmount ? cshareLPStats?.tokenAmount : '-.--'} CSHARE /{' '}
                  {cshareLPStats?.ftmAmount ? cshareLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${cshareLPStats?.priceOfOne ? cshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${cshareLPStats?.totalLiquidity ? cshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {cshareLPStats?.totalSupply ? cshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
