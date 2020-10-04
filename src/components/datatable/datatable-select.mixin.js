export default {
  props: {
    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },
  },
  beforeMount() {
    this.config.select = this.select;
  },
};