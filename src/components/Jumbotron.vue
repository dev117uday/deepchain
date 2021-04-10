<template>
  <div class="jumbotron">
    <div class="container">
      <div class="hero" style="position: relative">
        <h2 class="title">Project DeepChain</h2>
        <p class="tagline">TimeStamp IPFS content on Ethereum blockchain</p>

        <img src="@/assets/chain-logo.png" class="logo" />
      </div>

      <div class="info">
        Fighting DeepFakes and Mis-Information on the Internet is hard, Project
        DeepChain purpose this idea to timestamp content on blockchain,
        providing an unalterable proof of information This unalterable
        information can then be shared with on social media. Deepchain also
        helps you sign documents, contracts etc.
      </div>

      <section class="steps">
        <h2>Steps to perform transaction</h2>
        <ul>
          <li>Setup Pinata or Provide IPFS CID</li>
          <li>Connect this app with MetaMask</li>
          <li>
            Set Address to send (this is done in-order to perform a transaction)
          </li>
          <li>Approve transaction on MetaMask</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jumbotron",
};
</script>

<style lang="scss" scoped>
$theme: #ff4d00;
$dark: #363636;

// rewriting and editing bootstrap classes
.jumbotron {
  background-color: transparent;
  padding-top: 0px;
}

// style
.hero {
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.title {
  font-size: 80px;
  font-weight: 700;
  color: $theme;
  text-transform: uppercase;
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
  padding: 50px 0;
  // border-top: 2px solid $dark;
  // border-bottom: 2px solid $dark;
  font-size: 19px;
  color: $dark;
}

.steps {
  margin: 70px 0;
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
    }
  }
}
</style>
