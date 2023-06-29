import React, { useEffect, useState } from "react";
import { Veriff } from "@veriff/js-sdk";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import axios from "axios";
import CryptoJS from "crypto-js";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";

export const VeriffPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signMessage = (message, key) => {
    return CryptoJS.HmacSHA256(message, key);
  };
  const { contract } = useContract(
    "0x25a4e8C179A2a28B7d30A2932DdCbe81849564e4",
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "oracle",
            type: "address",
          },
          {
            internalType: "string",
            name: "_sourceCode",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "EmptyArgs",
        type: "error",
      },
      {
        inputs: [],
        name: "EmptySecrets",
        type: "error",
      },
      {
        inputs: [],
        name: "EmptySource",
        type: "error",
      },
      {
        inputs: [],
        name: "NoInlineSecrets",
        type: "error",
      },
      {
        inputs: [],
        name: "RequestIsAlreadyPending",
        type: "error",
      },
      {
        inputs: [],
        name: "RequestIsNotPending",
        type: "error",
      },
      {
        inputs: [],
        name: "SenderIsNotRegistry",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "result",
            type: "bytes",
          },
          {
            indexed: false,
            internalType: "bytes",
            name: "err",
            type: "bytes",
          },
        ],
        name: "OCRResponse",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "OwnershipTransferRequested",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "RequestFulfilled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
        ],
        name: "RequestSent",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "recieverAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
        ],
        name: "TransferredCoins",
        type: "event",
      },
      {
        inputs: [],
        name: "acceptOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "oracleAddress",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32",
          },
        ],
        name: "addSimulatedRequestId",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "ans",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "subtractedValue",
            type: "uint256",
          },
        ],
        name: "decreaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            components: [
              {
                internalType: "enum Functions.Location",
                name: "codeLocation",
                type: "uint8",
              },
              {
                internalType: "enum Functions.Location",
                name: "secretsLocation",
                type: "uint8",
              },
              {
                internalType: "enum Functions.CodeLanguage",
                name: "language",
                type: "uint8",
              },
              {
                internalType: "string",
                name: "source",
                type: "string",
              },
              {
                internalType: "bytes",
                name: "secrets",
                type: "bytes",
              },
              {
                internalType: "string[]",
                name: "args",
                type: "string[]",
              },
            ],
            internalType: "struct Functions.Request",
            name: "req",
            type: "tuple",
          },
          {
            internalType: "uint64",
            name: "subscriptionId",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "gasLimit",
            type: "uint32",
          },
          {
            internalType: "uint256",
            name: "gasPrice",
            type: "uint256",
          },
        ],
        name: "estimateCost",
        outputs: [
          {
            internalType: "uint96",
            name: "",
            type: "uint96",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "source",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "secrets",
            type: "bytes",
          },
          {
            internalType: "string[]",
            name: "args",
            type: "string[]",
          },
          {
            internalType: "uint64",
            name: "subscriptionId",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "gasLimit",
            type: "uint32",
          },
        ],
        name: "executeRequest",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getDONPublicKey",
        outputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32",
          },
          {
            internalType: "bytes",
            name: "response",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "err",
            type: "bytes",
          },
        ],
        name: "handleOracleFulfillment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "addedValue",
            type: "uint256",
          },
        ],
        name: "increaseAllowance",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "latestError",
        outputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "latestRequestId",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "latestResponse",
        outputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenAmount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string[]",
            name: "args",
            type: "string[]",
          },
          {
            internalType: "bytes",
            name: "secrets",
            type: "bytes",
          },
          {
            internalType: "uint64",
            name: "subscriptionId",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "gasLimit",
            type: "uint32",
          },
        ],
        name: "transferToken",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "oracle",
            type: "address",
          },
        ],
        name: "updateOracleAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_sourceCode",
            type: "string",
          },
        ],
        name: "updateSourceCode",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ]
  );
  const { mutateAsync: transferToken, isLoading2 } = useContractWrite(
    contract,
    "transferToken"
  );

  const { data: latestResponse, isLoading: isLatestResponseLoading } =
    useContractRead(contract, "latestResponse");

  const address = useAddress();
  const [sessionId, setSessionId] = useState(null);
  const generateClaim = async () => {
    console.log("claim generation started-------------");
    handleCall();
  };

  const handleCall = async () => {
    try {
      setIsLoading(true);
      const data = await transferToken({
        args: [[sessionId], [], 1864, 300000],
      });
      console.info("contract handleCall success", data);
    } catch (err) {
      console.error("contract handleCall failure", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (sessionId) {
      interval = window.setInterval(async () => {
        try {
          const response = await axios.get(
            `https://stationapi.veriff.com/v1/sessions/${sessionId}/decision`,
            {
              headers: {
                "X-AUTH-CLIENT": "94c6eecf-99ea-4c05-8708-75fb6d67992b",
                "Content-Type": "application/json",
                "X-HMAC-SIGNATURE": signMessage(
                  sessionId,
                  "a26fffce-ea3f-45c4-8926-0695233de3c2"
                ),
              },
            }
          );
          if (response.data.verification) {
            window.clearInterval(interval);
            generateClaim();
          }
        } catch (error) {
          console.log(error);
          window.clearInterval(interval);
        }
      }, 60 * 1000);
    }
    return () => window.clearInterval(interval);
  }, [sessionId]);
  useEffect(() => {
    if (address) {
      {
        const veriff = Veriff({
          host: "https://stationapi.veriff.com",
          apiKey: "94c6eecf-99ea-4c05-8708-75fb6d67992b",
          parentId: "veriff-root",
          onSession: function (err, response) {
            console.log(response);
            if (response.status === "success") {
              createVeriffFrame({ url: response.verification.url });
              setSessionId(response.verification.id);
            }
          },
        });
        veriff.mount();
      }
    }
  }, 1000);

  return (
    <>
      <ConnectWallet />
      { <section id="veriff-root"></section>}
      {isLatestResponseLoading ? (
        <p>Loading latest response...</p>
      ) : (
        <p>Latest Response: {latestResponse}</p>
      )}
    </>
  );
};
