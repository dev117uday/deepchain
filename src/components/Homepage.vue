<template>
  <div>
    <Overlay />
    <Navbar />
    <Jumbotron />
    <Web3C />
  </div>
</template>

<script>
// importing components
import Overlay from "./Overlay.vue";
import Jumbotron from "./Jumbotron.vue";
import Navbar from "./Navbar.vue";
import Web3C from "./Web3C.vue";

export default {
  name: "Homepage",
  components: {
    Overlay,
    Jumbotron,
    Navbar,
    Web3C,
  },
};
</script>

<style lang="scss" scoped></style>
