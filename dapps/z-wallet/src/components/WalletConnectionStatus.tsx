import React from "react";
import { GoDotFill } from "react-icons/go";

/** type declaration of WalletConnectionStatus component props*/
type WalletConnectionStatusProps = {
  beaconConnection: boolean;
};

/**
 * JSX component for showing the beacon wallet connection status
 * @param param0 `WalletConnectionStatusProps` component props
 * @returns `JSX.Element`
 */
const WalletConnectionStatus = ({
  beaconConnection,
}: WalletConnectionStatusProps) => {
  return (
    <>
      {beaconConnection ? (
        <span className="d-flex badge border border-success text-dark align-items-center">
          Connected
          <GoDotFill className="text-success" size={20} />
        </span>
      ) : (
        <span className="d-flex badge border border-danger text-dark align-items-center">
          Disconnected
          <GoDotFill className="text-danger" size={20} />
        </span>
      )}
    </>
  );
};

export default WalletConnectionStatus;
