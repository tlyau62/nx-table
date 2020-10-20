/**
 * This mixin should be registered before datatable-reorder.
 * if a table registers both order and reorder event,
 * order event handler should call first, then re-order event handler
 */
export default {
  props: {
    // https://datatables.net/reference/option/order
    order: {
      type: [Array],
      default: () => [],
    }
  },
  beforeMount() {
    this.config.order = this.order;
  },
  watch: {
    table(table) {
      table.on("order.dt", (e, settings, ordArr) => {
        const ordCols = ordArr.map(el => table.column(el.col));
        const ordStr = ordArr.map(el => `${table.column(el.col).dataSrc()} ${el.dir}`).join(',');

        this.$emit("order", { e, settings, ordArr, ordCols, ordStr });
      });
    },
    order(val) {
      if (this.table) {
        // this.table.order(val).draw(); // Bad: it will trigger the order listener 
        this.$emit('refresh');
      }
    },
  }
};