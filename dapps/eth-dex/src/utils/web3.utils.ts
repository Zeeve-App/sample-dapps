import web3 from 'web3';

export const fromWei = (n: any) => {
  return web3.utils.fromWei(n.toString(), 'ether');
};

export const toWei = (n: any) => {
  return web3.utils.toWei(n.toString(), 'ether');
};
