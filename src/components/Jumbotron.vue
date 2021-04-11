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
          <img src="@/assets/chain-logo.png" class="logo" />
        </div>
      </div>
      <div class="parallax-image-container">
        <img src="@/assets/bgImg.png" class="parallax-img" />
      </div>
    </div>

    <!-- info section -->
    <div class="info">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <p class="tagline">Put IPFS content on Ethereum blockchain</p>
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
export default {
  name: "Jumbotron",
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
    height: 100%;
    width: 100%;
    opacity: 0.07;
    // z-index: -1;

    img {
      width: 100%;
      height: 100%;
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
      background-color: #d64501;
    }
  }

  &-hollow {
    background-color: transparent;
    color: $light;
    border-color: $light;

    &:hover {
      background-color: #d64501;
      color: $light;
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
}
.logo {
  position: absolute;
  right: -10px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 320px;
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
