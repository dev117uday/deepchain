<template>
  <div>
    <!-- IPFS -->

    <div class="container">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          v-on:click="toggle_switchx(1)"
          class="btn btn-info"
        >
          Configure IPFS yourself
        </button>
        <button
          type="button"
          v-on:click="toggle_switchx(2)"
          class="btn btn-primary"
        >
          Enter IPFS CID
        </button>
      </div>
      <br />
      <br />
      <div v-if="!toggle_switch">
        <div class="row">
          <div class="col-sm-6">
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
            <button v-on:click="authToIPFS" class="btn btn-info">
              Establish Connection With Pinata
            </button>
            <br />
            <br />
            <div>
              <div
                v-if="connect_pin_s"
                class="alert alert-success"
                role="alert"
              >
                {{ connection_msg_pin }}
              </div>
              <div v-if="connect_pin_f" class="alert alert-danger" role="alert">
                {{ connection_msg_pin }}
              </div>
            </div>
          </div>
          <div class="col-sm-6">
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
            <br />
            <br />
            <div v-if="connect_ipfs_s" class="alert alert-success" role="alert">
              {{ connection_msg_ipfs }} <br />
            </div>
            IPFS hash : {{ ipfsHash }}
            <div v-if="connect_ipfs_f" class="alert alert-danger" role="alert">
              {{ connection_msg_ipfs }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="toggle_switch">
        <p class="text-muted">
          Sample :
          https://ipfs.io/ipfs/QmR1zKD4TmK6fhA67KpyLkgPMgBf3JDkist2LdVzmzGvxu
        </p>
        <h4>Enter IPFS CID :</h4>
        <input
          type="text"
          class="form-control"
          v-model="ipfsHash"
          placeholder="https://ipfs.io/ipfs/QmR1zKD4TmK6fhA67KpyLkgPMgBfdfvDkist2LdVzmzGvxu"
        />
        <br />
        <h5>IPFS CID : {{ ipfsHash }}</h5>
      </div>
    </div>
    <hr />
    <!-- Connection to metamask -->
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <h4>Check & Connect to MetaMask</h4>
          <div>
            <button class="btn btn-success" v-on:click="walletDetector">
              Click to check connection with MetaMask
            </button>
            <br />
            <br />
            <div>
              <div
                v-if="connect_meta_s"
                class="alert alert-success"
                role="alert"
              >
                {{ connection_msg_meta }} <br />
              </div>
              <div
                v-if="connect_meta_f"
                class="alert alert-danger"
                role="alert"
              >
                {{ connection_msg_meta }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <h2>Confirm Final Transaction</h2>
          <hr />
          IPFS CID
          <input type="text" class="form-control" v-model="ipfsHash" />
          <br />
          Address (send to) : (set to default address)
          <input type="text" class="form-control" v-model="addressTo" />
          <br />
          <h6>Address (sending from) : {{ addressFrom }}</h6>
        </div>
      </div>
      <br />
      <!-- Finall transaction -->
      <div class="container">
        <button class="btn btn-outline-danger" v-on:click="performTransaction">
          Stamp Data File on Blockchain
        </button>
      </div>
      <br />
      <div>
        <div v-if="connect_final_s" class="alert alert-success" role="alert">
          {{ connection_msg_final }} <br />
        </div>
        <div v-if="connect_final_f" class="alert alert-danger" role="alert">
          {{ connection_msg_final }}
        </div>
      </div>
    </div>

    <br />
    <br />

    <!-- <button class="btn btn-success" v-on:click="send_data">
      Click me click me
    </button> -->
  </div>
</template>

<script>
import Web3 from "web3";
const axios = require("axios");

export default {
  name: "Web3C",
  data() {
    return {
      connect_pin_s: false,
      connect_pin_f: false,
      connect_ipfs_s: false,
      connect_ipfs_f: false,
      connect_final_s: false,
      connect_final_f: false,
      connect_meta_s: false,
      connect_meta_f: false,
      connection_msg_pin: "",
      connection_msg_ipfs: "",
      connection_msg_final: "",
      connection_msg_meta: "",
      toggle_switch: false,
      pinata_api_key: "ba1277dc9403018e97fc",
      pinata_secret_api_key:
        "83cd5dac1c03a8f4babbdaef343b96f0ca1d3d888539534c64940c4e1dc8557e",
      pinata_secret_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDc0NzExNS0yZGYzLTQ4NTYtOGU1MS1kZDFkMjdkMTBiOGEiLCJlbWFpbCI6InVkYXkwMnlhZGF2MTE3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYTEyNzdkYzk0MDMwMThlOTdmYyIsInNjb3BlZEtleVNlY3JldCI6IjgzY2Q1ZGFjMWMwM2E4ZjRiYWJiZGFlZjM0M2I5NmYwY2ExZDNkODg4NTM5NTM0YzY0OTQwYzRlMWRjODU1N2UiLCJpYXQiOjE2MTc0NTY1MDJ9.tSP-3Jr1ocaohHbnIkLJWq9lnZ3DtLn8jyHsAm1JpWs",
      file: null,
      ipfsHash: "",
      metamask_account: "",
      addressTo: "0x7e1a31293b444BB16E9f770DA9C71eb2bA7Bb6b3",
      addressFrom: "-",
      file_selected: "",
      txhash: "",
    };
  },
  methods: {
    toggle_switchx: function (i) {
      if (i == 1) {
        this.toggle_switch = false;
      } else {
        this.toggle_switch = true;
      }
    },
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
          this.ipfsHash = "https://ipfs.io/ipfs/" + response.data.IpfsHash;
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
      this.metamask_account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        console.log(window.ethereum.isMetaMask);

        this.connect_meta_s = true;
        this.connect_meta_f = false;
        this.connection_msg_meta = "Metamask Available and Connected";
        this.addressFrom = window.ethereum.selectedAddress;
      } catch (error) {
        console.log("not present", error);
        this.connect_meta_s = false;
        this.connect_meta_f = true;
        this.connection_msg_meta = "Unable to find or connect with Metamask";
      }
    },

    performTransaction: async function () {
      if (this.ipfsHash == "") {
        alert("IPFS CID missing");
        return;
      } else if (this.addressFrom == "-") {
        alert("Please connect to MetaMask");
      }

      let message = {
        gas: "6000",
        gasPrice: "400",
        from: window.ethereum.selectedAddress,
        to: this.addressTo,
        data: Web3.utils.utf8ToHex(this.ipfsHash),
      };

      await window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [message],
        })
        .then((txHash) => {
          this.txhash = txHash;
          this.connect_final_s = true;
          this.connect_final_f = false;
          this.connection_msg_final = "txhash : " + txHash;
          this.send_data();
        })
        .catch((error) => {
          this.connect_final_s = false;
          this.connect_final_f = true;
          this.connection_msg_final = error.message;
        });
    },
    send_data: function () {
      console.log("click");

      var data = JSON.stringify({
        ipfs_cid: this.ipfsHash,
        address_to: this.addressTo,
        address_from: this.addressTo,
        txhash: this.txhash,
      });

      var config = {
        method: "post",
        url: "http://127.0.0.1:3000/savetx",
        headers: {
          Accept: "application/javascript",
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
