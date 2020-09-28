<template>
  <div class="example-table">
    <h4>Example 1</h4>
    <v-datatable
      :rows="rows"
      :columns="columns"
      :stripe-classes="['odd', 'even']"
    />
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import _ from "lodash";

export default {
  name: "ExampleTable",
  components: {
    VDatatable,
  },
  data() {
    return {
      rows: [],
      columns: [],
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
    this.columns = [
      { title: "Name", data: "name" },
      { title: "Salary", data: "salary" },
      { title: "Age", data: "age", width: "20px" },
    ];
  },
};
</script>

<style lang="scss">
</style>
