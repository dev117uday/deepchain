<template>
  <div>
    <!-- hero section -->
    <div class="dark-section">
      <div class="container">
        <div class="hero" style="position: relative">
          <h2 class="title">Project DeepChain</h2>
          <div class="btn-container">
            <div class="btn btn-filled">Perfrom transaction</div>
            <div class="btn btn-hollow">Know more</div>
          </div>
          <img src="@/assets/chain-new.png" class="logo" />
        </div>
      </div>
      <div class="parallax-image-container" ref="parallaxImgContainer">
        <img src="@/assets/bgImg3.png" class="parallax-img" ref="parallaxImg" />
      </div>
    </div>

    <!-- info section -->
    <div class="info" ref="info">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <p class="tagline">
              <span><span ref="tag1">Fighting </span></span>
              <span><span ref="tag2">deepfakes </span></span>
              <span><span ref="tag3">and </span></span>
              <span><span ref="tag4">misinformation </span></span>
              <span><span ref="tag5">using </span></span>
              <span><span ref="tag6">blockchain</span></span>
            </p>
            
            <ModelEthereum />
          </div>

          <div class="col-6">
            <p>
              Fighting DeepFakes and Mis-Information on the Internet is hard,
              Project DeepChain purpose this idea to timestamp content on
              blockchain, providing an unalterable proof of information.
              <br /><br />
              This unalterable information can then be shared with on social
              media. Deepchain also helps you sign documents, contracts etc.
            </p>

            <section class="steps">
              <h2>Steps to perform transaction</h2>
              <ul>
                <li>Setup Pinata or Provide IPFS CID</li>
                <li>Connect this app with MetaMask</li>
                <li>
                  Set Address to send (this is done in-order to perform a
                  transaction)
                </li>
                <li>Approve transaction on MetaMask</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ModelEthereum from "@/components/EthereumModel.vue";
gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Jumbotron" /* I don't even know what jumbotron means */,
  components: {
    ModelEthereum
  },

  mounted() {
    var tl = gsap.timeline({
      defaults: {
        duration: 0.3,
        delay: "-0.2",
        transform: "translateY(0) skewY(0deg)",
        scrollTrigger: this.$refs.info,
        toggleActions: "play complete reverse reset",
        start: "center center",
      },
    });

    tl.to(this.$refs.tag1, { delay: 0 })
      .to(this.$refs.tag2, { duration: 0.45 })
      .to(this.$refs.tag3, {})
      .to(this.$refs.tag4, {})
      .to(this.$refs.tag5, {})
      .to(this.$refs.tag6, {});

    // for hero image parallax
    gsap
      .timeline({
        scrollTrigger: {
          trigger: this.$refs.parallaxImgContainer,
          // start: "top top",
          // start: "bottom bottom",
          // end: "top top",
          toggleActions: "play none none reverse",
          scrub: true,
        },
      })
      .fromTo(
        this.$refs.parallaxImg,
        { yPercent: 10, ease: "none" },
        { yPercent: -30, ease: "none" }
      );
  },
};
</script>

<style lang="scss" scoped>
// $theme: #ff4d00;
// // $dark: #363636;
// $dark: #14121f;

$dark: #231f20;
// $dark: #14121f;
$light: #fefefe;
$light2: #efefef;
$theme: #ff5000;

.dark-section {
  background-color: $dark;

  .parallax-image-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 106%;
    width: 100%;
    opacity: 0.6;
    overflow: hidden;
    // z-index: -1;

    img {
      width: 100%;
      height: 140%;
      object-fit: cover;
    }
  }
}
.hero {
  height: 660px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-top: -80px;
  padding-top: 40px;
  z-index: 1;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  display: inline-flex;
  border: 1.5px solid $theme;

  &-container {
    display: flex;
    margin-top: 22px;
  }

  &:not(:last-child) {
    margin-right: 20px;
  }

  &-filled {
    background-color: $theme;
    color: $light;

    &:hover {
      border: 1.5px solid white;
      color: $theme;
      background-color: white;
    }
  }

  &-hollow {
    background-color: transparent;
    color: $light;
    border-color: $light;

    &:hover {
      background: white;
      color: $theme;
      border-color: white;
    }
  }
}

.title {
  font-size: 80px;
  font-weight: 700;
  color: $light;
  text-transform: uppercase;
  max-width: 550px;
}
.tagline {
  color: $dark;
  font-size: 40px;
  font-weight: 500;
  max-width: 750px;

  & > span {
    overflow: hidden;
    display: inline-flex;
    margin-right: 12px;

    span {
      transform: translateY(-100%) skewY(-7deg);
    }
  }
}
.logo {
  position: absolute;
  right: -10px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 360px;
}

.info {
  padding: 130px 0;
  font-size: 17px;
}

.steps {
  margin: 40px 0 0;
  color: $dark;

  h2 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
  }

  ul {
    padding: 0;
    margin: 0;
    li {
      list-style-type: none;
      font-size: 17px;
      margin-bottom: 16px;
    }
  }
}
</style>
