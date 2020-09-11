<template>
  <div class="datatable">
    <internal-table
      class="datatable__table"
      :key="id"
      @refresh="refresh"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import InternalTable from "@/components/InternalTable";
import $ from "jquery";

export default {
  name: "Datatable",
  components: {
    InternalTable,
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