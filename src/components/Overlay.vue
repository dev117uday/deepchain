<template>
  <div class="overlay" ref="overlay">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="content-container">
            <div>
              <p ref="card1">
                Most of the news, videos and images we receive are manipulated
                deliberately.
              </p>
            </div>

            <div>
              <p ref="card2">
                The advancement in deep learning gave rise to deepfakes that
                creates convincing but entirely fake videos and photos from
                scratch.
              </p>
            </div>

            <div>
              <p ref="card3">
                And in order to combat this, we came up with an idea called
                <b>DeepChain</b>.
              </p>
            </div>

            <div>
              <div @click="hide()" class="f-btn" ref="card4">Go to the app</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  name: "Overlay",
  methods: {
    hide() {
      var tl = gsap.timeline({
        defaults: {
          duration: 0.5,
          opacity: 0,
          delay: "-0.2",
          transform: "translateY(-100%) skewY(-1deg)",
        },
      });
      tl.to(this.$refs.card1, { delay: 0 })
        .to(this.$refs.card2, { duration: 0.45 })
        .to(this.$refs.card3, {})
        .to(this.$refs.card4, {})
        .to(this.$refs.overlay, { opacity: 1 })
        .to(this.$refs.overlay, { display: "none", delay: 0 });
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #14121f;
  z-index: 11;
  color: #fefff5;

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 100vh;

    div {
      overflow: hidden;
    }
  }

  p {
    font-size: 17px;
    margin-bottom: 34px;
    color: #fefff5;
  }

  .f-btn {
    display: inline-flex;
    color: #89888a;
    cursor: pointer;

    &:hover {
      color: #fefff5;
    }
  }
}
</style>
