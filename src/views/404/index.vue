<template>
  <div id="error">
    <div class="box-err">
      <div class="img">
        <img src="../../assets/img/error-dog.png" alt="">
      </div>
      <div class="errContent">
        <p>404 NOT FOUNT</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#error {
padding-top: 100px;
}
.box-err {
  width: 700px;
  margin: 0 auto;
  height: 50%;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  position: relative;
  .img {
    height: 100%;
    position: relative;
  }
  img {
    position: absolute;
    bottom: 0;
    height: 70%;
    transform: rotateY(180deg);
    margin-right: 50px;
  }
  .errContent {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    p {
      font-weight: 700;
      font-size: 26px;
    }
  }
}
</style>
