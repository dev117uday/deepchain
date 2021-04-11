<template>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav">
            <p class="logo">DeepChain</p>
            <div class="walletConnect">
              <div class="indicator"></div>
              <span v-on:click="walletDetector">Connect wallet</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods : {
    walletDetector: async function () {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
      }
      this.metamask_account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        console.log(window.ethereum.isMetaMask);
        alert("metamask connected")
        this.$store.commit("setAccount",`${window.ethereum.selectedAddress}`);
        
      } catch (error) {
        console.log("not present", error);
        alert("Unable to find or connect with Metamask")
      }
    },

  }
};
</script>

<style lang="scss" scoped>
.nav {
  height: 80px;
  border-bottom: 2px solid #434343;
  display: flex;
  justify-content: space-between;
}

.logo {
  font-size: 17px;
  font-weight: 500;
  line-height: 78px;
}

.indicator {
  height: 9px;
  width: 9px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: red;
}

.walletConnect {
  height: 32px;
  line-height: 32px;
  padding: 0 14px;
  border: 1px solid black;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 23px;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
}
</style>
