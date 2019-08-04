import Web3 from 'web3';

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      try {
        // Modern dapp browsers...
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          // Use browser's provider.
          const provider = window.web3.currentProvider;
          const web3 = new Web3(provider);
          resolve(web3);
        }
        // Fallback...
        else {
          reject(Error('No running web3 client detected'));
        }
      }
      catch(e) {
        reject(e);
      }
    });
  });

export default getWeb3;