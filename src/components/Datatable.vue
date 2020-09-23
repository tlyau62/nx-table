<template>
  <div class="datatable">
    <datatable-intern
      class="datatable__table"
      :key="id"
      @refresh="refresh"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script>
import DatatableIntern from "@/components/DatatableIntern";

export default {
  name: "Datatable",
  components: {
    DatatableIntern,
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