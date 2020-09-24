<template>
  <div id="app">
    <datatable
      :rows="rows"
      :columns="columns"
      :serverSide="true"
      :processing="true"
      @order="order"
    />

    <div>
      <button @click="setEmptyRows()">Set empty rows</button>
      <button @click="setRowsA()">Set rows A</button>
      <button @click="setRowsB()">Set rows B</button>
      <button @click="setRowsC()">Set rows C</button>
      <button @click="setColumnsA()">Change columnset A</button>
      <button @click="setColumnsB()">Change columnset B</button>
      <button @click="setColumnsC()">Change columnset C</button>
    </div>
  </div>
</template>

<script>
import Datatable from "@/components/Datatable";

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
    Datatable,
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
        { title: "Age", data: "age" },
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
      const order = evt.ordArr[0];
      const col = this.columns[order.col];
      const rows = this.rows
        .slice()
        .sort((a, b) => (_.get(a, col.data) > _.get(b, col.data) ? 1 : -1));

      this.rows = order.dir === "asc" ? rows : rows.reverse();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  margin-top: 60px;
}
</style>
