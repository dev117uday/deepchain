<template>
  <div class="container mt-3">
    <!-- IPFS -->
    <div>
      <div>
        <h3>Connect to IPFS using Pinata</h3>
        Enter your API KEYS
        <input
          class="form-control"
          placeholder="xxxxxxxxxxx"
          v-model="pinata_api_key"
        />
        <br />
        Enter your PINATA SECRET
        <input
          class="form-control"
          placeholder="xxxxxxxxxxx"
          v-model="pinata_secret_api_key"
        />
        <br />
        <button v-on:click="authToIPFS" class="btn btn-info">click me</button>
        <br />
        <br />
        <div>
          <div v-if="connect_pin_s" class="alert alert-success" role="alert">
            {{ connection_msg_pin }}
          </div>
          <div v-if="connect_pin_f" class="alert alert-danger" role="alert">
            {{ connection_msg_pin }}
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- Upload Files to IPFS -->
    <div class="row">
      <div class="col-sm-6">
        <h3>Upload File to IPFS</h3>
        <input
          type="file"
          id="files"
          ref="files"
          multiple
          v-on:change="handleFilesUpload()"
        />
        <br /><br />
        <button v-on:click="uploadFiletoIPFS" class="btn btn-info">
          Upload Files to IPFS
        </button>
      </div>
      <div>
        <div>
          <div v-if="connect_ipfs_s" class="alert alert-success" role="alert">
            {{ connection_msg_ipfs }} <br />
            IPFS hash : {{ ipfsHash }}
          </div>
          <div v-if="connect_ipfs_f" class="alert alert-danger" role="alert">
            {{ connection_msg_ipfs }}
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- Connection to metamask -->
    <div class="container">
      <h3>Check & Connect to MetaMask</h3>
      <div>
        <button class="btn btn-success" v-on:click="ethPresent">
          Click to check connection with MetaMask
        </button>

        <br />
        <br />

        <div class="container">
          <div v-if="connect_meta_s" class="alert alert-success" role="alert">
            {{ connection_msg_meta }} <br />
          </div>
          <div v-if="connect_meta_f" class="alert alert-danger" role="alert">
            {{ connection_msg_meta }}
          </div>
        </div>
      </div>
    </div>

    <!-- Finall transaction -->
    <div class="container">
      <button class="btn btn-outline-success" v-on:click="finalTransaction">
        Click me
      </button>
    </div>

    <hr />
  </div>
</template>

<script>
import Web3 from "web3";
const axios = require("axios");
const { config } = require("./config");
import { Biconomy } from "@biconomy/mexa";
let contract;
let web3;
let biconomy;

export default {
  name: "Web3C",
  data() {
    return {
      version: "",
      node_link: "https://goerli.infura.io/v3/ad26acf72e0945038f8d9fb33112f8e8",
      connect_node_s: false,
      connect_node_f: false,
      connect_pin_s: false,
      connect_pin_f: false,
      connect_ipfs_s: false,
      connect_ipfs_f: false,
      connect_meta_s: false,
      connect_meta_f: false,
      connection_msg: "",
      connection_msg_pin: "",
      connection_msg_ipfs: "",
      connection_msg_meta: "",
      pinata_api_key: "ba1277dc9403018e97fc",
      pinata_secret_api_key:
        "83cd5dac1c03a8f4babbdaef343b96f0ca1d3d888539534c64940c4e1dc8557e",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDc0NzExNS0yZGYzLTQ4NTYtOGU1MS1kZDFkMjdkMTBiOGEiLCJlbWFpbCI6InVkYXkwMnlhZGF2MTE3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYTEyNzdkYzk0MDMwMThlOTdmYyIsInNjb3BlZEtleVNlY3JldCI6IjgzY2Q1ZGFjMWMwM2E4ZjRiYWJiZGFlZjM0M2I5NmYwY2ExZDNkODg4NTM5NTM0YzY0OTQwYzRlMWRjODU1N2UiLCJpYXQiOjE2MTc0NTY1MDJ9.tSP-3Jr1ocaohHbnIkLJWq9lnZ3DtLn8jyHsAm1JpWs",
      file: null,
      ipfsHash: "",
      metamask_account: "",
    };
  },
  methods: {
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    },
    web3init: function () {
      let web3 = new Web3(this.node_link);
      this.version = web3.version;

      web3.eth.net
        .isListening()
        .then(() => {
          this.connect_node_s = true;
          this.connect_node_f = false;
          this.connection_msg = "Connected to the node !";
        })
        .catch(() => {
          this.connect_node_s = false;
          this.connect_node_f = true;
          this.connection_msg = "Unable to connect to the node, please check";
        });
    },
    authToIPFS: function () {
      const url = `https://api.pinata.cloud/data/testAuthentication`;
      axios
        .get(url, {
          headers: {
            pinata_api_key: this.pinata_api_key,
            pinata_secret_api_key: this.pinata_secret_api_key,
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(() => {
          this.connect_pin_s = true;
          this.connect_pin_f = false;
          this.connection_msg_pin =
            "Congratulations! You are communicating with the Pinata !";
        })
        .catch((e) => {
          console.log("error", e);
          this.connect_pin_s = false;
          this.connect_pin_f = true;
          this.connection_msg_pin = "Unable to authenticate with pinata";
        });
    },
    uploadFiletoIPFS: function () {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      let data = new FormData();

      if (this.$refs.files.files[0] == undefined) {
        this.connect_ipfs_s = false;
        this.connect_ipfs_f = true;
        this.connection_msg_ipfs = "Please select a file to upload";
        return 0;
      }

      data.append(
        "file",
        this.$refs.files.files[0],
        this.$refs.files.files[0].name
      );
      const metadata = JSON.stringify({
        name: "testname",
        keyvalues: {
          exampleKey: "exampleValue",
        },
      });
      data.append("pinataMetadata", metadata);

      axios
        .post(url, data, {
          headers: {
            pinata_api_key: this.pinata_api_key,
            pinata_secret_api_key: this.pinata_secret_api_key,
          },
        })
        .then((response) => {
          this.ipfsHash = response.data.IpfsHash;
          this.connect_ipfs_s = true;
          this.connect_ipfs_f = false;
          this.connection_msg_ipfs = "File Uploaded Success !";
        })
        .catch(function (error) {
          console.log(error);
          this.connect_ipfs_s = false;
          this.connect_ipfs_f = true;
          this.connection_msg_ipfs = "Unable to upload file, retry";
        });
    },
    ethPresent: async function () {
      this.metamask_account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      try {
        this.connect_meta_s = true;
        this.connect_meta_f = false;
        this.connection_msg_meta = "Metamask Available and Connected";
      } catch (error) {
        console.log("not present", error);
        this.connect_meta_s = false;
        this.connect_meta_f = true;
        this.connection_msg_meta = "Unable to find or connect with Metamask";
      }
    },
    finalTransaction: async function () {
      biconomy = new Biconomy(window.ethereum, {
        apiKey: "cPYqR7AP8.51d9ecf9-29e8-4885-8ab2-bd3b2d75724a",
        debug: true,
      });
      await biconomy
        .onEvent(biconomy.READY, async () => {
          web3 = new Web3(biconomy);
          contract = await new web3.eth.Contract(
            config.contract.abi,
            config.contract.address
          );
          console.log("biconomy ready");
          console.log(contract);
          await this.performTransaction();
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          console.log(error);
          console.log(message);
        });
    },
    performTransaction: async function () {
      const domainType = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ];
      const metaTransactionType = [
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" },
      ];
      let domainData = {
        name: "DeepChainContract",
        version: "1",
        chainId: "42",
        verifyingContract: config.contract.address,
      };
      let message = {};
      await web3.eth
        .getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
        .then((value) => {
          message.nonce = value;
        });

      // let nonce = await contract.methods
      //     .nonces(window.ethereum.selectedAddress)
      //     .call();

      // message.nonce = parseInt(nonce);
      // message.nonce = nonce;
      message.from = window.ethereum.selectedAddress;
      message.data = this.ipfsHash;

      const dataToSign = JSON.stringify({
        types: {
          EIP712Domain: domainType,
          MetaTransaction: metaTransactionType,
        },
        domain: domainData,
        primaryType: "MetaTransaction",
        message: message,
      });

      window.web3.currentProvider.sendAsync(
        {
          jsonrpc: "2.0",
          id: 999999999999,
          method: "eth_signTypedData_v4",
          params: [window.ethereum.selectedAddress, dataToSign],
        },
        async function (err, result) {
          if (err) {
            return console.error(err);
          }
          console.log("Signature result from wallet :");
          console.log(result);
          if (result && result.result) {
            const signature = result.result.substring(2);
            const r = "0x" + signature.substring(0, 64);
            const s = "0x" + signature.substring(64, 128);
            const v = parseInt(signature.substring(128, 130), 16);
            console.log(r, "r");
            console.log(s, "s");
            console.log(v, "v");
            console.log(window.ethereum.address, "userAddress");

            const promiEvent = contract.methods.receiver().send({
              from: window.ethereum.selectedAddress,
            });
            promiEvent
              .on("transactionHash", (hash) => {
                console.log(
                  "Transaction sent successfully. Check Console for Transaction hash"
                );
                console.log("Transaction Hash is ", hash);
              })
              .once("confirmation", (confirmationNumber, receipt) => {
                if (receipt.status) {
                  console.log(
                    "Transaction processed successfully",
                    confirmationNumber,
                    receipt
                  );
                } else {
                  console.log("Transaction Failed");
                }
                console.log(receipt);
              });
          } else {
            console.log(
              "Could not get user signature. Check console logs for error"
            );
          }
        }
      );
    },
  },
};
</script>
