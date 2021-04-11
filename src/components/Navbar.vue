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
  background-color: red;
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

  &:hover {
    background-color: white;
    color: $dark;
  }
}
</style>
