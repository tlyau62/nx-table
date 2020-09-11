<template>
  <div class="internal-table">
    <table class="internal-table__table" v-bind="$attrs"></table>
  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";

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
  props: ["rows", "columns"],
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
      .DataTable({
        data: this.rows || [],
        columns: this.columns || [],
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
    rows(val) {
      this.table.clear().rows.add(val).draw();
    },
    columns(val) {
      this.$emit("refresh");
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

<style lang="scss">
// // core
// @import "~datatables.net-bs4/css/dataTables.bootstrap4.min.css";

// // select
// @import "~datatables.net-select-bs4/css/select.bootstrap4.min.css";

// // responsive
// @import "~datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css";

// // reorder
// @import "~datatables.net-rowreorder-bs4/css/rowReorder.bootstrap4.min.css";

// dt theme
// core
@import "~datatables.net-dt/css/jquery.dataTables.min.css";

// select
@import "~datatables.net-select-dt/css/select.dataTables.min.css";

// responsive
@import "~datatables.net-responsive-dt/css/responsive.dataTables.min.css";

// reorder
@import "~datatables.net-rowreorder-dt/css/rowReorder.dataTables.min.css";
</style>