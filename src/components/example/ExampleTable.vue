<template>
  <div class="example-table">
    <h4>Example 1</h4>
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
  methods: {
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
