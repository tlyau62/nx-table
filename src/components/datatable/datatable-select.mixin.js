export default {
  props: {
    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },
  },
  created() {
    this.config.select = this.select;
  },
};