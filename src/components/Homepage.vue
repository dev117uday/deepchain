<template>
  <div>
    <Overlay />
    <Jumbotron />
  </div>
</template>

<script>
// importing components
import Overlay from "./Overlay.vue";
import Jumbotron from "./Jumbotron.vue";

export default {
  name: "Homepage",
  components: {
    Overlay,
    Jumbotron,
  },
};
</script>

<style lang="scss" scoped></style>
