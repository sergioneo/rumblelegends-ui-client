'use strict';

import { COMMON } from './constants.common';

const configDev = Object.assign(
  {},
  {
    COMMON,
    TIMEOUT: 20000,
    ENDPOINT: '',
    ENDPOINT_WALLET: '',
    EGGS: [{
      name: 1,
      path: 'cross/assets/img/eggs/uni_egg.gif'
    },
    {
      name: 2,
      path: 'cross/assets/img/eggs/dino_egg.gif'
    },
    {
      name: 3,
      path: 'cross/assets/img/eggs/dino_rare.gif'
    },
    {
      name: 4,
      path: 'cross/assets/img/eggs/uni_rare.gif'
    },
    {
      name: 5,
      path: 'cross/assets/img/eggs/dino_air.gif'
    },
    {
      name: 6,
      path: 'cross/assets/img/eggs/uni_air.gif'
    },
    {
      name: 7,
      path: 'cross/assets/img/eggs/dino_earth.gif'
    },
    {
      name: 8,
      path: 'cross/assets/img/eggs/uni_earth.gif'
    },
    {
      name: 9,
      path: 'cross/assets/img/eggs/dino_agua.gif'
    },
    {
      name: 10,
      path: 'cross/assets/img/eggs/uni_agua.gif'
    },

    {
      name: 11,
      path: 'cross/assets/img/eggs/dino_fuego.gif'
    },

    {
      name: 12,
      path: 'cross/assets/img/eggs/uni_fuego.gif'
    },
    ],
    SERVICE: {
      ETHER_CLP_DOLAR: 'https://api.coinmarketcap.com/v2/ticker/1027/?convert=CLP',
      MARKET_PLACE_BEASTS: 'beast/marketplace',
      DETAIL_MARKET_PLACE_BEASTS: 'beast',
      MY_ITEMS: 'wallet',
    },
    SERVICES_ERRORS: [
      {
        CODE: 1,
        TYPE: '',
      },
    ],
  }
);

export default configDev;
