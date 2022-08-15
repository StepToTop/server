import fetch from 'node-fetch';
import fastJson from 'fast-json-stringify';
import { Currency, Data, Resp } from '@/typings';

export const stringify = fastJson({
  title: 'CurrencyData',
  type: 'object',
  properties: {
    timestamp: {
      type: 'string',
    },
    id: {
      type: 'string',
    },
    rank: {
      type: 'string',
    },
    symbol: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    supply: {
      type: 'string',
    },
    maxSupply: {
      type: 'string',
    },
    marketCapUsd: {
      type: 'string',
    },
    volumeUsd24Hr: {
      type: 'string',
    },
    priceUsd: {
      type: 'string',
    },
    changePercent24Hr: {
      type: 'string',
    },
    vwap24Hr: {
      type: 'string',
    },
    explorer: {
      type: 'string',
    },
  },
});

const baseUrl = 'https://api.coincap.io/v2/assets/';

export class DataPipe {
  times = 10;
  callback = (arg: Data) => this.logger(arg);
  currency: Currency;
  interval?: NodeJS.Timeout;

  constructor(currency: Currency, callback?: (arg: Data) => void) {
    this.currency = currency;
    this.callback = typeof callback === 'function' ? callback : (arg: Data) => this.logger(arg);
  }


  async fetchCurrency() {
    const res = await fetch(`${baseUrl}${this.currency}`, {
      method: 'get',
    }).then(res => res.json() as Promise<Resp>).catch(e => {
      this.logger(e);
    });
    if (!res) {
      this.logger(`连接出错, 剩余重试次数：${--this.times}`);
      if (this.times <= 0) {
        clearInterval(this.interval);
        this.reset();
      }
    } else {
      this.times = 10;
      res.data.timestamp = String(res.timestamp);
      return this.callback(res.data);
    }

  }

  start() {
    if (this.interval) {
      return this.logger('已经连接，不需要重复连接');
    }
    this.interval = setInterval(() => {
      this.fetchCurrency();
    }, 1000);
  }

  reset() {
    if (this.interval) {
      return this.logger('已经重置，不需要重复连接');
    }
    this.logger('三秒后重试');
    setTimeout(() => {
      this.times = 10;
      this.start();
    }, 3000);
  }

  logger(message: string | Data) {
    console.log(`[${this.currency}] ${typeof message === 'object' ? stringify(message) : message}`);
  }
}
