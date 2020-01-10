<template>
  <content-card :cols="2" transparent row wrap>
    <template v-slot:title>
      <div class="page-container">
        <div :class="{'cannotHover': currentPage === 0,'canHover': currentPage > 0}" @click="pageMinus" class="page-content">
          <div class="swiper-button-prev" />
        </div>
        <div class="pagination">
          <div v-for="i in pages" :key="i" class="pagination--content">
            <span :class="{'highlight': i === currentPage + 1}">{{ i }}</span>
          </div>
        </div>
        <div :class="{'cannotHover': currentPage >= pages - 1,'canHover': currentPage > 0 && currentPage < pages}" @click="pagePlus" class="page-content">
          <div class="swiper-button-next" />
        </div>
      </div>
    </template>
    <template v-slot:content>
      <tab-base @click.native="choseLayout(0)" />
      <tab-base @click.native="choseLayout(1)" :box-type="1" />
      <tab-base @click.native="choseLayout(2)" :box-type="2" />
    </template>
  </content-card>
</template>

<script>
import ContentCard from '../ContentCard'
import TabBase from '../TabButton/TabBase'
export default {
  name: 'MiddleControl',
  components: { TabBase, ContentCard },
  props: {
    pages: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    currentPage: 0
  }),
  watch: {
    pages: {
      handler (val, old) {
        if (val === undefined) { return }
        this.currentPage = 0
      },
      immediate: true
    }
  },
  methods: {
    choseLayout (index) {
      this.$emit('onChosenLayout', index)
    },
    pagePlus () {
      this.currentPage = this.currentPage + 1 >= this.pages ? this.pages - 1 : this.currentPage + 1
      this.$emit('OnPageChange', this.currentPage)
    },
    pageMinus () {
      this.currentPage = this.currentPage - 1 > 0 ? this.currentPage - 1 : 0
      this.$emit('OnPageChange', this.currentPage)
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
}
.pagination {
  position: relative;
  min-width: 100px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  &--content {
    > span {
      color: gray;
    }

    > .highlight {
      color: white;
    }
  }
}
  .page-content {
    margin: 2px 20px;
    height: 22px;
    width: 32px;

    position: relative;
    &:hover {
      cursor: pointer;
    }
    > div {
      height: inherit;
      width: inherit;
      top: 0;
      left: 0;
      margin: 0;
      transform: translate(0);

    }
  }
</style>
