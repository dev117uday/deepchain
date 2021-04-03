<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-sm-6">
        <h4>Connect to node</h4>
        Enter your connection to node
        <input
          class="form-control"
          placeholder="http | ws://some.local-or-remote.node:8546"
          v-model="node_link"
        />
        <br />
        <button v-on:click="web3init" class="btn btn-info">click me</button>
        <br />
        <br />
        <div>
          <div v-if="connect_node_s" class="alert alert-success" role="alert">
            {{ connection_msg }}
          </div>
          <div v-if="connect_node_f" class="alert alert-danger" role="alert">
            {{ connection_msg }}
          </div>
        </div>
      </div>
      <br />
      <div class="col-sm-6">
        <h2>Connect to IPFS using Pinata</h2>
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
    <div class="row">
      <div class="col-sm-6"></div>
    </div>
    <h5>Upload File</h5>
    <input
      type="file"
      id="files"
      ref="files"
      multiple
      v-on:change="handleFilesUpload()"
    />
    <br /><br />
    <button v-on:click="uploadFiletoIPFS" class="btn btn-info">click me</button>
  </div>
</template>

<script>
import Web3 from "web3";
const axios = require("axios");
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
      connection_msg: "",
      connection_msg_pin: "",
      pinata_api_key: "ba1277dc9403018e97fc",
      pinata_secret_api_key:
        "83cd5dac1c03a8f4babbdaef343b96f0ca1d3d888539534c64940c4e1dc8557e",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMDc0NzExNS0yZGYzLTQ4NTYtOGU1MS1kZDFkMjdkMTBiOGEiLCJlbWFpbCI6InVkYXkwMnlhZGF2MTE3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiYTEyNzdkYzk0MDMwMThlOTdmYyIsInNjb3BlZEtleVNlY3JldCI6IjgzY2Q1ZGFjMWMwM2E4ZjRiYWJiZGFlZjM0M2I5NmYwY2ExZDNkODg4NTM5NTM0YzY0OTQwYzRlMWRjODU1N2UiLCJpYXQiOjE2MTc0NTY1MDJ9.tSP-3Jr1ocaohHbnIkLJWq9lnZ3DtLn8jyHsAm1JpWs",
      file: null,
      ipfsHash: "",
    };
  },
  methods: {
    handleFilesUpload() {
      this.files = this.$refs.files.files;
      console.log(this.files);
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
          this.connection_msg_pin = "unable to authenticate with pinata";
        });
    },
    uploadFiletoIPFS: function () {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      let data = new FormData();

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
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
