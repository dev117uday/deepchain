<template>
  <div class="about">
    <NavBar />
    <div class="jumbotron">
      <h4>Discover everything that has been happening on Deepchain</h4>
      <button class="btn btn-primary" v-on:click="fetchdata">Get Data</button>
    </div>
    <div class="container mt-3">
      <br />
      <br />
      <ul class="list-group" v-for="item in discover_data" :key="item.id">
        <li class="list-group-item">
          IPFS CID : {{ item.ipfs_cid }}
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            v-on:click="getImgUrl(item.ipfs_cid)"
          >
            See
          </button>
        </li>
        <li class="list-group-item">Address to : {{ item.address_to }}</li>
        <li class="list-group-item">Address from : {{ item.address_from }}</li>
        <li class="list-group-item">Item : {{ item.txhash }}</li>
        <br />
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
            <div class="modal-body"><img :src="img" class="img-fluid" /></div>
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
var axios = require("axios");
import NavBar from "@/components/Navbar.vue";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  data() {
    return {
      discover_data: [],
      getImg: null,
      img: null,
    };
  },
  methods: {
    fetchdata: function () {
      this.discover_data = [];
      var config = {
        method: "get",
        url: "http://localhost:3000/gettx",
        headers: {},
      };

      axios(config)
        .then((response) => {
          response.data.map((d) => {
            this.discover_data.push(d);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      return "";
    },
    getImgUrl: function (ipfs_cid) {
      this.img = ipfs_cid;
      return ipfs_cid;
    },
  },
};
</script>
