import datatableService from './datatable.service';
import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';
import VDatatableCell from './VDatatableCell';

export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.componentStore = [];
  },
  mounted() {
    this.config.columns = helper.processColumns(this.componentStore, this.columns);
  },
  methods: {
    $cleanComponentStore() {
      for (const component of this.componentStore) {
        component.$destroy();
      }
      this.componentStore = [];
    }
  }
};

const helper = {
  /**
   * Impure
   */
  createComponent(componentStore, component) {
    if (!component || !component.$scopedSlots.default) {
      return function () { };
    }

    return function (cell, cellData, rowData, rowIndex, colIndex) {
      const Component = Vue.extend(VDatatableCell);

      debugger;

      const scope = {
        cell,
        cellData,
        rowData,
        rowIndex,
        colIndex,
        datatable: this.DataTable(),
      };
      const instance = new Component({
        propsData: {
          component,
          scope
        },
      });

      componentStore.push(instance);

      $(cell).empty();

      cell.appendChild(instance.$mount().$el);
    };
  },

  processColumns(componentStore, columns) {
    return (
      datatableService.addCreatedCell(columns, (col) =>
        helper.createComponent(componentStore, col.component)
      ) || []
    );
  },
};

