<template>
  <div class="container mt-3">
    <!-- IPFS -->
    <div>
      <div class="col-sm-8">
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
          type="password"
          class="form-control"
          placeholder="xxxxxxxxxxx"
          v-model="pinata_secret_api_key"
        />
        <br />
        Enter your PINATA Token
        <input
          type="password"
          class="form-control"
          placeholder="xxxxxxxxxxx"
          v-model="pinata_secret_token"
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
        <hr />
      </div>
    </div>

    <!-- Upload Files to IPFS -->
    <div class="container">
      <div class="row">
        <div class="col-xs-8">
          <h3>Upload File to IPFS</h3>
          <input
            type="file"
            id="files"
            ref="files"
            multiple
            v-on:change="handleFilesUpload()"
          />
          <br />
          {{ file_selected }}
          <br />
          <button v-on:click="uploadFiletoIPFS" class="btn btn-info">
            Upload Files to IPFS
          </button>
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col-xs-8">
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

    <br />
    <br />
    <!-- Connection to metamask -->
    <div>
      <div class="col-sm-8">
        <h3>Check & Connect to MetaMask</h3>
        <div>
          <button class="btn btn-success" v-on:click="walletDetector">
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
    </div>
    https://ipfs.io/ipfsQmR1zKD4TmK6fhA67KpyLkgPMgBf3JDkist2LdVzmzGvxu
    <br />
    <br />
    <div class="row">
      <div class="col-sm-8">
        <h2>Confirm Final Transaction</h2>
        <hr />
        IPFS Hash
        <input type="text" class="form-control" v-model="ipfsHash" />
      </div>
    </div>
    <br />
    <!-- Finall transaction -->
    <div class="container">
      <button class="btn btn-outline-success" v-on:click="performTransaction">
        Click me
      </button>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import Web3 from "web3";
const axios = require("axios");
// let web3;
// const { config } = require("./config");
// import { Biconomy } from "@biconomy/mexa";
// import Portis from "@portis/web3";
// let contract;
// let biconomy;
// let portis;

export default {
  name: "Web3C",
  data() {
    return {
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
      pinata_secret_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDc0NzExNS0yZGYzLTQ4NTYtOGU1MS1kZDFkMjdkMTBiOGEiLCJlbWFpbCI6InVkYXkwMnlhZGF2MTE3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYTEyNzdkYzk0MDMwMThlOTdmYyIsInNjb3BlZEtleVNlY3JldCI6IjgzY2Q1ZGFjMWMwM2E4ZjRiYWJiZGFlZjM0M2I5NmYwY2ExZDNkODg4NTM5NTM0YzY0OTQwYzRlMWRjODU1N2UiLCJpYXQiOjE2MTc0NTY1MDJ9.tSP-3Jr1ocaohHbnIkLJWq9lnZ3DtLn8jyHsAm1JpWs",
      file: null,
      ipfsHash: "",
      metamask_account: "",
      addressTo: "0x7e1a31293b444BB16E9f770DA9C71eb2bA7Bb6b3",
      file_selected: "",
    };
  },
  methods: {
    handleFilesUpload() {
      this.files = this.$refs.files.files;
      if (this.$refs.files.files) {
        this.file_selected = "File Selected";
      }
    },

    authToIPFS: function () {
      const url = `https://api.pinata.cloud/data/testAuthentication`;
      axios
        .get(url, {
          headers: {
            pinata_api_key: this.pinata_api_key,
            pinata_secret_api_key: this.pinata_secret_api_key,
            Authorization: `Bearer ${this.pinata_secret_token}`,
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

      this.connect_ipfs_s = true;
      this.connect_ipfs_f = false;
      this.connection_msg_ipfs = "Please wait, File is being uploaded";
      this.ipfsHash = "!";

      data.append(
        "file",
        this.$refs.files.files[0],
        this.$refs.files.files[0].name
      );
      const metadata = JSON.stringify({
        name: this.$refs.files.files[0].name,
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
          this.ipfsHash = "https://ipfs.io/ipfs" + response.data.IpfsHash;
          this.connect_ipfs_s = true;
          this.connect_ipfs_f = false;
          this.connection_msg_ipfs = "File Uploaded Success !";
          this.file_selected = "";
        })
        .catch(function (error) {
          console.log(error);
          this.connect_ipfs_s = false;
          this.connect_ipfs_f = true;
          this.file_selected = "";
          this.connection_msg_ipfs = "Unable to upload file, retry";
        });
    },
    walletDetector: async function () {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
      }
      console.log(window.ethereum.isMetaMask);
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

    performTransaction: async function () {

      console.log(Web3.utils.utf8ToHex("20.000001000"))

      let message = {
        // gas: '40000',
        // gasPrice: '40000',
        // gasLimit: '21000',
        gasPrice: Web3.utils.utf8ToHex("0.00000100"),
        gas: Web3.utils.utf8ToHex("0.00000100"),
        value: "0x00",
        to: this.addressTo,
        from: window.ethereum.selectedAddress,
        data: Web3.utils.utf8ToHex(
          "https://ipfs.io/ipfs/QmR1zKD4TmK6fhA67KpyLkgPMgBf3JDkist2LdVzmzGvxu"
        ),
      };

      await window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [message],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.log(error));

      // web3 = new Web3("https://rpc.slock.it/goerli");
      // console.log(web3.currentProvider);

      // await web3.eth.accounts
      //   .signTransaction(
      //     message,
      //     "0x452c9e812af4df5d8f2ac3937bd2be5fb16b238206453f31b490d057405542e8"
      //   )
      //   .then((data) => {
      //     console.log(data);
      //     web3.eth
      //       .sendSignedTransaction(data["rawTransaction"])
      //       .on("receipt", console.log);
      //   });
    },
  },
};
</script>
