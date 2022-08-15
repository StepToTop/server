import zmq from 'zeromq';
import { Currency } from './typings';
import { DataPipe, stringify } from './lib/pipe';

const sock = zmq.socket('pub');
sock.bindSync('tcp://*:9528');

const currencies = [
  Currency.Bitcoin,
  Currency.Dash,
  Currency.Dogecoin,
  Currency.Ether,
  Currency.Litecoin,
  Currency.Monero,
  Currency.Ripple,
];

currencies.forEach((currency: Currency) => {
  const dp = new DataPipe(currency, data => {
    sock.send([ currency, stringify(data) ]);
  });
  dp.start();
});

// const dp = new DataPipe(Currency.Bitcoin);
// dp.start();
