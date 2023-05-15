import { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Props } from '../interfaces/component';
import EthDex from '../../build/contracts/EthDex.json';
import EthSwap from '../../build/contracts/EthSwap.json';
import { useCookies } from 'react-cookie';

interface Contracts {
  ethDex?: Contract;
  ethSwap?: Contract;
}

export const useWeb3 = () => {
  const [cookies, setCookie] = useCookies(['__meta']);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [currencies, setCurrencies] = useState<{
    [key: string]: string | undefined;
  }>();
  const [contracts, setContracts] = useState<Contracts>({});

  useEffect(() => {
    if (cookies?.__meta?.isConnected) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      // Instantiate Web3
      const web3 = new Web3(Web3.givenProvider);
      setWeb3(web3);

      // Get current account
      const [account] = await web3.eth.requestAccounts();

      // Get the ETH balance
      const ethBalance = await web3.eth.getBalance(account);

      // Get the network ID
      const network = await web3.eth.net.getId();

      // Get the current network data
      const ethDexNetwork = (EthDex.networks as any)[network];
      const ethSwapNetwork = (EthSwap.networks as any)[network];

      if (ethDexNetwork && ethSwapNetwork) {
        // Get EthDex contract
        const ethDex = await new web3.eth.Contract(
          EthDex.abi as AbiItem[],
          ethDexNetwork.address
        );

        // Get EthSwap contract
        const ethSwap = await new web3.eth.Contract(
          EthSwap.abi as AbiItem[],
          ethSwapNetwork.address
        );

        // Get EthDex balance
        const ethDexBalance = await ethDex.methods.balanceOf(account).call();

        setCurrencies({ ETH: ethBalance, ETHDEX: ethDexBalance });
        setContracts({ ethDex, ethSwap });
        setAccount(account);
        setCookie('__meta', { isConnected: true }, { path: '/' });
      } else {
        window.alert('Token contract not deployed to the detected network');
      }
    } else {
      window.alert('Please install a Web3 browser');
    }
  };

  const updateCurrencies = async () => {
    if (account) {
      setCurrencies({
        ETH: (await web3?.eth.getBalance(account)) || currencies?.ETH,
        ETHDEX: await contracts.ethDex?.methods.balanceOf(account).call(),
      });
    }
  };

  updateCurrencies();

  return { web3, account, currencies, contracts, connectWallet };
};

export const Web3Context = createContext({} as ReturnType<typeof useWeb3>);

export const Web3Provider = ({ children }: Props) => (
  <Web3Context.Provider value={useWeb3()}>{children}</Web3Context.Provider>
);

export const useWeb3Context = () => useContext(Web3Context);
