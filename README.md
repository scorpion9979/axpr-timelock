# axpr-timelock [![Build Status](https://travis-ci.org/scorpion9979/axpr-timelock.svg?branch=master)](https://travis-ci.org/scorpion9979/axpr-timelock)

## Dev notes
In order to deploy the Timelock contract and have it interact with the AXPR token, you need to provide the following environment variables:
* INFURA_ACCESS_TOKEN (Infura API key)
* ROPSTEN_HD_MNEMONIC (for deploying to the Ropsten testnet)
* HD_MNEMONIC (for deploying to the mainnet)
* ROPSTEN_AXPR_CONTRACT (for a fake AXPR token on Ropsten used for testing purposes)

## Project setup
```
npm run build
```

### Runs compiled UI build
```
npm run start
```

### Runs UI in dev mode
```
npm run dev
```

### Run Truffle integration tests
In one terminal do:
```
ganache-cli
```
then in another terminal, do:
```
npm run test
```

### Compile Solidity contracts
```
npm run compile
```

### Migrate contracts to the live network
```
npm run migrate
```

## Project preview
![project preview][preview]

[preview]: https://i.imgur.com/RTVDBdI.jpg
