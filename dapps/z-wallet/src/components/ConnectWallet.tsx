/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { IoIosWallet } from "react-icons/io";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-dapp";
import { TezosToolkit } from "@taquito/taquito";

/** type declaration of ConnectWallet component props*/
type ConnectWalletProps = {
  wallet: BeaconWallet | null;
  setWallet: Dispatch<SetStateAction<any>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
  Tezos: TezosToolkit;
  rpcUrl: string;
};

/**
 * JSX component for connecting a wallet
 * @param param0 `ConnectWalletProps` component props
 * @returns `JSX.Element`
 */
const ConnectWallet = ({
  wallet,
  setWallet,
  setUserAddress,
  setUserBalance,
  setBeaconConnection,
  Tezos,
  rpcUrl,
}: ConnectWalletProps) => {
  /**
   * to set the balance of the wallet
   * @param localUserAddress public address of the wallet
   */
  const setBalance = async (localUserAddress: string): Promise<void> => {
    setUserAddress(localUserAddress);
    /** fetching the balance using the taquito sdk of tezos */
    const balance = await Tezos.tz.getBalance(localUserAddress);
    setUserBalance(balance.toNumber());
  };

  /**
   * to connect with the wallet by requesting the wallet permissions
   * @param event synthetic event of mouse click
   */
  const connectToWallet = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    try {
      event.preventDefault();
      if (wallet) {
        /** requestingt the permission using the taquito sdk of tezos */
        await wallet.requestPermissions({
          network: {
            type: NetworkType.GHOSTNET,
            rpcUrl,
          },
        });
        /** get public address of the wallet */
        const localUserAddress = await wallet.getPKH();
        /** set the wallet balance */
        await setBalance(localUserAddress);
        /** marking that the beacon wallet connection has been established */
        setBeaconConnection(true);
      }
    } catch (error) {
      console.error("connectToWallet: ", error);
    }
  };

  /**
   * to initiating the beacon wallet instance and also connceting
   * the wallet if already have permission to connect with it
   */
  const initBeaconWalletInstance = async () => {
    try {
      /** creates a wallet instance */ 
      const wallet = new BeaconWallet({
        name: "Z Wallet",
        preferredNetwork: NetworkType.GHOSTNET,
        disableDefaultEvents: false, // Disable all events when true/ UI. This also disables the pairing alert.
      });
      /** setting the wallet provider based on your network */
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
      /** checks if wallet was connected before */
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH();
        await setBalance(userAddress);
        setBeaconConnection(true);
      }
    } catch (error) {
      console.error("initBeaconWalletInstance", error);
    }
  };

  /** to execute the function at the time of component did mount */
  useEffect(() => {
    initBeaconWalletInstance();
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-primary btn-sm d-flex align-items-center"
        onClick={connectToWallet}
      >
        Connect Wallet
        <IoIosWallet className="ms-2" />
      </button>
    </div>
  );
};

export default ConnectWallet;
