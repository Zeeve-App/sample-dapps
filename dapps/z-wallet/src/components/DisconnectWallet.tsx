import React, { Dispatch, SetStateAction } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { AiOutlineDisconnect } from "react-icons/ai";

/** type declaration of DisconnectWallet component props*/
type DisconnectWalletProps = {
  wallet: BeaconWallet;
  setWallet: Dispatch<SetStateAction<any>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
};


/**
 * JSX component for disconnecting a wallet
 * @param param0 `DisconnectWalletProps` component props
 * @returns `JSX.Element`
 */
const DisconnectWallet = ({
  wallet,
  setWallet,
  setUserAddress,
  setUserBalance,
  setBeaconConnection,
}: DisconnectWalletProps) => {

  /**
   * to disconnect the wallet and clearing all the active states of the wallet
   * @param event synthetic event of mouse click
   */
  const disconnectFromWallet = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    if (wallet) {
      await wallet.clearActiveAccount();
    }
    setUserAddress("");
    setUserBalance(0);
    setWallet(null);
    setBeaconConnection(false);
  };
  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-danger btn-sm" onClick={disconnectFromWallet}>
        Disconnect Wallet
        <AiOutlineDisconnect className="ms-2" />
      </button>
    </div>
  );
};

export default DisconnectWallet;
