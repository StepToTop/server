export interface Data {
  timestamp: string;
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface Resp {
  data: Data;
  timestamp: number;
}

export enum Currency {
  Bitcoin = 'bitcoin',
  Ether = 'ethereum',
  Litecoin = 'litecoin',
  Monero = 'monero',
  Ripple = 'xrp',
  Dogecoin = 'dogecoin',
  Dash = 'dash',
}
