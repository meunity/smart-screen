<template>
  <div class="tab-base">
    <div class="tab-base--container">
      <div
        :class="{'four-box': boxType === 0, 'nine-box': boxType === 1, 'four-box2': boxType === 2}"
        v-for="i in boxCount"
        :key="i"
        class="tab-base--square--container"
      >
        <div class="tab-base--square" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBase',
  props: {
    boxType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    boxCount () {
      switch (this.boxType) {
        case 1: return 9
        default: return 4
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../assets/stylesheets/variables";
.tab-base {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &--container {
    width: 4vw;
    height: 4vw;
    display: flex;
    flex-wrap: wrap;
    &:hover {
      cursor: pointer;
      background: rgba(255,255,255,0.8);
      border-radius: 5%;
        box-shadow: 0px 0px 15px white;

    }

  }
  &--square--container {
    width: 50%;
    height: 50%;
    display: flex;

  }
  .four-box {
    width: 50%;
    height: 50%;
  }
  .nine-box {
    width: 33%;
    height: 33%;
  }
  .four-box2 {
    width: 33%;
    height: 33%;
    &:first-child {
      width: 100%;
      height: 66%;
      .tab-base--square {
        margin: 2%;
      }
    }

  }
  &--square {
    flex: 1;
    background: @sky-blue;
    margin: 5%;
    border-radius: 4%;

  }
}
</style>
