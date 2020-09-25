<template>
  <div class="example-table">
    <h4>Example 3</h4>
    <v-datatable :rows="rows" :columns="columns" />
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import _ from "lodash";

const ContextMenuComponent = {
  props: ["cellData", "rowData", "rowIndex", "colIndex"],
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <b-dropdown text="Dropdown Button">
        <b-dropdown-item>First Action</b-dropdown-item>
        <b-dropdown-item>Second Action</b-dropdown-item>
        <b-dropdown-item>Third Action</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item active>Active action</b-dropdown-item>
        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
      </b-dropdown>
    );
  },
};

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
      { title: "Action", component: ContextMenuComponent, defaultContent: "" },
    ];
  },
};
</script>

<style lang="scss">
</style>
