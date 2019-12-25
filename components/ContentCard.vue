<template>
  <div :class="{topBorder,bottomBorder,overBorder,[`content-cols-${cols}`]: cols,[`content-rows-${rows}`]: rows}" class="content-card">
    <div :class="{'background-transparent': transparent}" class="content-card--container">
      <div class="content-card--header">
        <slot name="title" />
      </div>
      <div :class="{'content-card-content--row': row,'content-card-content--wrap': wrap}" class="content-card--content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentCard',
  props: {
    cols: {
      type: [Boolean, Number],
      default: 10
    },
    rows: {
      type: [Boolean, Number],
      default: 10
    },
    transparent: {
      type: Boolean,
      default: false
    },
    topBorder: {
      type: Boolean,
      default: false
    },
    bottomBorder: {
      type: Boolean,
      default: false
    },
    overBorder: {
      type: Boolean,
      default: false
    },
    row: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
  @import "../assets/stylesheets/variables";

  @border-length: 15px;
  @little-gutter: .2vw;
  .content-card {
    margin: @little-gutter @little-gutter;
    flex: 1 1 auto;
    display: flex;

    &--container {
      display: flex;
      flex: 1;
      background: @medium-blue;
    }
    &--content {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
    .content-card-content--row {
      flex-direction: row;
    }

    .background-transparent {
      background: transparent;
    }
    .content-card-content--wrap {
      flex-wrap: wrap;
    }
  }
  .make-content-cols(@i) when (@i < 10){
    .content-cols-@{i} {
      @per: percentage(@i / 10);
      max-height: @per;
      height: @per;
    }
    .make-content-cols(@i + 1);
  }
  .make-content-rows(@i) when (@i < 10){
    .content-rows-@{i} {
      @per: percentage(@i / 10);
      min-width: @per;
      width: @per;
    }
    .make-content-rows(@i + 1);
  }
  .make-content-rows(1);
  .make-content-cols(1);

  .overBorder {
    background: linear-gradient(to left, @lighter-blue, @lighter-blue) left top no-repeat,
    linear-gradient(to bottom, @lighter-blue, @lighter-blue) left top no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) right top no-repeat,
    linear-gradient(to bottom, @lighter-blue, @lighter-blue) right top no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) left bottom no-repeat,
    linear-gradient(to bottom, @lighter-blue, @lighter-blue) left bottom no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) right bottom no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) right bottom no-repeat;
    background-size: 1px @border-length, @border-length 1px, 1px @border-length, @border-length 1px;
  }
  .topBorder {
    background: linear-gradient(to left, @lighter-blue, @lighter-blue) left top no-repeat,
    linear-gradient(to bottom, @lighter-blue, @lighter-blue) left top no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) right top no-repeat,
    linear-gradient(to bottom, @lighter-blue, @lighter-blue) right top no-repeat;
    background-size: 1px @border-length, @border-length 1px, 1px @border-length, @border-length 1px;
  }
  .bottomBorder {
    background: linear-gradient(to left, @lighter-blue, @lighter-blue) left bottom no-repeat,
    linear-gradient(to bottom, @lighter-blue, @lighter-blue) left bottom no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) right bottom no-repeat,
    linear-gradient(to left, @lighter-blue, @lighter-blue) right bottom no-repeat;
    background-size: 1px @border-length, @border-length 1px, 1px @border-length, @border-length 1px;
  }

</style>
