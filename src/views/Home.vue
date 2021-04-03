<template>
  <div>
    <NavBar />
    <Web3C />
  </div>
</template>

<script>
import Web3C from "@/components/Web3C.vue";
import NavBar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Web3C,
    NavBar,
  },
};
</script>
