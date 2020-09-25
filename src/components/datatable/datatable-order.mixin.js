/**
 * This mixin should be registered before datatable-reorder.
 * if a table registers both order and reorder event,
 * order event handler should call first, then re-order event handler
 */
export default {
  watch: {
    table(table) {
      table.on("order.dt", (e, settings, ordArr) => {
        this.$emit("order", { e, settings, ordArr });
      });
    }
  }
};