const config = {};
config.contract = {
  address: "0x7e1a31293b444BB16E9f770DA9C71eb2bA7Bb6b3",
  abi: [
    {
      inputs: [
        { internalType: "address", name: "trustedForwarder", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address",
        },
      ],
      name: "ReceivedPayment",
      type: "event",
    },
    {
      inputs: [],
      name: "balance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "payout",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "receiver",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "trustedForwarder", type: "address" },
      ],
      name: "setTrustedForwarder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};

module.exports = { config };
