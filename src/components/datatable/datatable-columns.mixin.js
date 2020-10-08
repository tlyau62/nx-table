import datatableService from './datatable.service';
import Vue from "vue";
import $ from "jquery";
import _ from 'lodash';
import VDatatableCell from './VDatatableCell';

export default {
  data() {
    return {
      init: false
    };
  },
  beforeMount() {
    this.componentStore = [];
    this.config.columns = [];

    this.$on("column-created", (col) => {
      if (this.init) {
        this.$emit('refresh');
      } else {
        this.config.columns.push(col);
      }
    });
  },
  mounted() {
    this.config.columns = helper.processColumns(this.componentStore, this.config.columns);
    this.init = true;
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
  createComponent(componentStore, context) {
    return function (cell, cellData, rowData, rowIndex, colIndex) {
      if (!context) {
        return;
      }

      const Component = Vue.extend(VDatatableCell);

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
          context,
          scope,
          cellData
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
        helper.createComponent(componentStore, col.context)
      ) || []
    );
  },
};