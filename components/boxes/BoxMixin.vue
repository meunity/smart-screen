
<script>
export default {
  name: 'BoxMixin',
  props: {
    liveStreamArray: {
      type: Array,
      default: () => ([])
    },
    rows: {
      type: [Boolean, Number],
      default: 4
    }
  },
  computed: {
    streamArray () {
      if (this.liveStreamArray.length < this.rows) {
        const arr = [...this.liveStreamArray]
        for (let i = 0; i < this.rows - this.liveStreamArray.length; i++) {
          arr.push('')
        }
        return arr
      }
      return this.liveStreamArray
    }
  },
  methods: {
    showBox (urlArray = []) {

    }
  }
}
</script>
