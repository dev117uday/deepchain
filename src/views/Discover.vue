<template>
  <div class="about">
    <NavBar />
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
export default {
  name: "Home",
  components: {
    NavBar,
  },
};
</script>
