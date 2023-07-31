import React, { Dispatch, SetStateAction, useState } from "react";
import { FaArrowUpFromBracket, FaArrowRightToBracket } from "react-icons/fa6";
import { TfiBackLeft } from "react-icons/tfi";
import QRCode from "react-qr-code";
import { validateAddress } from "@taquito/utils";
import { TezosToolkit } from "@taquito/taquito";

/** type declaration of TransferToken component props*/
type TransferTokenProps = {
  userAddress: string;
  Tezos: TezosToolkit;
  showQR: boolean;
  setShowQR: Dispatch<SetStateAction<boolean>>;
  showSendForm: boolean;
  setShowSendForm: Dispatch<SetStateAction<boolean>>;
};

/**
 * JSX component for transferring the token
 * @param param0 `TransferTokenProps` component props
 * @returns `JSX.Element`
 */
const TransferToken = ({
  userAddress,
  Tezos,
  showQR,
  setShowQR,
  showSendForm,
  setShowSendForm,
}: TransferTokenProps) => {
  /** local state to manage form inputs error */
  const [errors, setErrors] = useState<any>();
  /** local state to manage form inputs values */
  const [values, setValues] = useState<any>();
  /** local state to manage the send button disabling state */
  const [loading, setLoading] = useState(false);
  /** local state to mark if the transfer is done */
  const [sent, setSent] = useState(false);

  /**
   * to set the form inputs values and errors based on validation
   * at the time of changing state
   * @param event synthetic event of on changing the values in the input element
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    /** setting values */
    setValues((values: any) => {
      return { ...values, [name]: value };
    });
    /** setting errors of address */
    if (name === "address") {
      if (validateAddress(value) !== 3) {
        setErrors((errors: any) => {
          return { ...errors, address: "Invalid wallet address" };
        });
      } else {
        setErrors((errors: any) => {
          return { ...errors, address: "" };
        });
      }
    }
    /** setting errors of amount */
    if (name === "amount") {
      if (name === "amount" && parseFloat(value) <= 0) {
        setErrors((errors: any) => {
          return { ...errors, amount: "Amount should be greated than 0" };
        });
      } else {
        setErrors((errors: any) => {
          return { ...errors, amount: "" };
        });
      }
    }
  };

  /**
   * to transfer the token for the provided recipient wallet adddress before validating the form inputs
   * @param event synthetic event of mouse click
   */
  const transferToken = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    /** validation on address */
    if (!values?.address) {
      setErrors((errors: any) => {
        return { ...errors, address: "Please enter the wallet address" };
      });
      return;
    } else if (validateAddress(values.address) !== 3) {
      setErrors((errors: any) => {
        return { ...errors, address: "Invalid wallet address" };
      });
      return;
    }
    /** validation on amount */
    if (!values?.amount) {
      setErrors((errors: any) => {
        return { ...errors, amount: "Please enter the amount" };
      });
      return;
    } else if (parseFloat(values.amount) <= 0) {
      setErrors((errors: any) => {
        return { ...errors, amount: "Amount should be greated than 0" };
      });
      return;
    }
    try {
      /** setting loading state of send button */
      setLoading(true);
      /** creating the transfer payload */
      const opeartion = await Tezos.wallet
        .transfer({ to: values.address, amount: parseInt(values.amount) })
        .send();
      /** taking the permission from the user */
      await opeartion.confirmation();
      /** marking the transfer operation is done to show success message */
      setSent(true);
    } catch (error) {
      console.error("transferToken: ", error);
    } finally {
      /** reseting all the transfer operation related states */
      setShowSendForm(false);
      setLoading(false);
      setTimeout(() => {
        setValues({ address: "", amount: "" });
        setErrors({});
        setSent(false);
      }, 5000);
    }
  };

  return (
    <>
      {userAddress && (
        <div className="my-3">
          {!showQR && !showSendForm && (
            <div className="container d-flex align-items-center justify-content-around">
              <button
                className="btn btn-primary btn-sm px-5 d-flex align-items-center"
                onClick={() => setShowSendForm(true)}
              >
                Send
                <FaArrowUpFromBracket className="ms-2" />
              </button>
              <button
                className="btn btn-primary btn-sm px-5 d-flex align-items-center"
                onClick={() => setShowQR(true)}
              >
                Receive
                <FaArrowRightToBracket
                  style={{ transform: "rotate(90deg)" }}
                  className="ms-2"
                />
              </button>
            </div>
          )}
          {showSendForm && !sent && (
            <div>
              <div className="form-floating form-control-sm mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter Wallet Address"
                  onChange={handleChange}
                  value={values?.address}
                />
                <label htmlFor="address">Wallet Address</label>
                {errors?.address && (
                  <p className="text-danger fs-7 mt-1">{errors.address}</p>
                )}
              </div>
              <div className="form-floating form-control-sm">
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  placeholder="Enter Amount"
                  onChange={handleChange}
                  value={values?.amount}
                  min={1}
                />
                <label htmlFor="amount">Amount (ꜩ)</label>
                {errors?.amount && (
                  <p className="text-danger fs-7 mt-1">{errors.amount}</p>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-between my-3 mx-2">
                <button
                  className="btn btn-light btn-sm px-5"
                  onClick={() => setShowSendForm(false)}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  disabled={loading}
                  className="btn btn-primary btn-sm px-5 d-flex align-items-center"
                  onClick={transferToken}
                >
                  Send{loading ? "ing" : ""}
                  <FaArrowUpFromBracket className="ms-2" />
                </button>
              </div>
            </div>
          )}
          {sent && (
            <>
              <p className="text-success text-center fs-7 my-4">
                Successfully sent to{" "}
                <span className="fw-bold">{values?.address}</span>
              </p>
            </>
          )}
          {showQR && (
            <div className="text-center">
              <QRCode value={userAddress} className="mb-2" />
              <p className="fs-7">
                Please Scan the QR to receive on this wallet
              </p>
              <button
                className="btn btn-light btn-sm px-5"
                onClick={() => setShowQR(false)}
              >
                Back
                <TfiBackLeft className="ms-1" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TransferToken;
