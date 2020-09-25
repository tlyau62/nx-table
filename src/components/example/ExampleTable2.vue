<template>
  <div id="example-table-2">
    <h4>Example 2</h4>

    <div>
      <h4>Actions</h4>

      <div>
        <h5>Test case A</h5>
        <button @click="setColumnsA()">User columnset A</button>
        <button @click="setRowsA()">Set rows A</button>
      </div>

      <div>
        <h5>Test case B</h5>
        <button @click="setColumnsB()">User columnset B</button>
        <button @click="setRowsB()">Set rows B</button>
      </div>

      <div>
        <h5>Test case C</h5>
        <button @click="setColumnsC()">User columnset C</button>
        <button @click="setRowsC()">Set rows C</button>
      </div>

      <div>
        <h5>Misc</h5>
        <button @click="setEmptyRows()">Set empty rows</button>
      </div>
    </div>

    <div>
      <h4>Table</h4>
      <v-datatable
        :rows="rows"
        :columns="columns"
        :server-side="true"
        :processing="true"
        :select="{ style: 'os', blurable: true }"
        :row-reorder="true"
        @row-reordered="reorderRow"
        @order="order"
      />
    </div>
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import _ from "lodash";

const RenderComponent = {
  props: ["cellData", "rowData", "rowIndex", "colIndex"],
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return this._v(this.rowData.age); // https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
  },
};

const TestComponent = {
  props: ["cellData", "rowData", "rowIndex", "colIndex"],
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return <button onClick={() => this.inc()}>test</button>; // https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
  },
  methods: {
    inc() {
      this.rowData.age++;
    },
  },
};

export default {
  name: "App",
  components: {
    VDatatable,
  },
  data() {
    return {
      rows: [],
      columns: [],
    };
  },
  methods: {
    setEmptyRows() {
      this.rows = [];
    },
    setRowsA() {
      this.rows = [
        {
          name: "John",
          salary: 1000,
        },
        {
          name: "Peter",
          salary: 2000,
        },
      ];
    },
    setRowsB() {
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
    setRowsC() {
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
    setColumnsA() {
      this.columns = [
        { title: "Name", data: "name" },
        { title: "Salary", data: "salary" },
      ];
    },
    setColumnsB() {
      this.columns = [
        { title: "Name", data: "name" },
        { title: "Salary", data: "salary" },
        { title: "Age", data: "age" },
      ];
    },
    setColumnsC() {
      this.columns = [
        { title: "Name", data: "name" },
        { title: "Salary", data: "salary" },
        { title: "Age", data: "age", width: "20px" },
        {
          title: "TestAge",
          data: "age",
          component: RenderComponent,
        },
        {
          title: "Icon",
          component: TestComponent,
          data: "age",
        },
      ];
    },
    order(evt) {
      if (evt.ordArr.length === 0) {
        return;
      }

      const order = evt.ordArr[0];
      const col = this.columns[order.col];
      const rows = this.rows
        .slice()
        .sort((a, b) => (_.get(a, col.data) > _.get(b, col.data) ? 1 : -1));

      this.rows = order.dir === "asc" ? rows : rows.reverse();
    },
    reorderRow(evt) {
      this.rows = evt.reorderedRow;
    },
  },
};
</script>

<style lang="scss">
</style>
