<template>
  <div class="datatable">
    <v-datatable-intern
      class="datatable__table"
      :key="id"
      @refresh="refresh"
      v-bind="$attrs"
      v-on="$listeners"
      :columns="columns"
    />
    <div style="display: none"><slot></slot></div>
  </div>
</template>

<script>
import VDatatableIntern from "./VDatatableIntern";

export default {
  name: "VDatatable",
  components: {
    VDatatableIntern,
  },
  data() {
    return {
      id: 0,
      columns: [],
    };
  },
  created() {
    this.$on("column-created", (evt) => {
      this.columns.push(evt);
    });
  },
  methods: {
    refresh() {
      this.id++;
    },
  },
};
</script>

<style lang="scss" scoped>
.datatable {
  &__table {
    margin: 0;
    width: 100% !important;
  }
}
</style>