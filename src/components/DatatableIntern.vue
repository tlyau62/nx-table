<template>
  <div class="internal-table">
    <table class="internal-table__table display" v-bind="$attrs"></table>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
import _ from "lodash";

// https://datatables.net/download/npm
// core
import "datatables.net/js/jquery.dataTables.min.js";
// import "datatables.net-bs4/js/dataTables.bootstrap4.min.js";
import "datatables.net-dt/js/dataTables.dataTables.min.js";

// select
import "datatables.net-select/js/dataTables.select.min.js";
// import "datatables.net-select-bs4/js/select.bootstrap4.min.js";
import "datatables.net-select-dt/js/select.dataTables.min.js";

// responsive
import "datatables.net-responsive/js/dataTables.responsive.min.js";
// import "datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js";
import "datatables.net-responsive-dt/js/responsive.dataTables.min.js";

// rowreorder
import "datatables.net-rowreorder/js/dataTables.rowReorder.min.js";
// import "datatables.net-rowreorder-bs4/js/rowReorder.bootstrap4.min.js";
import "datatables.net-rowreorder-dt/js/rowReorder.dataTables.min.js";

const datatable = {
  /**
   * state
   */
  componentStore: [],

  /**
   * Pure
   */
  mergeFunction(obj, option, propertyFunc) {
    const cloneObj = _.cloneDeep(obj);
    let cb = propertyFunc;

    if (cloneObj[option]) {
      cb = (...args) => {
        cloneObj[option](...args);
        cb(...args);
      };
    }

    cloneObj[option] = cb;

    return cloneObj;
  },

  addCreatedCell(columns, createdCellCallback) {
    return _.cloneDeep(columns).map((col) =>
      this.mergeFunction(col, "createdCell", createdCellCallback(col))
    );
  },

  addPreDraw(settings, preDrawCallback) {
    return this.mergeFunction(settings, "preDrawCallback", preDrawCallback);
  },

  /**
   * Impure
   */
  cleanComponentStore() {
    for (const component of this.componentStore) {
      component.$destroy();
    }
    this.componentStore = [];
  },

  createComponent(componentStore, componentFactory) {
    if (!componentFactory) {
      return () => {};
    }

    return function (cell, cellData, rowData, rowIndex, colIndex) {
      const Component = Vue.extend(componentFactory);

      const instance = new Component({
        propsData: {
          cellData,
          rowData,
          rowIndex,
          colIndex,
          datatable: this.DataTable(),
        },
      });

      componentStore.push(instance);

      $(cell).empty();

      cell.appendChild(instance.$mount().$el);
    };
  },

  processColumns(columns) {
    return (
      datatable.addCreatedCell(columns, (col) =>
        datatable.createComponent(this.componentStore, col.component)
      ) || []
    );
  },
};

export default {
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },

    // https://datatables.net/reference/option/serverSide
    serverSide: {
      type: Boolean,
      default: false,
    },

    // https://datatables.net/reference/option/processing
    processing: {
      type: Boolean,
      default: false,
    },

    // https://datatables.net/reference/option/paging
    paging: {
      type: Boolean,
      default: false,
    },

    // https://datatables.net/reference/option/searching
    searching: {
      type: Boolean,
      default: false,
    },

    // https://datatables.net/reference/option/info
    info: {
      type: Boolean,
      default: false,
    },

    // https://datatables.net/reference/option/autoWidth
    autoWidth: {
      type: Boolean,
      default: false, // should always false
    },

    // https://datatables.net/reference/option/#select
    select: {
      type: [Boolean, Object],
      default: false,
    },

    // https://datatables.net/reference/option/rowReorder
    rowReorder: {
      type: [Boolean, Object],
      default: false,
    },
  },
  data() {
    return {
      table: null,
    };
  },
  mounted() {
    if (this.table) {
      throw new Error("Table already exists");
    }

    if (this.columns.length === 0) {
      return;
    }

    this.table = $(this.$el)
      .find(".internal-table__table")
      .DataTable(
        datatable.addPreDraw(
          {
            ajax: (data, callback) => {
              if (this.rowWatcher) {
                this.populateTable(this.rows, callback);
              } else {
                this.rowWatcher = this.$watch("rows", (val) =>
                  this.populateTable(val, callback)
                );
              }
            },
            columns: datatable.processColumns(this.columns),
            serverSide: this.serverSide,
            processing: this.processing,
            paging: this.paging,
            searching: this.searching,
            info: this.info,
            autoWidth: this.autoWidth,
            select: this.select,
            rowReorder: this.rowReorder,
          },
          () => {
            datatable.cleanComponentStore();
          }
        )
      );

    this.table.on("order.dt", (e, settings, ordArr) => {
      this.$emit("order", { e, settings, ordArr });
    });

    this.table.on("row-reorder.dt", (e, diff, edit) => {
      const reorderedRow = new Array(this.rows.length);

      for (const d of diff) {
        reorderedRow[d.newPosition] = this.rows[d.oldPosition];
      }

      for (const [i, value] of reorderedRow.entries()) {
        if (value === undefined) {
          reorderedRow[i] = this.rows[i];
        }
      }

      this.$emit("row-reorder", { e, diff, edit, reorderedRow });
    });
  },
  beforeDestroy() {
    if (this.table) {
      this.table.destroy();
      this.table = null;
      $(this.$el).empty();
    }
  },
  watch: {
    columns() {
      this.$emit("refresh");
    },
  },
  methods: {
    populateTable(rows, callback) {
      this.table.clear();
      callback({
        data: rows || [],
        recordsTotal: rows ? rows.length : 0,
        recordsFiltered: rows ? rows.length : 0,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.internal-table {
  width: 100%;

  &__table {
    width: 100%;
  }
}
</style>
