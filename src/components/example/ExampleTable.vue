<template>
  <div class="example-table">
    <h4>Example 1</h4>
    <v-datatable :rows="rows" :stripe-classes="['odd', 'even']">
      <v-datatable-column title="Name" data="name" />
      <v-datatable-column title="Salary" data="salary" />
      <v-datatable-column title="Age" data="age" width="20px" />
    </v-datatable>
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import VDatatableColumn from "@/components/datatable/VDatatableColumn";
import _ from "lodash";
export default {
  name: "ExampleTable",
  components: {
    VDatatable,
    VDatatableColumn,
  },
  data() {
    return {
      rows: [],
    };
  },
  created() {
    this.rows = [
      {
        name: "John",
        salary: 1000,
        age: 10,
      },
      {
        name: "Peter",
        salary: 2000,
        age: 20,
      },
    ];
  },
};
</script>

<style lang="scss">
</style>