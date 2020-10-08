<template>
  <div class="example-table">
    <h4>Example 4</h4>
    <v-datatable :rows="rows">
      <v-datatable-column title="Name" data="name"></v-datatable-column>
      <v-datatable-column title="Salary" data="salary"></v-datatable-column>
      <v-datatable-column
        title="Age"
        data="age"
        width="20px"
        :orderable="false"
        cellclass="text-center"
      >
        <button @click="log">Log</button>
      </v-datatable-column>
    </v-datatable>
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import VDatatableColumn from "@/components/datatable/VDatatableColumn";
import _ from "lodash";
import Vue from "vue";

const ContextMenuComponent = {
  props: ["cellData", "rowData", "rowIndex", "colIndex", "number"],
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <b-dropdown text="Dropdown Button">
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-item>Number {this.number}</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
      </b-dropdown>
    );
  },
};

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
      numberHolder: {
        number: 10,
      },
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
    ];
    this.columns = [
      { title: "Name", data: "name" },
      { title: "Salary", data: "salary" },
      { title: "Age", data: "age", width: "20px" },
      {
        title: "Action",
        component: [ContextMenuComponent, () => ({ number: this.number })],
        defaultContent: "",
      },
    ];
  },
  methods: {
    log() {
      console.log("test");
    },
  },
};
</script>

<style lang="scss">
</style>
