/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { HiMiniBanknotes } from "react-icons/hi2";
import { FaAddressCard } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { TezosToolkit } from "@taquito/taquito";

/** type declaration of WalletInfo component props*/
type WalletInfoProps = {
  userAddress: string;
  userBalance: number;
  setUserBalance: Dispatch<SetStateAction<number>>;
  Tezos: TezosToolkit;
};

/**
 * JSX component for showing the wallet information of the user
 * @param param0 `WalletInfoProps` component props
 * @returns `JSX.Element`
 */
const WalletInfo = ({
  userAddress,
  userBalance,
  setUserBalance,
  Tezos,
}: WalletInfoProps) => {
  const setBalance = async (localUserAddress: string): Promise<void> => {
    const balance = await Tezos.tz.getBalance(localUserAddress);
    setUserBalance(balance.toNumber());
  };

  /** to execute the function at the time of component did mount and clearing the refresh interval on component did unmount */
  useEffect(() => {
    if (userAddress) {
      const interval = setInterval(() => {
        setBalance(userAddress);
      }, 5000);
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [userAddress]);
  return (
    <>
      {userAddress && (
        <div className="container bg-light text-dark py-3 rounded">
          <div>
            <FaAddressCard className="text-primary me-2" />
            <span className="fs-6">
              {userAddress}
              <IoCopyOutline
                onClick={() => navigator.clipboard.writeText(userAddress)}
                className="cursor-pointer ms-2"
              />
            </span>
          </div>
          <div>
            <HiMiniBanknotes className="text-primary me-2" />
            {(userBalance / 1000000).toLocaleString("en-US")} ꜩ
          </div>
        </div>
      )}
    </>
  );
};

export default WalletInfo;
