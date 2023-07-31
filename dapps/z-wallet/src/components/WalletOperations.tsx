/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { IoCopyOutline } from "react-icons/io5";

/** type declaration of WalletOperations component props*/
type WalletOperationsProps = {
  userAddress: string;
  showQR: boolean;
  showSendForm: boolean;
  indexerUrl: string;
  explorerUrl: string;
};

/**
 * JSX component for showing the wallet operations list
 * @param param0 `WalletOperationsProps` component props
 * @returns `JSX.Element`
 */
const WalletOperations = ({
  userAddress,
  showQR,
  showSendForm,
  indexerUrl,
  explorerUrl,
}: WalletOperationsProps) => {
  /** local state to manage the operations list */
  const [operations, setOperations] = useState<
    Array<{
      type: string;
      hash: string;
      amount: number;
      sender: { address: string };
      target: { address: string };
      timestamp: Date;
      status: string;
    }>
  >([]);

  /** fetching the operations of a particluar wallet account using the indexing service */
  const fetchOperations = async () => {
    try {
      const operationRes = await axios.get(
        `${indexerUrl}/v1/accounts/${userAddress}/operations`
      );
      setOperations(operationRes.data);
    } catch (error) {
      console.error("fetchOperations: ", error);
    }
  };

  /** to execute the function at the time of component did mount and clearing the refresh interval on component did unmount */
  useEffect(() => {
    if (userAddress) {
      fetchOperations();
      const interval = setInterval(() => {
        fetchOperations();
      }, 5000);
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [userAddress]);

  return (
    <>
      {userAddress && !showQR && !showSendForm && (
        <div className="container mt-2 bg-light rounded fs-7 py-3 my-3">
          <div className="fs-7 fw-bold mb-2">Operations</div>
          <div className="activity">
            {operations.length ? (
              operations.map((operation, index) => {
                return (
                  <>
                    {operation.type === "transaction" && (
                      <div
                        key={`operations-${index}`}
                        className={`m-2 p-1 ${
                          operations.length === index + 1 ? "" : "border-bottom"
                        }`}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="">
                            <span
                              className="text-primary cursor-pointer"
                              onClick={() =>
                                window.open(`${explorerUrl}/${operation.hash}`)
                              }
                              title={operation.hash}
                            >
                              {operation.hash.slice(0, 25)}...
                            </span>
                            <IoCopyOutline
                              onClick={() =>
                                navigator.clipboard.writeText(operation.hash)
                              }
                              className="cursor-pointer ms-2"
                            />
                          </div>
                          <div>
                            {userAddress === operation.sender.address ? (
                              <span className="text-danger">
                                -
                                {(
                                  (operation.amount as number) / 1000000
                                ).toLocaleString("en-US")}{" "}
                                ꜩ
                              </span>
                            ) : (
                              <span className="text-success">
                                +
                                {(
                                  (operation.amount as number) / 1000000
                                ).toLocaleString("en-US")}{" "}
                                ꜩ
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          {userAddress === operation.sender.address ? (
                            <span className="text-muted">
                              Sent to
                              <span
                                className="text-primary ms-1"
                                title={operation.target.address}
                              >
                                {operation.target.address.slice(0, 25)}...
                              </span>
                            </span>
                          ) : (
                            <span className="text-muted">
                              Received from
                              <span
                                className="text-primary ms-1"
                                title={operation.sender.address}
                              >
                                {operation.sender.address.slice(0, 25)}...
                              </span>
                            </span>
                          )}
                          <IoCopyOutline
                            onClick={() =>
                              navigator.clipboard.writeText(
                                userAddress === operation.sender.address
                                  ? operation.target.address
                                  : operation.sender.address
                              )
                            }
                            className="cursor-pointer ms-2"
                          />
                        </div>
                        <div className="d-flex justify-content-between text-muted">
                          <div>
                            {operation.status.charAt(0).toUpperCase() +
                              operation.status.slice(1)}
                          </div>
                          <div>
                            {moment(operation.timestamp).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })
            ) : (
              <div className="text-muted text-center">No Operation</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WalletOperations;
