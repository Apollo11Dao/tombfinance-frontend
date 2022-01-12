import React from 'react';

//Graveyard ecosystem logos
import creamLogo from '../../assets/img/crypto_crea,_cash.svg';
import cShareLogo from '../../assets/img/crypto_crea,_share.svg';
import creamLogoPNG from '../../assets/img/crypto_cream_cash.f2b44ef4.png';
import cShareLogoPNG from '../../assets/img/crypto_cream_share.bf1a6c52.png';
import cBondLogo from '../../assets/img/crypto_cream_bond.svg';

import creamFtmLpLogo from '../../assets/img/cream_ftm_lp.png';
import cshareFtmLpLogo from '../../assets/img/cshare_ftm_lp.png';

import wftmLogo from '../../assets/img/ftm_logo_blue.svg';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  CREAM: creamLogo,
  CREAMPNG: creamLogoPNG,
  CSHAREPNG: cShareLogoPNG,
  CSHARE: cShareLogo,
  CBOND: cBondLogo,
  WFTM: wftmLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  'CREAM-FTM-LP': creamFtmLpLogo,
  'CSHARE-FTM-LP': cshareFtmLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
