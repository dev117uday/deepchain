<template>
  <div>
    <!-- <NavBar /> -->
    <!-- <Web3C /> -->
    <Homepage />
  </div>
</template>

<script>
// import Web3C from "@/components/Web3C.vue";
// import NavBar from "@/components/Navbar.vue";
import Homepage from "@/components/Homepage.vue";

export default {
  name: "Home",
  components: {
    Homepage,
    // Web3C,
    // NavBar,
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 1080px;
}
</style>
