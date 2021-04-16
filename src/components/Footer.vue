<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-8">
          <div class="content-container">
            <h6>
              <a href="https://github.com/dev117uday/deepchain" target="_blank"
                >DeepChain</a
              >
            </h6>
            <p>
              Built by
              <a href="https://github.com/dev117uday" target="_blank">Uday</a>
              and
              <a href="https://github.com/salil-naik" target="_blank">Salil</a>
              for Devfolio's Ethereum India Fellowship 2.0
            </p>
          </div>
        </div>

        <div class="col-4">
          <img src="@/assets/eif-logo.svg" class="eif-logo" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
$dark: #231f20;
$theme: #ff5000;
.footer {
  background-color: $dark;
  color: white;
  padding: 80px 0;

  h6 {
    font-size: 28px;
    font-weight: 600;
    color: white;
    margin-bottom: 16px;

    a {
      color: inherit;
    }
  }

  p {
    margin: 0;
    color: #d4d4d4;

    a {
      color: $theme;
      font-weight: 500;
      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.eif-logo {
  height: 100px;
  float: right;
}
</style>
