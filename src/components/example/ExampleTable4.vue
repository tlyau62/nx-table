<template>
  <div class="example-table">
    <h4>Example 4</h4>
    <b-button @click="number++">inc</b-button>
    <b-button @click="changeOrder()">Change order</b-button>
    <div>{{ number }}</div>
    <v-datatable :rows="rows" :order="order" @order="logorder">
      <v-datatable-column title="Name" data="name"></v-datatable-column>
      <v-datatable-column title="Salary" data="salary"></v-datatable-column>
      <v-datatable-column
        title="Invisible"
        data="salary"
        :visible="false"
      ></v-datatable-column>
      <v-datatable-column
        title="Age"
        data="age"
        width="20px"
        :orderable="false"
        className="text-center"
      >
        <b-dropdown text="Dropdown Button">
          <b-dropdown-item @click="log">First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-item>Number {{ number }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active>Active action</b-dropdown-item>
        </b-dropdown>
        <b-dropdown text="Dropdown Button">
          <b-dropdown-item @click="log">First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-item>Number {{ number }}</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item active>Active action</b-dropdown-item>
        </b-dropdown>
      </v-datatable-column>
    </v-datatable>
  </div>
</template>

<script>
import VDatatable from "@/components/datatable/VDatatable";
import VDatatableColumn from "@/components/datatable/VDatatableColumn";
import _ from "lodash";
import Vue from "vue";

export default {
  name: "ExampleTable",
  components: {
    VDatatable,
    VDatatableColumn,
  },
  data() {
    return {
      rows: [],
      number: 10,
      order: [[0, "asc"]],
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
  },
  methods: {
    log() {
      console.log("test");
    },
    changeOrder() {
      if (this.order.length === 0) {
        this.order = [[0, "asc"]];
      }

      const order = this.order[0][0];

      this.order = [[order === 0 ? 1 : 0, "asc"]];
    },
    logorder(order) {
      console.log(order);
    },
  },
};
</script>

<style lang="scss">
</style>
