export {};

declare global {
  // Add ethereum and web3 to the window
  interface Window {
    ethereum: any;
    web3: any;
  }
}
