<template>
  <div class="internal-table">
    <table class="internal-table__table display" v-bind="$attrs"></table>
  </div>
</template>

<script>
import $ from "jquery";
import _ from "lodash";
import datatableService from "./datatable.service";
import datatableReorderMixin from "./datatable-reorder.mixin";
import datatableOrderMixin from "./datatable-order.mixin";
import datatableSelectMixin from "./datatable-select.mixin";

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

export default {
  name: "VDatatableIntern",
  mixins: [datatableOrderMixin, datatableReorderMixin, datatableSelectMixin],
  props: {
    rows: {
      type: Array,
      default: () => [],
    },

    columns: {
      type: Array,
      default: () => [],
    },

    /**
     * https://datatables.net/reference/option/serverSide
     * set to true to enable server-side sorting
     */
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

    /**
     * https://datatables.net/reference/option/autoWidth
     * should always be false else width will not be responsive
     */
    autoWidth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      table: null,
    };
  },
  beforeCreate() {
    this.config = {};
  },
  created() {
    _.merge(this.config, {
      ajax: (data, callback) => {
        if (this.rowWatcher) {
          this.populateTable(this.rows, callback);
        } else {
          this.rowWatcher = this.$watch(
            "rows",
            (val) => this.populateTable(val, callback),
            { immediate: true }
          );
        }
      },
      columns: datatableService.processColumns(this.columns),
      serverSide: this.serverSide,
      processing: this.processing,
      paging: this.paging,
      searching: this.searching,
      info: this.info,
      autoWidth: this.autoWidth,
    });
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
        datatableService.addPreDraw(this.config, () =>
          datatableService.cleanComponentStore()
        )
      );
  },
  beforeDestroy() {
    if (this.table) {
      datatableService.cleanComponentStore();
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
      if (this.table) {
        this.table.clear();
      }

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