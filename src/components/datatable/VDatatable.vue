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
    <slot></slot>
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
    debugger;
    this.$on("column-created", (evt) => {
      debugger;
      this.columns.push(evt);
    });
  },
  mounted() {
    debugger;
    const a = this;
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