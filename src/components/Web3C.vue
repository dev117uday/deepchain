<template>
  <div>
    <!-- IPFS -->

    <div class="split-form">
      <div class="container">
        <div
          class="partition left"
          :class="[toggle_switch ? 'inactive' : 'active']"
        >
          <div class="content-container">
            <div class="row">
              <div class="col-12">
                <h2>Configure IPFS yourself</h2>
              </div>
              <div class="col-6">
                <div v-if="!toggle_switch">
                  <h3>Connect to IPFS using Pinata</h3>
                  <form>
                    <div class="inputContainer">
                      <input
                        type="text"
                        id="api-keys"
                        v-model="pinata_api_key"
                      />
                      <label for="api-keys">Enter your API Keys</label>
                    </div>

                    <div class="inputContainer">
                      <input
                        type="password"
                        id="pinata-secret-api"
                        v-model="pinata_secret_api_key"
                      />
                      <label for="pinata-secret-api"
                        >Enter your Pinata Secret</label
                      >
                    </div>

                    <div class="inputContainer">
                      <input
                        type="password"
                        id="pinata-secret-token"
                        v-model="pinata_secret_token"
                      />
                      <label for="pinata-secret-token"
                        >Enter your Pinata Token</label
                      >
                    </div>

                    <button v-on:click="authToIPFS" class="btn hollow btn-form">
                      Connect to Pinata
                    </button>
                  </form>
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
                    <div
                      v-if="connect_pin_f"
                      class="alert alert-danger"
                      role="alert"
                    >
                      {{ connection_msg_pin }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div v-if="!toggle_switch">
                  <h3>Upload File</h3>

                  <div class="uploadSection">
                    <p>Supports JPG, PNG and MP4 videos.</p>
                    <div class="drag">
                      <input
                        id="upload-file"
                        type="file"
                        ref="files"
                        multiple
                        v-on:change="handleFilesUpload()"
                        hidden
                      />
                      <p>
                        Drop your file here or
                        <label for="upload-file">browse</label>
                      </p>
                    </div>
                  </div>

                  {{ file_selected }}

                  <button
                    v-on:click="uploadFiletoIPFS"
                    class="btn hollow btn-form"
                  >
                    Upload Files to IPFS
                  </button>

                  <br />
                  <br />

                  <div
                    v-if="connect_ipfs_s"
                    class="alert alert-success"
                    role="alert"
                  >
                    {{ connection_msg_ipfs }} <br />
                  </div>
                  IPFS hash : {{ ipfsHash }}
                  <div
                    v-if="connect_ipfs_f"
                    class="alert alert-danger"
                    role="alert"
                  >
                    {{ connection_msg_ipfs }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div v-if="toggle_switch">
                  <button
                    type="button"
                    v-on:click="toggle_switchx(1)"
                    class="btn"
                  >
                    View the section
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="partition right"
          :class="[toggle_switch ? 'active' : 'inactive']"
        >
          <div class="content-container">
            <div class="row">
              <div class="col-8">
                <h2>Enter IPFS CID</h2>
                <div v-if="!toggle_switch">
                  <button
                    type="button"
                    v-on:click="toggle_switchx(2)"
                    class="btn"
                  >
                    View the section
                  </button>
                </div>

                <div v-if="toggle_switch">
                  <div class="inputContainer">
                    <input
                      type="text"
                      id="ipfs-cid"
                      v-model="ipfsHash"
                      placeholder="https://ipfs.io/ipfs/QmR1zKD4TmK6fhA67KpyLkgPMgBfdfvDkist2LdVzmzGvxu"
                    />
                    <label for="ipfs-cid">Enter IPFS CID</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          <h6>Address (sending from) : {{ getAddress }}</h6>
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
      toggle_switch: true,
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
    performTransaction: async function () {
      if (this.ipfsHash == "") {
        alert("IPFS CID missing");
        return;
      } else if (this.addressFrom == "-") {
        alert("Please connect to MetaMask");
      }

      console.log(this.$store.state.account);

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
  computed: {
    getAddress: function () {
      return this.$store.state.account;
    },
  },
};
</script>

<style lang="scss">
$transition: 0.4s cubic-bezier(0.36, 0.33, 0, 1);
// $theme: #ff4d00;
// $theme: #fc5811;
// $dark: #14121f;
// $light: #eedfd2;
$inputBg: rgba(249, 249, 254, 0.5);

$dark: #231f20;
// $dark: #14121f;
$light: #fefefe;
$light2: #efefef;
$theme: #ff5000;

// leftside
$leftBgColor: $dark;
$bgColor: #252734;
$textColor: #f9f9fa;
// $inputBgColor: rgba(228, 228, 228, 0.929);
$inputBgColor: #fff;

// right side
$rightBgColor: $light2;
$rightTextColor: $dark;

.partition {
  width: 30%;
  height: 600px;
  display: inline-flex;
  flex-direction: column;
  padding: 60px 40px;
  float: left;
  margin-bottom: 100px;
  transition: $transition;
  position: relative;
  z-index: 1;

  .content-container {
    max-width: 885px;
  }

  h2 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 50px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 50px;
  }

  &.left {
    background-color: $leftBgColor;
    padding-left: 0;

    h2,
    h3 {
      color: $textColor;
    }
  }

  &.right {
    background-color: $rightBgColor;
    padding-right: 0;

    h2,
    h3 {
      color: $rightTextColor;
    }

    label {
      color: $rightTextColor !important;
    }
  }

  &.active {
    width: 70%;
  }

  // For inactive partition
  &.inactive {
    // hover effect to give the peek effect.
    &:hover {
      width: 32%;
      transition: $transition;

      &.right {
        margin-left: -2%;
      }

      &.left ~ .partition.right {
        width: 68%;
      }
    }
  }
}

// form elements
.inputContainer {
  position: relative;
  margin-top: 45px;
  top: 0;
  left: 0;

  input,
  textarea {
    height: 40px;
    border-radius: 3px;
    background-color: $inputBgColor;
    border: 0.5px solid $dark;
    padding: 0 15px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    color: black;

    &:active,
    &:focus {
      border: 1.5px solid $dark;
      outline: none;
    }

    &:active,
    &:focus,
    &:valid {
      & ~ label {
        color: $textColor;
        font-size: 14px;
        font-weight: 500;
        top: -34px;
        left: 0px;
        transition: all 0.3s ease;
      }
    }

    &:disabled {
      pointer-events: none;
      user-select: none;
      background-color: transparent;
      position: relative;

      & ~ label {
        height: 48px;
        margin-top: 1px;
        line-height: 48px;
        background-color: #f1f1f1;
      }
    }
  }

  label {
    font-size: 16px;
    font-weight: 600;
    color: $dark;
    height: 40px;
    line-height: 40px;
    position: absolute;
    left: 15px;
    top: 0;
    z-index: 1;
    transition: all 0.3s ease;
    // user-select: none;
    // pointer-events: none;
  }
}

// button

.btn {
  display: inline-flex;
  padding: 7px 14px;
  background-color: $theme;
  color: white;
  font-size: 15px;
  border: 1.5px solid $theme;

  &:hover {
    background-color: transparent;
    color: white;
    border: 1.5px solid $theme;
  }

  &.hollow {
    background-color: transparent;
    color: white;

    &.blackText {
      color: $dark;
    }

    &:hover {
      background-color: $theme;
      color: white;
    }
  }

  &.btn-form {
    margin-top: 30px;
  }
}

// image upload section

.uploadSection {
  padding: 26px 30px 30px;
  background-color: $inputBgColor;
  border: 0.5px solid $dark;
  border-radius: 3px;
  height: 100%;

  h2 {
    color: $dark;
    text-align: left;
    font-weight: 700;
    margin: 0 0 5px 0;
    font-size: 17px;
  }

  p {
    font-size: 12px;
    font-weight: 600;
    color: $dark;
    text-align: left;
    margin: 0 0 20px 0;
  }
}

.drag {
  // height: 140px;
  border-radius: 6px;
  border: 1px dashed #c7cbd9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 42px 0;

  p {
    text-align: center;
    color: $dark;
    font-size: 14px;
    font-weight: 400;
    margin: 0;

    label {
      color: $theme;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.split-form {
  // background-color: #8b87a7;
  background-color: $rightBgColor;
  height: 600px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 50%;
    left: 0;
    top: 0;
    height: 100%;
    background-color: $leftBgColor;
  }
}
</style>
