<template>
  <nav>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="nav">
            <p class="logo">DeepChain</p>
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
  methods: {
    walletDetector: async function () {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
      }
      this.metamask_account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        console.log(window.ethereum.isMetaMask);
        alert("metamask connected");
        this.$store.commit("setAccount", `${window.ethereum.selectedAddress}`);
      } catch (error) {
        console.log("not present", error);
        alert("Unable to find or connect with Metamask");
      }
    },
  },
  data() {
    return {
      wallet_connected: true,
    };
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
