<template>
  <div class="example-table">
    <h4>Example 3</h4>
    <b-button @click="incNumber">Inc number</b-button>
    {{ number }}
    <v-datatable :rows="rows">
      <v-datatable-column title="Name" data="name" />
      <v-datatable-column title="Salary" data="salary" />
      <v-datatable-column title="Age" data="age" width="20px" />
      <v-datatable-column title="Action" defaultContent="">
        <template #default="scope">
          {{ scope.rowData.name }} {{ number }}
        </template>
      </v-datatable-column>
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
      columns: [],
      number: 10,
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
      // {
      //   name: "Tim",
      //   salary: 200000,
      //   age: 20,
      // },
    ];
  },
  methods: {
    incNumber() {
      this.number++;
    },
  },
};
</script>

<style lang="scss">
</style>
