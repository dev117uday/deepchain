<template>
  <div>
    <Overlay />
    <Navbar />
    <Jumbotron />
    <Web3C />
    <Footer />
  </div>
</template>

<script>
// importing components
import Overlay from "./Overlay.vue";
import Jumbotron from "./Jumbotron.vue";
import Navbar from "./Navbar.vue";
import Web3C from "./Web3C.vue";
import Footer from "./Footer.vue";

export default {
  name: "Homepage",
  components: {
    Overlay,
    Jumbotron,
    Navbar,
    Web3C,
    Footer
  },
};
</script>

<style lang="scss" scoped></style>
