<template>
  <div class="model-container">
    <model-gltf src="@/assets/model.gltf"></model-gltf>
  </div>
</template>

<script>
import { ModelGltf } from "vue-3d-model";

export default {
  components: {
    ModelGltf,
  },
};
</script>
<style lang="scss" scoped>
.model-container {
  height: 500px;
  border:1px solid red;
}
</style>
