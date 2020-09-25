import datatableService from "./datatable.service";
import _ from 'lodash';

const reorder = {
  createReorderCallback: _.curry((table, vueInstance, evtName) => {
    return function (e, diff, edit) {
      table.order([]); // clean current sorting effect
      vueInstance.$emit(evtName, {
        e,
        diff,
        edit,
        reorderedRow: datatableService.calculateReorderedRow(vueInstance.rows, diff),
      });
    };
  })
};

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
        const createCallback = reorder.createReorderCallback(this.table, this);

        table.on("row-reorder.dt", createCallback("row-reorder"));
        table.on("row-reordered.dt", createCallback("row-reordered"));
      }
    }
  }
};