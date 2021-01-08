<template>
  <div class="example-table">
    <h4>Example 6</h4>
    <div>
      <h5>Change header title</h5>
      <p><button @click="changeHeaderTitle">Change header title</button></p>
    </div>
    <div>
      <p>Current title: {{ title }}</p>
    </div>
    <v-datatable :rows="rows">
      <v-datatable-column :title="title" data="name" />
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
      title: "name",
    };
  },
  created() {
    this.rows = [
      {
        name: "John",
      },
    ];
  },
  methods: {
    changeHeaderTitle() {
      this.title = "name123";
    },
  },
};
</script>
