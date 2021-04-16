<template>
  <div class="about">
    <div class="jumbotron">
      <h4>Discover everything that has been happening on Deepchain</h4>
      <button class="btn btn-primary" v-on:click="loadContract">
        Get Data
      </button>
      &nbsp;
      <button class="btn btn-primary" v-on:click="mainpage">
        Back To Main Page
      </button>
    </div>
    <div class="container">
      <br />
      <br />
      <ul
        class="list-group"
        v-for="item in discover_data"
        :key="item.transactionHash"
      >
        <li>
          Tx : {{ item.transactionHash }} <br />
          - Data : {{ item.input }}
        </li>
      </ul>
      <!-- Button trigger modal -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Data</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img :src="img" class="img-fluid" />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from "web3";
const web3 = new Web3("https://rpc.slock.it/goerli");
console.log(web3.currentProvider.connected);

export default {
  name: "Home",
  data() {
    return {
      discover_data: [],
      getImg: null,
      img: null,
    };
  },
  methods: {
    getImgUrl: function (ipfs_cid) {
      this.img = ipfs_cid;
      return ipfs_cid;
    },
    mainpage: function () {
      window.location.href = "/";
    },
    loadContract: async function () {
      let { contract } = require("../contract.js");

      var sc = new web3.eth.Contract(contract.contract, contract.address);
      await sc.getPastEvents(
        "Received",
        {
          fromBlock: (await web3.eth.getBlockNumber()) - 20000,
          toBlock: "latest",
        },
        (err, event) => {
          event.map(async (data) => {
            let dataObject = [];
            dataObject["transactionHash"] = data.transactionHash;
            await web3.eth.getTransaction(data.transactionHash).then((x) => {
              dataObject["input"] = Web3.utils.hexToUtf8(x.input);
            });
            this.discover_data.push(dataObject);
          });
          console.log(err);
        }
      );
    },
  },
};
</script>
