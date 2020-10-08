import _ from 'lodash';

export default {
  props: {
    // https://datatables.net/reference/option/rowReorder
    rowReorder: {
      type: [Boolean, Object],
      default: false,
    },
  },
  beforeMount() {
    this.config.rowReorder = this.rowReorder;
  },
  watch: {
    table(table) {
      if (this.rowReorder) {
        const createCallback = helper.createReorderCallback(this.table, this);

        table.on("row-reorder.dt", createCallback("row-reorder"));
        table.on("row-reordered.dt", createCallback("row-reordered"));
      }
    }
  }
};

const helper = {
  createReorderCallback: _.curry((table, vueInstance, evtName) => {
    return function (e, diff, edit) {
      table.order([]); // clean current sorting effect
      vueInstance.$emit(evtName, {
        e,
        diff,
        edit,
        reorderedRow: helper.calculateReorderedRow(vueInstance.rows, diff),
      });
    };
  }),
  calculateReorderedRow(rows, diff) {
    const reorderedRow = rows.slice();

    for (const d of diff) {
      reorderedRow[d.newPosition] = rows[d.oldPosition];
    }

    return reorderedRow;
  },
};