import datatableService from "./datatable.service";

export default {
  props: {
    // https://datatables.net/reference/option/rowReorder
    rowReorder: {
      type: [Boolean, Object],
      default: false,
    },
  },
  created() {
    this.config.rowReorder = this.rowReorder;
  },
  watch: {
    table(table) {
      if (this.rowReorder) {
        table.on("row-reorder.dt", (e, diff, edit) => {
          this.$emit("row-reorder", {
            e,
            diff,
            edit,
            reorderedRow: datatableService.calculateReorderedRow(this.rows, diff),
          });
        });
      }
    }
  }
};