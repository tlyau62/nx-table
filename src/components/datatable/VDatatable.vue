<template>
  <div class="datatable">
    <v-datatable-intern
      class="datatable__table"
      :key="id"
      @refresh="refresh"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot></slot
    ></v-datatable-intern>
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
    };
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