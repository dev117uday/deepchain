<template>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav">
            <p class="logo">DeepChain</p>
            <div v-on:click="discover" class="walletConnect">Discover Page</div>
            <div
              class="walletConnect"
              :class="[wallet_connected ? 'connected' : 'disconnected']"
            >
              <div class="indicator"></div>
              <span v-on:click="walletDetector">
                <span v-if="!wallet_connected">Connect Wallet</span>
                <span v-if="wallet_connected">Wallet Connected</span>
              </span>
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
  data() {
    return {
      wallet_connected: false,
    };
  },
  methods: {
    walletDetector: async function () {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        this.wallet_connected = false;
      }
      this.metamask_account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        console.log(window.ethereum.isMetaMask);
        this.wallet_connected = true;
        this.$store.commit("setAccount", `${window.ethereum.selectedAddress}`);
      } catch (error) {
        this.wallet_connected = false;
        console.log("not present", error);
        alert("Unable to find or connect with Metamask");
      }
    },
    discover: function () {
      window.location.href = "/discover";
    },
  },
};
</script>

<style lang="scss" scoped>
$dark: #231f20;
$light: #fefefe;
$light2: #efefef;
$theme: #ff5000;

.nav {
  height: 80px;
  border-bottom: 1px solid $light;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  color: $light;
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
}

.walletConnect {
  height: 32px;
  line-height: 32px;
  padding: 0 14px;
  border: 1px solid $light;
  border-radius: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 23px;
  cursor: pointer;
  color: $light;

  &.connected {
    .indicator {
      background-color: green;
    }
  }

  &.disconnected {
    .indicator {
      background-color: red;
    }

    background-color: white;
    color: black;
  }

  &:hover {
    background-color: #f1f1f1;
    color: $dark;
  }
}
</style>
