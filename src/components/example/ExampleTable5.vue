<template>
  <div class="example-table">
    <h4>Example 5</h4>
    <div>
      <h5>Selected items</h5>
      <p>{{ selected }}</p>
      <h5>Selected indexes</h5>
      <p>{{ selectedIdxes }}</p>
    </div>
    <v-datatable
      :rows="rows"
      :select="{ style: 'os', blurable: false }"
      @select="select"
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
      selectedIdxes: [],
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
      this.selected = selected;
      this.selectedIdxes = indexes;
    },
  },
};
</script>
