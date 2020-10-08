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
        :server-side="true"
        :processing="true"
        :select="{ style: 'os', blurable: true }"
        :row-reorder="true"
        @row-reordered="reorderRow"
        @order="order"
      >
        <v-datatable-column
          v-for="(col, idx) of columns"
          :key="col.id"
          :title="col.title"
          :data="col.data"
          :width="col.width"
          :defaultContent="col.defaultContent"
        >
          <template #default="scope" v-if="col.vue">
            <component
              :is="col.vue"
              :name="scope.rowData.name"
              :age="scope.rowData.age"
              :row-data="scope.rowData"
            />
          </template>
        </v-datatable-column>
      </v-datatable>
    </div>
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import VDatatableColumn from "@/components/datatable/VDatatableColumn";
import _ from "lodash";
import datatableOrderMixin from "../datatable/datatable-order.mixin";
const RenderComponent = {
  props: ["age", "name"],
  // eslint-disable-next-line no-unused-vars
  render(h) {
    // https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
    return this._v(this.name + " " + this.age);
  },
};
const TestComponent = {
  props: ["rowData"],
  // eslint-disable-next-line no-unused-vars
  render(h) {
    // https://stackoverflow.com/questions/42414627/create-text-node-with-custom-render-function-in-vue-js
    return <button onClick={() => this.inc()}>test</button>;
  },
  methods: {
    inc() {
      this.rowData.age++;
    },
  },
};
export default {
  name: "ExampleTable2",
  components: {
    VDatatable,
    VDatatableColumn,
  },
  data() {
    return {
      rows: [],
      columns: [],
      id: 0,
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
          age: 10,
        },
      ];
    },
    setColumnsA() {
      this.columns = [
        { title: "Name", data: "name", id: this.id++ },
        { title: "Salary", data: "salary", id: this.id++ },
      ];
    },
    setColumnsB() {
      this.columns = [
        { title: "Name", data: "name", id: this.id++ },
        { title: "Salary", data: "salary", id: this.id++ },
        { title: "Age", data: "age", id: this.id++ },
      ];
    },
    setColumnsC() {
      this.columns = [
        { title: "Name", data: "name", id: this.id++ },
        { title: "Salary", data: "salary", id: this.id++ },
        { title: "Age", data: "age", width: "20px", id: this.id++ },
        {
          title: "TestAge",
          data: "age",
          vue: RenderComponent,
          id: this.id++,
        },
        {
          title: "Icon",
          defaultContent: "",
          vue: TestComponent,
          id: this.id++,
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