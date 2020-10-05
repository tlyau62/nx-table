export default {
  props: {
    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },
  },
  mounted() {
    debugger;
    this.config.select = this.select;
  },
};