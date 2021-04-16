exports.contract = {
  contract: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Received",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "txhash",
          type: "string",
        },
      ],
      name: "StartTick",
      type: "event",
    },
    { stateMutability: "payable", type: "fallback" },
    {
      inputs: [],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "invest",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "makeOwnerRich",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "txHash", type: "string" }],
      name: "receivedTx",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
  address: "0x3851662e9f0A6c42636B72b8f392345cd29F9780",
};
