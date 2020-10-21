<template>
  <div class="example-table">
    <h4>Example 5</h4>
    <div>
      <h5>Selected items</h5>
      <p>{{ selected }}</p>
    </div>
    <div>
      <label>
        <input type="text" v-model="selectedRows" />
        <button @click="setSelect">Set select</button>
      </label>
    </div>
    <v-datatable
      :rows="rows"
      :select="{ style: 'os' }"
      :selected.sync="selected"
      @select="select"
      @deselect="deselect"
    >
      <v-datatable-column title="Name" data="name" />
      <v-datatable-column title="Salary" data="salary" />
      <v-datatable-column title="Age" data="age" width="20px" />
      <v-datatable-column title="Job" data="job" />
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
      selected: [],
      selectedRows: "",
    };
  },
  created() {
    this.rows = [
      {
        name: "John",
        salary: 1000,
        age: 10,
        job: null,
      },
      {
        name: "Peter",
        salary: 2000,
        age: 20,
        job: "cook",
      },
    ];
  },
  methods: {
    select({ e, dt, type, indexes, selected }) {
      console.log("select");
      this.selectedRows = selected;
    },
    deselect({ e, dt, type, indexes, selected, deselected }) {
      console.log("deselect");
      this.selectedRows = selected;
      console.log(deselected);
    },
    setSelect() {
      const selectedRows = JSON.parse(this.selectedRows);

      this.selected = selectedRows.map((row) => this.rows[row]);
    },
  },
};
</script>
